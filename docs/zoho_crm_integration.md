# Zoho CRM Integration for Widia Website

This document outlines the integration between the Widia website's contact form and Zoho CRM.

## Overview

The Widia website contact form is integrated with Zoho CRM to automatically create leads when users submit the contact form. This integration:

1. Captures form data from the frontend
2. Sends it to a FastAPI backend endpoint
3. Stores the submission in MongoDB
4. Creates a lead in Zoho CRM
5. Returns a success response to the user

## Implementation Details

### Architecture

```
Frontend (React) → Backend (FastAPI) → Zoho CRM API
                                    → MongoDB
```

### Components

1. **Frontend Form** - Collects user data and sends it to the backend API
2. **Backend API** - Processes form data, stores it in MongoDB, and forwards it to Zoho CRM
3. **Zoho CRM Integration** - Authenticates with Zoho API and creates leads

## Setup Instructions

### 1. Zoho CRM Setup

1. Create a Zoho CRM account at [https://www.zoho.com/crm/](https://www.zoho.com/crm/)
2. Register a new client in the [Zoho API Console](https://api-console.zoho.com/):
   - Create a "Server-based Application"
   - Set the redirect URI to your backend URL (e.g., `https://api.widiadigital.io/auth/callback`)
   - Note the Client ID and Client Secret
3. Generate a refresh token:
   - Use the OAuth 2.0 authorization flow
   - Request scope: `ZohoCRM.modules.leads.CREATE`
   - Follow instructions at [Zoho API Docs](https://www.zoho.com/crm/developer/docs/api/oauth-overview.html)

### 2. Backend Configuration

1. Create a `.env` file in your backend directory with the following variables:
   ```
   # MongoDB
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=widia_website

   # Zoho CRM
   ZOHO_CLIENT_ID=your_client_id
   ZOHO_CLIENT_SECRET=your_client_secret
   ZOHO_REFRESH_TOKEN=your_refresh_token
   ```

2. Install required dependencies:
   ```bash
   pip install fastapi httpx pydantic python-dotenv
   ```

### 3. Field Mapping

The form fields are mapped to Zoho CRM lead fields as follows:

| Form Field | Zoho CRM Field    |
|------------|-------------------|
| name       | Last_Name         |
| email      | Email             |
| phone      | Phone             |
| company    | Company           |
| message    | Description       |
| service    | Service_Interest  |
| -          | Lead_Source (set to "Website") |

## Code Implementation

### Backend Implementation

1. **ZohoCRM Class (`zoho_crm.py`)**:
   - Handles authentication with Zoho API
   - Manages access tokens
   - Creates leads from form data

2. **API Endpoint (`server.py`)**:
   - Provides a `/api/contact` endpoint
   - Validates incoming form data
   - Stores submissions in MongoDB
   - Creates leads in Zoho CRM as a background task

### Frontend Implementation

The React contact form component sends form data to the backend API endpoint when a user submits the form.

## Maintenance and Troubleshooting

### Refreshing OAuth Token

Zoho refresh tokens are valid for 60 days. If the integration stops working, you may need to:

1. Check if the refresh token is still valid
2. Generate a new refresh token if needed
3. Update the `.env` file with the new token

### Monitoring

Check the following to ensure the integration is working:

1. MongoDB `contacts` collection for stored submissions
2. Zoho CRM Leads module for new leads
3. Backend logs for any API errors

## Security Considerations

1. Never expose Zoho API credentials in client-side code
2. Use HTTPS for all API communications
3. Implement rate limiting to prevent abuse
4. Consider adding CAPTCHA to the form to prevent spam

## Future Enhancements

1. Add automated email notifications for new form submissions
2. Create custom fields in Zoho CRM for better lead segmentation
3. Implement webhook notifications from Zoho CRM back to the website
4. Add lead scoring based on the service requested