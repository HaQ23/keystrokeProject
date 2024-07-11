from fastapi import APIRouter, Request, HTTPException, Path, Body
from .models import User, Sentence, Test, LoginData,UserDataUpdate
import random
from bson.objectid import ObjectId
router = APIRouter()




router = APIRouter()

@router.post("/api/login")
async def register_user(request: Request, login_data: LoginData):
    users = request.app.db.users

    if not login_data.email:
        raise HTTPException(status_code=400, detail="Email is a required field.")

    try:
        existing_user = users.find_one({'email': login_data.email})
        if existing_user:
            existing_user['_id'] = str(existing_user['_id'])
            del existing_user['_id']
            return existing_user

        new_user = User(email=login_data.email, consent=False, role="")
        user_dict = new_user.dict(by_alias=True)
        result = users.insert_one(user_dict)
        user_dict['_id'] = str(result.inserted_id)
        del user_dict['_id']
        return user_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error registering user")

@router.patch("/api/user/{email}")
async def update_user(
    request: Request,
    email: str = Path(),
    user_update: UserDataUpdate = Body()
):
    users = request.app.db.users
    update_data = user_update.dict(exclude_unset=True)

    try:
        update_result = users.update_one(
            {'email': email},
            {'$set': update_data}
        )

        if update_result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found")

        updated_user = users.find_one({'email': email})
        updated_user['_id'] = str(updated_user['_id'])
        del updated_user['_id']
        return updated_user
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error updating user")

@router.get("/api/sentence/{user_email}")
async def get_random_sentence(request: Request, user_email: str):
    sentences = request.app.db.sentences
    tests = request.app.db.tests

    try:
        used_sentence_ids = tests.find({'userEmail': user_email}).distinct('sentenceId')
        available_sentences = list(sentences.find({'_id': {'$nin': [ObjectId(sid) for sid in used_sentence_ids]}}))
        if not available_sentences:
            raise HTTPException(status_code=404, detail="No available sentences for this user")
        random_sentence = random.choice(available_sentences)
        random_sentence['_id'] = str(random_sentence['_id'])
        random_sentence['id'] = random_sentence.pop('_id')
        return random_sentence
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error retrieving random sentence")
@router.post("/api/test")
async def add_test(request: Request, test: Test):
    tests = request.app.db.tests
    try:
        test_dict = test.dict(by_alias=True)
        tests.insert_one(test_dict)

        return {"message": "Test added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error adding test")