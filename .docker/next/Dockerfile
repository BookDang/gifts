FROM node:20.10.0-alpine

WORKDIR /app

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
CMD ["npm", "dev"]