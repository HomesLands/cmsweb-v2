FROM node:latest

LABEL description="Dockerfile for build Docsify."

WORKDIR /app

RUN npm install -g docsify-cli@latest

COPY . /app/docs

EXPOSE 3001

CMD ["docsify", "serve", "/app/docs", "-p", "3001"]