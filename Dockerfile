# Build Stage for Vite Frontend
FROM node:18-alpine AS build

WORKDIR /app
# Copy package files separately to leverage Docker cache
COPY package*.json ./
RUN npm install --include=dev

# Copy all project files and build
COPY . .
RUN npm run build

# Production Stage for Express Backend
FROM node:18-alpine

WORKDIR /app
# Only install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the built Vite app and backend logic
COPY --from=build /app/dist ./dist
COPY backend ./backend

# The Express backend runs on 3001
EXPOSE 3001
CMD ["npm", "start"]
