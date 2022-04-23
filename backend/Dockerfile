FROM node:alpine
ENV URL_DB_CONNECTION=mongodb+srv://root:pass@mongo.kuhec.mongodb.net/bookstore?retryWrites=true&w=majority
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]
