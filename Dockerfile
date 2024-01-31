# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install
RUN npm install react-scripts@4.0.0 -g --silent

# Copy the .env.production file into the image
COPY .env.production .env

# Copy the rest of the application files to the working directory
COPY . .

# Build the React.js application
RUN npm run build

# Expose port 3000 (the default port that React.js uses)
EXPOSE 6002

# Start the application
CMD ["npm", "start"]