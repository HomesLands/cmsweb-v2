FROM node:latest

LABEL description="Dockerfile for build Docsify."

WORKDIR /app

RUN npm install -g docsify-cli@latest

COPY . /app/docsify

EXPOSE 3001

CMD ["docsify", "serve", "/app/docsify", "-p", "3001"]