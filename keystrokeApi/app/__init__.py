from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import logging

def create_app():
    app = FastAPI()
    logging.basicConfig(level=logging.DEBUG)

    try:
        client = MongoClient('mongodb://localhost:27017/')
        app.db = client.keystrokeDB
        logging.info("Connected to MongoDB successfully.")
    except Exception as e:
        logging.error(f"Could not connect to MongoDB: {e}")

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
