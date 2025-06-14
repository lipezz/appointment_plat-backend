# Step 1: Build the app using a lightweight Node.js image
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package and lock files
COPY package.json yarn.lock ./

# Copy TypeScript and Prisma files
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Generate Prisma Client based on schema
RUN yarn prisma generate

# Compile TypeScript into JavaScript
RUN yarn tsc

# Step 2: Prepare a minimal image for running the app
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy necessary files from build stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on (adjust if needed)
EXPOSE 3000

# Set environment variable to indicate production
ENV NODE_ENV=production

# Command to run the compiled server
CMD ["node", "dist/server.js"]