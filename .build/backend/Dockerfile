# Step 1: Use a Node.js base image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

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
