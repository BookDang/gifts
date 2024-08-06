# Sử dụng image chính thức của MongoDB
FROM mongo:7.0.7

# Sao chép file init-mongo.js vào container
COPY .docker/mongodb/init-mongo.js /docker-entrypoint-initdb.d/init-mongo.js

# Expose port
EXPOSE 27017


