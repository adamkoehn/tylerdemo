#!/usr/bin/env bash

docker run -v "$PWD/dist:/usr/share/nginx/html" -p "80:80" --rm nginx