FROM node:16.19.0

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8000

ENTRYPOINT ["npm", "run", "start"]
