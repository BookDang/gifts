# Description: Dockerfile for the NestJS application.
FROM node:20.10.0-alpine

# Create the app directory
WORKDIR /app

# Install vim
RUN apk add vim

# Add metadata to the image
LABEL author="Book Dang"

# Copy package.json and package-lock.json from the nest directory
COPY ../../nestjs/package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY ../../nestjs .

# Build the app
RUN npm run build

# Expose the port 3003
EXPOSE 3003

# Start the app
CMD ["npm", "run", "start:dev"]