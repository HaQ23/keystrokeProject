from pymongo import MongoClient
from bson.objectid import ObjectId

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client.keystrokeDB

# Drop existing collections if they exist
db.sentences.drop()
db.tests.drop()

# Seed data for sentences collection
sentences = [
    { "_id": ObjectId(), "text": "This is the first sample sentence." },
    { "_id": ObjectId(), "text": "This is the second sample sentence." },
    { "_id": ObjectId(), "text": "This is the third sample sentence." },
    { "_id": ObjectId(), "text": "This is the fourth sample sentence." },
    { "_id": ObjectId(), "text": "This is the fifth sample sentence." }
]
db.sentences.insert_many(sentences)

# Seed data for tests collection
tests = [
    {
        "_id": ObjectId(),
        "userEmail": "example@example.com",
        "sentenceId": sentences[0]['_id'],
        "testRunOn": 1625829123,
        "keystrokeData": [
            { "key": "a", "pressTime": 100, "releaseTime": 200 },
            { "key": "b", "pressTime": 150, "releaseTime": 250 }
        ]
    },
    {
        "_id": ObjectId(),
        "userEmail": "example@example.com",
        "sentenceId": sentences[1]['_id'],
        "testRunOn": 1625829123,
        "keystrokeData": [
            { "key": "a", "pressTime": 100, "releaseTime": 200 },
            { "key": "b", "pressTime": 150, "releaseTime": 250 }
        ]
    }
]
db.tests.insert_many(tests)

print("Seed data inserted successfully.")
