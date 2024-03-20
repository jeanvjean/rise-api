FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json .

RUN npm cache clean --force

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3300

CMD npm run start