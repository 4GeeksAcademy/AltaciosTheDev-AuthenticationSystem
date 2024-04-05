"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=["POST"])
def get_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email == None or password == None:
        return jsonify({"msg": "Email or password not present"}), 400
    
    user = User.query.filter_by(email=email, password=password).one_or_none()

    if user == None:
        return jsonify({"msg": "User does not exist, email or password may be incorrect"}), 404

    access_token = create_access_token(identity=email)

    return jsonify({"access_token": access_token, "identity": user.email}), 200

@api.route('/protected', methods=["GET"])
@jwt_required()
def get_logged_user_data():
    current_user_email = get_jwt_identity()

    current_user = User.query.filter_by(email=current_user_email).one_or_none()

    if current_user == None:
        return jsonify({"msg": "User not found"}), 404
    
    return jsonify(current_user.serialize()), 200

 




