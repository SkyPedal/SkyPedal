FROM node:22-slim

# Install git
RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN sed -i src/config.json -e 's,"http://localhost:9000","/api",'

CMD ["npm", "run", "prod"]
