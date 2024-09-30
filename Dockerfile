# Step 1: Use Node.js base image
FROM node:16 as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and install dependencies
COPY package.json /app/
RUN npm install

# Step 4: Copy all the app files
COPY . /app/

# Step 5: Build the app
RUN npm run build

# Step 6: Use an Nginx image to serve the app
FROM nginx:alpine

# Step 7: Copy the build output from the previous image
COPY --from=build /app/build /usr/share/nginx/html

# Step 8: Expose port 80 to the outside world
EXPOSE 80

# Step 9: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
