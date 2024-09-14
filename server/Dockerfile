FROM node:alpine
WORKDIR /app
COPY . ./
RUN npm install

ENTRYPOINT ["npm", "run", "dev"]
EXPOSE 3000
