from flask import Flask, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

users = {}
points = {}

@app.route('/')
def index():
    return "Welcome to the WebSocket server!"

@socketio.on('connect')
def connect():
    username = request.args.get('username')
    if username:
        users[request.sid] = username
        emit('status', {'msg': f'{username} connected'}, broadcast=True)
        emit('users', list(users.values()), broadcast=True)

@socketio.on('disconnect')
def disconnect():
    username = users.pop(request.sid, None)
    if username:
        emit('status', {'msg': f'{username} disconnected'}, broadcast=True)
        emit('users', list(users.values()), broadcast=True)

@socketio.on('point')
def on_point(data):
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