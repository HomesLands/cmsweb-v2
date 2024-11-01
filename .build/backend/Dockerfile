# Step 1: Use a Node.js base image
FROM node:18.17

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

RUN npm install pm2 -g

RUN apt-get update && apt-get install -y \
    libnss3 \
    libdbus-1-3 \
    libatk-bridge2.0-0 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libgbm1 \
    libasound2 \
    libatspi2.0-0 \
    libgtk-3-0 \
    libxshmfence1 \
    default-mysql-client

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install the application dependencies
RUN npm install

# Step 5: Copy the application code to the working directory
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Expose the port the app runs on
EXPOSE 3000

# Step 8: Define the command to run the app
CMD ["npm", "start"]
