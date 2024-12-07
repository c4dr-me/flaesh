# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
ARG CLERK_PUBLISHABLE_KEY
ENV CLERK_PUBLISHABLE_KEY=$CLERK_PUBLISHABLE_KEY
RUN npm run build

FROM node:latest as test
ENV NODE_ENV test
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
USER node
COPY . .
RUN npm run test

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
