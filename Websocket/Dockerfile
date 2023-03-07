# Set the base image to use
FROM node:12

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port the application will listen on
EXPOSE 8080

# Start the application
CMD [ "npm", "start" ]
