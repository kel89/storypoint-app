## Running

To run with gunicorn:

`gunicorn -k geventwebsocket.gunicorn.workers.GeventWebSocketWorker -w 1 app:app`
