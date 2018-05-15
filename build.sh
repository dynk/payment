#!/bin/bash
docker build -t payment-server .
docker run -p 3020:3020 payment-server
