import json
from operator import index
from tkinter import ON
from flask import Flask , request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS


app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/pythonreactcrud'
mongo = PyMongo(app)
#middleware para evitar que se juntes 2 servidores
CORS(app)
db = mongo.db.users


@app.route('/users', methods=['POST'])
def createUser():
    id = db.insert_one({
        'nombre': request.json['campoNombre'],
        'email': request.json['campoEmail'],
        'password': request.json['campoPassWord']
    }).inserted_id
    #print(str(ObjectId(id)))
    return jsonify((str(ObjectId(id))))

@app.route('/users', methods=['GET'])
def getUsers():
    users=[]
    for doc in db.find():
        users.append({
            '_id':str(ObjectId(doc['_id'])),
            'nombre': doc['nombre'],
            'email': doc['email'],
            'password': doc['password']
        })
    return jsonify(users)

@app.route('/user/<id>', methods=['GET'])
def getUser(id):
    user = db.find_one({'_id':ObjectId(id)})
    #print(user)
    return jsonify({
        '_id':str(ObjectId(user['_id'])),
        'nombre': user['nombre'],
        'email': user['email'],
        'password': user['password']
    })

@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg':'user deleted'})

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    db.update_one({'_id':ObjectId(id)}, {'$set': {
        'nombre': request.json['campoNombre'],
        'email': request.json['campoEmail'],
        'password': request.json['campoPassWord']
    }})
    return jsonify({'msg':'user updated'})

if __name__ == "__main__":
    app.run(debug=True)