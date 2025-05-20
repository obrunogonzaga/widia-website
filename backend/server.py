from fastapi import FastAPI, APIRouter, HTTPException, Response
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import glob
import json


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str
    
class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    service: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    service: str
    message: str

class BlogPost(BaseModel):
    slug: str
    title: str
    date: str
    excerpt: str
    author: str
    coverImage: Optional[str] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact", response_model=ContactForm)
async def create_contact_form(input: ContactFormCreate):
    """
    Endpoint to handle contact form submissions.
    Stores the form in the database and sends an email notification.
    """
    # Create contact form object
    contact_dict = input.dict()
    contact_obj = ContactForm(**contact_dict)
    
    # Store in database
    await db.contact_forms.insert_one(contact_obj.dict())
    
    # Service type mapping for more readable service names in email
    service_names = {
        "geral": "Informações Gerais",
        "automacao": "Automação de Processos",
        "copilot": "Desenvolvimento de Copilots",
        "consultoria": "Consultoria de IA",
        "parceria": "Proposta de Parceria"
    }
    
    service_name = service_names.get(input.service, input.service)
    
    # Send email notification
    try:
        # Email configuration from environment variables
        smtp_server = os.environ.get("SMTP_SERVER")
        smtp_port = int(os.environ.get("SMTP_PORT", "587"))  # 587 for TLS, 465 for SSL
        smtp_username = os.environ.get("SMTP_USERNAME")
        smtp_password = os.environ.get("SMTP_PASSWORD")
        
        # Check if required email settings are configured
        if not all([smtp_server, smtp_username, smtp_password]):
            logger.error("Email settings not configured. Check your .env file.")
            raise HTTPException(
                status_code=500,
                detail="Server email configuration is missing. Contact form submission was saved but email notification could not be sent."
            )
        
        # Create email
        msg = MIMEMultipart()
        msg['Subject'] = f'Novo Contato - {input.name} - {service_name}'
        msg['From'] = smtp_username
        msg['To'] = "contato@widia.io"
        
        # Email body
        email_body = f"""
        <html>
        <body>
            <h2>Novo pedido de contato pelo site</h2>
            <p><strong>Nome:</strong> {input.name}</p>
            <p><strong>Email:</strong> {input.email}</p>
            <p><strong>Telefone:</strong> {input.phone or "Não informado"}</p>
            <p><strong>Empresa:</strong> {input.company or "Não informada"}</p>
            <p><strong>Serviço:</strong> {service_name}</p>
            <p><strong>Mensagem:</strong></p>
            <p>{input.message}</p>
            <hr>
            <p><em>Este email foi enviado automaticamente pelo formulário de contato do site.</em></p>
        </body>
        </html>
        """
        
        msg.attach(MIMEText(email_body, 'html'))
        
        # Connect to SMTP server and send email
        if smtp_port == 465:  # SSL
            with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
                server.login(smtp_username, smtp_password)
                server.send_message(msg)
        else:  # TLS
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()
                server.login(smtp_username, smtp_password)
                server.send_message(msg)
            
        logger.info(f"Email sent for contact form submission from {input.name} ({input.email})")
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        # Note: We don't raise an exception here to still save the form data
        # even if the email sending fails
    
    return contact_obj

@api_router.get("/blog/posts", response_model=List[BlogPost])
async def get_blog_posts():
    """
    Endpoint to retrieve all blog posts metadata
    """
    # For production, you would get this from a database
    # For now, we'll scan for markdown files and create metadata
    
    posts = []
    
    # The frontend content folder relative to the backend
    blog_dir = Path(os.path.abspath(os.path.join(ROOT_DIR, "..", "frontend", "src", "content", "blog")))
    
    if not blog_dir.exists():
        logger.warning(f"Blog directory not found: {blog_dir}")
        return []
    
    # Get all markdown files
    markdown_files = glob.glob(str(blog_dir / "*.md"))
    
    for file_path in markdown_files:
        try:
            # Extract slug from filename (remove .md extension)
            file_name = os.path.basename(file_path)
            slug = file_name.replace(".md", "")
            
            # Read the file content
            with open(file_path, 'r') as f:
                content = f.read()
            
            # Simple extraction of title (first # heading)
            title_match = content.split("\n")[0].replace("# ", "")
            title = title_match if title_match else slug.replace("-", " ").title()
            
            # Extract first paragraph as excerpt
            paragraphs = [p for p in content.split("\n\n") if p and not p.startswith("#")]
            excerpt = paragraphs[0] if paragraphs else ""
            
            # Limit excerpt length
            if len(excerpt) > 150:
                excerpt = excerpt[:147] + "..."
                
            # Remove markdown symbols from excerpt
            excerpt = excerpt.replace("*", "").replace("_", "").replace("`", "")
            
            # Create a post object
            post = BlogPost(
                slug=slug,
                title=title,
                date=datetime.now().strftime("%Y-%m-%d"),  # In production, extract from frontmatter
                excerpt=excerpt,
                author="Widia Team",  # In production, extract from frontmatter
                coverImage=f"/images/blog/{slug}.jpg"  # Default pattern
            )
            
            posts.append(post)
            
        except Exception as e:
            logger.error(f"Error processing blog post {file_path}: {str(e)}")
    
    # Sort by date (newest first)
    posts.sort(key=lambda x: x.date, reverse=True)
    
    return posts

@api_router.get("/blog/post/{slug}")
async def get_blog_post(slug: str):
    """
    Endpoint to retrieve a specific blog post content
    """
    blog_dir = Path(os.path.abspath(os.path.join(ROOT_DIR, "..", "frontend", "src", "content", "blog")))
    file_path = blog_dir / f"{slug}.md"
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    try:
        with open(file_path, 'r') as f:
            content = f.read()
            
        # Extract title
        title_match = content.split("\n")[0].replace("# ", "")
        title = title_match if title_match else slug.replace("-", " ").title()
        
        # Create response with the content and metadata
        return {
            "slug": slug,
            "title": title,
            "date": datetime.now().strftime("%Y-%m-%d"),  # In production, extract from frontmatter
            "content": content,
            "author": "Widia Team",  # In production, extract from frontmatter
            "coverImage": f"/images/blog/{slug}.jpg"  # Default pattern
        }
    except Exception as e:
        logger.error(f"Error retrieving blog post {slug}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving blog post")

# Mount a path to serve the markdown files directly
@app.get("/content/blog/{slug}.md")
async def get_markdown_file(slug: str):
    """
    Endpoint to serve markdown files directly
    """
    blog_dir = Path(os.path.abspath(os.path.join(ROOT_DIR, "..", "frontend", "src", "content", "blog")))
    file_path = blog_dir / f"{slug}.md"
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    try:
        # Return the file content with proper content type
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Return plain text response with markdown content
        return Response(content=content, media_type="text/markdown")
    except Exception as e:
        logger.error(f"Error serving markdown file {slug}.md: {str(e)}")
        raise HTTPException(status_code=500, detail="Error serving markdown file")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()