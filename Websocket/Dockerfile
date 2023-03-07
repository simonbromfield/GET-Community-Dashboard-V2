FROM node:16
WORKDIR /websocket
COPY package.json /websocket
RUN npm install
COPY . /websocket
CMD ["npm", "start"]
