from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


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
