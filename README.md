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
function storypointer() {
  running=true
  # Run the docker container
  container_id=$(docker run -d -p 8000:8000 storypoint-app)

  # Open an ngrok
  ngrok http 8000 > /dev/null &
  ngrok_pid=$!

  function cleanup {
    echo "Stopping docker conatiner ..."
    docker stop $container_id
    docker container rm $container_id

    echo "Stopping ngrok ..."
    kill -9 $ngrok_pid

    running=false
    echo "Cleanup complete"
  }

  trap cleanup INT

  # Wait for ngrok to start up
  sleep 2

  # Fetch the ngrok URL and print it to the console
  ngrok_url=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')
  echo "Your application is available at: $ngrok_url"

  # Keep the script running until the Docker container or the ngrok process exits
  while $running; do
    sleep 1
  done
}
```

Also, if you want to have this build it (though you only need to do that once) would have to add it that as well.

## Lightsail

First note that to build the container for lightsail on an apple silicon mac, you need to use buildx like:
`docker buildx build -t storypoint-app:lightsail --platform linux/amd64 .`

Then you need to push it to the lightsaild project (make sure the correct aws profile is active in the terminal section).
`aws lightsail push-container-image --region <Region> --service-name <ContainerServiceName> --label <ContainerImageLabel> --image <LocalContainerImageName>:<ImageTag>`

### Domain and Routing

To job my memory later, I was able to link this to a subdomain in my aws route 53 hosted zone.
To do this I made my own CNAME entry that had the basic subdomain (sub.example.com) pointing
to the public URL that lightsail provides. But then I had to get the certificate working, so
in lightsail > custom domain, I had to create a certificate, tell it I wanted the subdomain,
it will not be able to figure out it is legit automatically, but it will give you a name and an entry.
I had to take that and make _another_ CNAME entry in the hosted zone. It took a minute, but
it realized the cert was then legit, and another min to propagate, then it all worked.
