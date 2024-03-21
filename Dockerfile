FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .

RUN npm cache clean --force

RUN apt update && npm install

RUN npm install -g typescript

# Bundle app source
COPY . .

VOLUME ["/app/node_modules"]

EXPOSE 3300

CMD npm run start