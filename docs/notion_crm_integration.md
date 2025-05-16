# Notion CRM Integration for Widia Website

This document outlines the integration between the Widia website's contact form and Notion as a CRM solution.

## Overview

The Widia website contact form is integrated with Notion to automatically create database entries when users submit the contact form. This integration:

1. Captures form data from the frontend
2. Sends it to a FastAPI backend endpoint
3. Stores the submission in MongoDB for backup
4. Creates a new page in a Notion database
5. Returns a success response to the user

## Implementation Status

| Task | Status | Priority | Description |
|------|--------|----------|-------------|
| Research email sending services | ✅ Completed | High | Investigated options for email notifications |
| Implement backend API endpoint | ✅ Completed | High | Created `/api/contact` endpoint in FastAPI |
| Research Notion API capabilities | ✅ Completed | High | Explored Notion API for CRM functionality |
| Create email notification template | ⏳ Pending | Medium | Design template for notification emails |
| Design Notion database structure | ✅ Completed | High | Created database schema with appropriate properties |
| Implement Notion API integration | ✅ Completed | High | Built Python client for Notion API |
| Create documentation | ✅ Completed | High | This document |

## Setup Instructions

### 1. Notion Setup

1. **Create a Notion Database**:
   - Create a new database in Notion with the following properties:
     - Name (title)
     - Email (email)
     - Phone (phone number)
     - Company (text)
     - Service (select - with options matching your form)
     - Status (status - with options like "New", "Contacted", "Qualified", etc.)
     - Source (select - with "Website Form" as an option)

2. **Create a Notion Integration**:
   - Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
   - Create a new integration
   - Give it a name (e.g., "Widia Website")
   - Copy the "Internal Integration Token" - this is your API key

3. **Share Database with Integration**:
   - Open your database in Notion
   - Click "Share" in the top right
   - Add your integration to the share list
   - Copy the database ID from the URL (it's the string after the workspace name and before any query parameters)
   - Example URL: `https://www.notion.so/myworkspace/83c75a51b3b84c96b0ffcf1f27f2ff74?v=...`
   - Database ID is: `83c75a51b3b84c96b0ffcf1f27f2ff74`

### 2. Backend Configuration

1. **Install Required Dependencies**:
   ```bash
   pip install fastapi httpx pydantic python-dotenv
   ```

2. **Create Notion Integration File**:
   Create a new file called `notion_integration.py` with the following content:

   ```python
   import os
   import json
   from typing import Dict, Any, Optional
   import httpx
   from fastapi import HTTPException
   from pydantic import BaseModel

   class ContactForm(BaseModel):
       name: str
       email: str
       phone: Optional[str] = None
       company: Optional[str] = None
       message: str
       service: str

   class NotionAPI:
       def __init__(self):
           self.api_key = os.getenv("NOTION_API_KEY")
           self.database_id = os.getenv("NOTION_DATABASE_ID")
           self.base_url = "https://api.notion.com/v1"
           self.version = "2022-06-28"  # Notion API version
           
           if not self.api_key or not self.database_id:
               raise ValueError("NOTION_API_KEY and NOTION_DATABASE_ID must be set")
       
       def _get_headers(self):
           """Get the required headers for Notion API requests"""
           return {
               "Authorization": f"Bearer {self.api_key}",
               "Content-Type": "application/json",
               "Notion-Version": self.version
           }
       
       async def create_contact(self, form_data: ContactForm) -> Dict[str, Any]:
           """Create a new contact entry in the Notion database"""
           # Map form data to Notion properties
           properties = {
               "Name": {
                   "title": [
                       {
                           "text": {
                               "content": form_data.name
                           }
                       }
                   ]
               },
               "Email": {
                   "email": form_data.email
               },
               "Phone": {
                   "phone_number": form_data.phone or ""
               },
               "Company": {
                   "rich_text": [
                       {
                           "text": {
                               "content": form_data.company or "Not specified"
                           }
                       }
                   ]
               },
               "Service": {
                   "select": {
                       "name": self._map_service_to_option(form_data.service)
                   }
               },
               "Status": {
                   "status": {
                       "name": "New"
                   }
               },
               "Source": {
                   "select": {
                       "name": "Website Form"
                   }
               }
           }
           
           # Add message to the page content
           children = [
               {
                   "object": "block",
                   "type": "paragraph",
                   "paragraph": {
                       "rich_text": [
                           {
                               "type": "text",
                               "text": {
                                   "content": form_data.message
                               }
                           }
                       ]
                   }
               }
           ]
           
           # Create page in the database
           payload = {
               "parent": {
                   "database_id": self.database_id
               },
               "properties": properties,
               "children": children
           }
           
           async with httpx.AsyncClient() as client:
               response = await client.post(
                   f"{self.base_url}/pages",
                   headers=self._get_headers(),
                   json=payload
               )
           
           if response.status_code != 200:
               raise HTTPException(
                   status_code=response.status_code,
                   detail=f"Failed to create contact in Notion: {response.text}"
               )
           
           return response.json()
       
       def _map_service_to_option(self, service: str) -> str:
           """Map service code to readable option for Notion select field"""
           service_map = {
               "geral": "Informações Gerais",
               "automacao": "Automação de Processos",
               "copilot": "Desenvolvimento de Copilots",
               "consultoria": "Consultoria de IA",
               "parceria": "Proposta de Parceria"
           }
           return service_map.get(service, service)
   ```

3. **Update Server File**:
   Update your `server.py` file:

   ```python
   import os
   from dotenv import load_dotenv
   from fastapi import FastAPI, BackgroundTasks
   from fastapi.middleware.cors import CORSMiddleware
   from motor.motor_asyncio import AsyncIOMotorClient
   from notion_integration import NotionAPI, ContactForm

   # Load environment variables
   load_dotenv()

   app = FastAPI()

   # Configure CORS
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],  # In production, set this to your frontend URL
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )

   # MongoDB connection
   mongo_url = os.getenv("MONGO_URL", "mongodb://localhost:27017")
   db_name = os.getenv("DB_NAME", "widia_website")
   client = AsyncIOMotorClient(mongo_url)
   db = client[db_name]

   # Initialize Notion API client
   notion_api = NotionAPI()

   # Routes
   @app.get("/api")
   async def root():
       return {"message": "Welcome to Widia Digital API"}

   @app.post("/api/contact")
   async def contact_form(form_data: ContactForm, background_tasks: BackgroundTasks):
       try:
           # Store form data in MongoDB
           await db.contacts.insert_one(form_data.dict())
           
           # Create contact in Notion (as background task)
           background_tasks.add_task(notion_api.create_contact, form_data)
           
           return {"success": True, "message": "Form submitted successfully"}
       except Exception as e:
           return {"success": False, "message": f"Error processing form: {str(e)}"}
   ```

4. **Create Environment Variables**:
   Create a `.env` file with your credentials:

   ```
   # MongoDB
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=widia_website

   # Notion
   NOTION_API_KEY=secret_your_notion_api_key
   NOTION_DATABASE_ID=your_database_id
   ```

### 3. Frontend Implementation

Update your React contact form's submission handler in `Contact/index.jsx`:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Reset states
  setSubmitSuccess(false);
  setSubmitError(false);
  
  if (validateForm()) {
    setIsSubmitting(true);
    
    try {
      // Send data to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          service: 'geral'
        });
        
        setSubmitSuccess(true);
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  }
};
```

## Using Notion as a CRM

Once the integration is set up, you can leverage Notion's features for managing contacts:

1. **Create Views**:
   - Create different views in your database (Table, Board, Calendar)
   - Set up a Kanban board based on Status property
   - Filter views by Service type or Source

2. **Customize Status Workflow**:
   - Configure your Status property with stages like:
     - New
     - Contacted
     - Meeting Scheduled
     - Proposal Sent
     - Converted
     - Closed (Lost)

3. **Collaboration**:
   - Assign team members to contacts
   - Add comments for discussion
   - Set reminders for follow-ups

4. **Automation**:
   - Use Notion's built-in reminders
   - Connect with Zapier or Make (Integromat) for advanced automation
   - Set up email notifications when status changes

## Maintenance and Troubleshooting

### Common Issues

1. **API Rate Limits**:
   - Notion has a rate limit of 3 requests per second
   - Use background tasks to avoid hitting rate limits

2. **Authentication Errors**:
   - Check that your integration has access to the database
   - Verify the API key is correct

3. **Property Mapping Issues**:
   - If you change property names in Notion, update the code
   - Make sure select options match exactly what's in the code

## Future Enhancements

1. **Email Notifications**:
   - Add email notifications when new contacts are created
   - Send confirmation emails to users who submit the form

2. **Enhanced Analytics**:
   - Track conversion rates
   - Create dashboards using Notion's formulas

3. **Automated Follow-ups**:
   - Integrate with email marketing tools
   - Set up automated follow-up sequences

4. **Custom Views**:
   - Create a custom admin interface to view contacts
   - Build reports for contact analysis