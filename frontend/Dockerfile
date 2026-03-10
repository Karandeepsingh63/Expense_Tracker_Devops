
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy all source files
COPY . .

# Build the React app
RUN npm run build

# ==========================
# Stage 2: Serve with Nginx
# ==========================
FROM nginx:alpine

# Update packages to reduce vulnerabilities
RUN apk update && apk upgrade --no-cache

# Copy built React app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]