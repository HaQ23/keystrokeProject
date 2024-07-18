from flask import Flask, request, jsonify
from pymongo import MongoClient
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client.userDB
    users = db.users
    logging.info("Connected to MongoDB successfully.")
except Exception as e:
    logging.error(f"Could not connect to MongoDB: {e}")


@app.route('/api/revokeConsent/', methods=['PATCH'])
def revoke_user_consent():
    data = request.json
    email = data.get('email')

    if not email:
        logging.error("Email is required.")
        return jsonify({'message': 'Email is required.'}), 400

    result = users.update_one({'email': email}, {'$set': {'consent': False}})

    if result.modified_count > 0:
        logging.info("User consent revoked successfully.")
        updated_user = users.find_one({'email': email})
        updated_user['_id'] = str(updated_user['_id'])
        return jsonify({'message': 'User consent revoked successfully.', 'user': updated_user}), 200
    else:
        logging.error("User not found.")
        return jsonify({'message': 'User not found.'}), 404


@app.route('/api/deleteAllSamples/', methods=['DELETE'])
def delete_all_samples():
    try:
        result = users.delete_many({})
        logging.info(f"Deleted {result.deleted_count} user(s).")
        return jsonify({'message': f"Deleted {result.deleted_count} user(s)."}), 200
    except Exception as e:
        logging.error(f"Error deleting users: {e}")
        return jsonify({'message': 'An error occurred while deleting users.'}), 500


if __name__ == '__main__':
    app.run(debug=True)
    