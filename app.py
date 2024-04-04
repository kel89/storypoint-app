from flask import Flask, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", logger=True)

users = {}
points = {}

@app.route('/')
def index():
    return "Welcome to the WebSocket server!"

@socketio.on('connect')
def connect():
    emit('users', list(users.values()), broadcast=True)

@socketio.on('username')
def username(username):
    users[request.sid] = username
    print(users)
    emit('status', {'msg': f'{username} connected'}, broadcast=True)
    emit('users', users, broadcast=True)
    print("Users are now", users)

@socketio.on('disconnect')
def disconnect():
    print("call to disconnect")
    username = users.pop(request.sid, None)
    if username:
        emit('status', {'msg': f'{username} disconnected'}, broadcast=True)
        emit('users', users, broadcast=True)

@socketio.on('point')
def on_point(data):
    print("data", data)
    username = users.get(request.sid)
    if username:
        points[username] = data['value']
        emit('status', {'msg': f'{username} submitted a point'}, broadcast=True)

@socketio.on('getAllPoints')
def on_get_all_points():
    emit('allPoints', points, broadcast=True)

@socketio.on('clearPoints')
def on_clear_points():
    points.clear()
    emit('status', {'msg': 'Points cleared'}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)