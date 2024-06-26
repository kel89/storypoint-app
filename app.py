from flask import Flask, request, send_from_directory
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", logger=True)

users = []
showResults = False

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("front-end/dist/" + path):
        return send_from_directory('front-end/dist', path)
    else:
        return send_from_directory('front-end/dist', 'index.html')
    
@app.route("/clear", methods=['GET'])
def clear():
    global users
    global showResults
    users = []
    showResults = False
    socketio.emit('clear')
    return 'Cleared'

@socketio.on('connect')
def connect():
    emit('users', users, broadcast=True)
    emit('showResults', showResults, broadcast=True)

@socketio.on('username')
def username(user_data):
    global users
    users.append({
        'sid': request.sid,
        'username': user_data['username'],
        'role': user_data['role'],
        'points': 0,
        'voted': False
    })
    emit('status', {'msg': f'{username} connected'}, broadcast=True)
    emit('users', users, broadcast=True)

@socketio.on('disconnect')
def disconnect():
    global users 
    sid = request.sid
    user_index = next((index for index, user in enumerate(users) if user['sid'] == sid), None)
    if user_index is not None:
        user = users.pop(user_index)
        username = user['username']
        emit('status', {'msg': f'{username} disconnected'}, broadcast=True)
        emit('users', users, broadcast=True)


@socketio.on('point')
def on_point(value):
    global users
    user = next((user for user in users if user['sid'] == request.sid), None)
    if user:
        user['points'] = value
        user['voted'] = True if value > 0 else False
        emit('status', {'msg': f'{user["username"]} submitted a point'}, broadcast=True)
        emit('users', users, broadcast=True)

@socketio.on('showResults')
def on_show_results():
    global showResults
    showResults = True
    emit('showResults', showResults, broadcast=True)

@socketio.on('clearPoints')
def on_clear_points():
    global users
    global showResults
    for user in users:
        user['points'] = 0
        user['voted'] = False
    showResults = False
    emit('status', {'msg': 'Points cleared'}, broadcast=True)
    emit('users', users, broadcast=True)
    emit('showResults', showResults, broadcast=True)

@socketio.on('hidePoints')
def on_hide_points():
    global showResults
    showResults = False
    emit('showResults', showResults, broadcast=True)

@socketio.on('sendReaction')
def handle_reaction(data):
    print(data)
    reaction = data['reaction']
    user = data['sentBy']
    emit('reaction', {
        'reaction': reaction,
        'sender': user
    }, broadcast=True)

@socketio.on("callOutUser")
def callout_user(data):
    user_sid = data['sid']
    emit('callout', {
        'sid': user_sid
    }, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)