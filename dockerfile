#Base image
FROM node:18-alpine

#set working directory
WORKDIR /app

#copy package.json and install dependencies
COPY package*.json ./
RUN npm install


#copy application files
COPY . .

#build TypeScript
RUN npm run build

#expose port
EXPOSE 3000

#Start the application
CMD ["npm", "start"]
