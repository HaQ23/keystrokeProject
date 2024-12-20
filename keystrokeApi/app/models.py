from pydantic import BaseModel, Field
from typing import List, Optional
from bson import ObjectId
from datetime import datetime
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid objectid')
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type='string')
        return field_schema

class LoginData(BaseModel):
    email: str

class UserConsentData(BaseModel):
    hasConsented: bool
    consent: str
    consentDate: datetime
class User(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    email: str
    hasConsented: bool
    role: str
    consent: Optional[str]
    consentDate: Optional[datetime]
    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}
class UserDataUpdate(BaseModel):
    role: Optional[str]

class Sentence(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    text: str

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}

class KeystrokeData(BaseModel):
    key: str
    pressTime: float
    releaseTime: float

class Test(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    userEmail: str
    sentenceId: str
    testRunOn: float
    keystrokeData: List[KeystrokeData]

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}
