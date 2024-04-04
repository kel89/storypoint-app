## Local Changes

If you make changes to the FE, and you want to see them reflected when you connect via python, you have to make sure that you build it (the flask only serves the static, compiled stuff), just run `npm run build`

## Running

To run with gunicorn:
`gunicorn -k geventwebsocket.gunicorn.workers.GeventWebSocketWorker -w 1 module:app`

## Docker

To build the docker image you just run
`docker build -t storypoint-app .`

To then run it:
`docker run -p 8000:8000 storypoint-app`

Note, in the port mapping it is `-p <hostPort>:<containerPort>` so if you want to map it somewhere else on your machine change the first one.

## Ngrok

If you want to use a tunnel for this bad boy, you can run:
`ngrok http 8000` or w.e. port you pointed it to

## Bash Helper

Here is a bash helper that you can use. You may need to tweak the paths:

```
function run_storypoint_app() {
  # Build the Docker image
  docker build -t storypoint-app .

  # Run the Docker container
  docker run -d -p 8000:8000 storypoint-app

  # Start ngrok and expose the Docker container
  ngrok_url=$(ngrok http 8000 -log=stdout | grep -m 1 "url=https://" | sed -n 's/^.*url=//p')

  echo "Your application is available at: $ngrok_url"
}
```
