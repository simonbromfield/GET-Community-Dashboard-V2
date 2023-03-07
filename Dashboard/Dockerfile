FROM node:16
WORKDIR /dashboard
COPY package.json /dashboard
RUN npm install
COPY . /dashboard
CMD ["npm", "run", "dev"]
