# Introduction
This is a typescript koa project with the following features:
* docker with multi stage build for development and production
* docker compose for development
* error handlers
* tests with mocha and sinon
* prettier
* eslint

# Setup
## Install required tools
* [docker setup](https://docs.docker.com/install/)
* [docker-compose setup](https://docs.docker.com/compose/install/)

## Clone project
* `git clone git@github.com:hanchiang/typescript-node-docker.git`

## Set up environment variables
`.env.dev`:
* `COOKIE_SECRET=mycookiesecret`
* `NODE_ENV=development`

# Using the project
**Run in development mode**
* Build: `docker-compose build`
* Start: `docker-compose up -d`
* Server is available at: `localhost:3000`
* Stop: `docker-compose down`

**Build production image**
* `npm run docker-build-prod`

# Note
Whenever new packages are added via `npm install`:
* You need to stop the service: `docker-compose stop <service>` or `docker-compose down`
* Build the service: `docker-compose build <service>`
* Start the service: `docker-compose start <service>` or `docker-compose up -d`

# Reference
* Multi stage docker build - https://medium.com/@ankit.wal/the-why-and-how-of-multi-stage-docker-build-with-typescript-example-bcadbce2686c