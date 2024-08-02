FROM node:20.10.0-alpine

WORKDIR /app

# Copy package.json and package-lock.json from the nest directory
COPY ../../nest/package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY ../../nest .

# Build the app
RUN npm run build

# Expose the port 3003
EXPOSE 3003

# Start the app
CMD ["npm", "start"]