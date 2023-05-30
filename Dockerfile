# Use a Node.js base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Define the command to run the app
CMD [ "yarn", "start" ]
