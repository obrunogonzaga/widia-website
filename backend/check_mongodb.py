#!/usr/bin/env python3
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from pprint import pprint

# Load environment variables
load_dotenv()

# Connect to MongoDB
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME')

if not mongo_url or not db_name:
    print("Error: MONGO_URL and DB_NAME must be set in .env file")
    exit(1)

try:
    # Connect to MongoDB
    client = MongoClient(mongo_url)
    db = client[db_name]
    
    # Check if connection is working
    print(f"Connected to MongoDB: {mongo_url}")
    print(f"Database: {db_name}")
    
    # List all collections
    collections = db.list_collection_names()
    print("\nCollections in database:")
    for collection in collections:
        print(f"- {collection}")
    
    # Check for contact forms
    if 'contact_forms' in collections:
        print("\nContact form submissions:")
        contact_forms = list(db.contact_forms.find())
        
        if not contact_forms:
            print("No contact form submissions found.")
        else:
            print(f"Found {len(contact_forms)} submissions:")
            for idx, form in enumerate(contact_forms, 1):
                print(f"\n--- Submission {idx} ---")
                # Exclude the _id field which is not JSON serializable
                form.pop('_id', None)
                pprint(form)
    else:
        print("\nNo 'contact_forms' collection found.")

except Exception as e:
    print(f"Error connecting to MongoDB: {e}")