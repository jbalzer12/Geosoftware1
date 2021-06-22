FROM node:8

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install

# Expose ap on a given port
EXPOSE 3000 

# Start app
CMD ["npm", "start"]