FROM node:alpine
ENV URL_DB_CONNECTION=mongodb://10.128.0.2:27017/bookstore
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]
