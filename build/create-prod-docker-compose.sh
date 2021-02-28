#!/usr/bin/env bash

cat >> ./docker-compose.prod.yml  << EOF
version: '3.8'
services:
    server:
        image: $IMAGE_NAME:$CIRCLE_TAG
        user: 'node'
        working_dir: /home/node/app
        volumes:
            - ./:/home/node/app
            - /home/node/app/node_modules
        command: yarn start
        ports:
            - 3000:3000
EOF
