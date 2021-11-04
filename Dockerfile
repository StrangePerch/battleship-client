FROM node:14-alpine as builder
# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --only=prod

# add app
COPY . ./

# build app
RUN npm run build