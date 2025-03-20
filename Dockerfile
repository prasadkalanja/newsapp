# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy dependency files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm ci --force

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Install the 'serve' package globally for production
RUN npm install -g serve --force

# Expose the port the app runs on
EXPOSE 3000

# Run the app using 'serve'
CMD ["serve", "-s", "build"]