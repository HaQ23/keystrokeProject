from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pymongo.server_api import ServerApi

import logging

def create_app():
    app = FastAPI()

    uri = "mongodb+srv://krzysztofdobosz:keystroke0987654321@cluster0.6izhsw9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    logging.basicConfig(level=logging.DEBUG)

    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        app.db = client.keystrokeDB
        logging.info("Connected to MongoDB successfully.")
    except Exception as e:
        logging.error(f"Could not connect to MongoDB: {e}")

    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)

    from .controllers import router as controllers_router
    app.include_router(controllers_router)
    origins = [
        "http://localhost:4200",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app
