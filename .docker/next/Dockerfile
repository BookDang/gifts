# Description: This file contains the Dockerfile for the NextJS application.
FROM node:20.10.0-alpine

# Create the app directory
WORKDIR /app

# Install vim
RUN apk add vim

# Add metadata to the image
LABEL author="Book Dang"

# Copy package.json from the nextjs directory
COPY ../../nextjs/package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY ../../nextjs .

# Build the app
RUN npm run build

# Expose the port
EXPOSE 3002

# Start the app with the dev command
CMD ["npm", "run", "dev"]