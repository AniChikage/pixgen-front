#!/bin/bash

IMAGE_TAG="pixgen-frontend:latest"
CONTAINER_NAME="pixgen-frontend"

sudo docker stop $CONTAINER_NAME
sudo docker rm -f $CONTAINER_NAME

sudo docker rmi $IMAGE_TAG
sudo docker build -t $IMAGE_TAG .
sudo docker run -itd --name $CONTAINER_NAME -p 3000:3000 $IMAGE_TAG
