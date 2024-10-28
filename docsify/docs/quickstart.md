# Quick start

It is recommended to install [docker](https://docs.docker.com/engine/install/ubuntu/) globally, which helps creating the website locally.

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Initialize

Clone project

```bash
git clone https://github.com/HomesLands/cmsweb-v2.git
```

Find `.deploy` folder and create `.env` file.

```bash
NODE_ENV=development
HOST_MYSQL=localhost
PORT_MYSQL=3306
USER_MYSQL=root
PASSWORD_MYSQL=Pass@1234
DATABASE_MYSQL=cmsweb_db
HASH_SALT=$2a$10$8UWSZY.XVY0wwB/s6P3l.u
JWT_SECRET=09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611
PASSPORT_SECRET=12345
DURATION=6000
REFRESHABLE_DURATION=36000
TAG=v1
PORT=3000
SWAGGER_ENDPOINT=http://localhost:3000/api
BROKER_URL=localhost:9092
```

By default, we dont map port in each service to secure this website. So if you want to run localy, you'll need to update `.deploy/docker-compose.dev.yaml`

```yml
volumes:
  mysql:
  kafka:

services:
  backend:
    build:
      context: ../app/backend
      dockerfile: ../../.build/backend/Dockerfile # Adjusted to be relative to the context
    healthcheck:
      test:
        [
          "CMD",
          "curl",
          "-f",
          "http://localhost:3000/api/${TAG}/healthCheck/status",
        ]
      interval: 5s
      timeout: 5s
      retries: 10
      start_period: 30s # Give more time for MySQL to become ready
    environment:
      NODE_ENV: ${NODE_ENV}
      HOST_MYSQL: ${HOST_MYSQL}
      PORT_MYSQL: ${PORT_MYSQL}
      USER_MYSQL: ${USER_MYSQL}
      PASSWORD_MYSQL: ${PASSWORD_MYSQL}
      DATABASE_MYSQL: ${DATABASE_MYSQL}
      HASH_SALT: ${HASH_SALT}
      JWT_SECRET: ${JWT_SECRET}
      PASSPORT_SECRET: ${PASSPORT_SECRET}
      DURATION: ${DURATION}
      REFRESHABLE_DURATION: ${REFRESHABLE_DURATION}
      SWAGGER_ENDPOINT: ${SWAGGER_ENDPOINT}
      TAG: ${TAG:-v1}
      BROKER_URL: ${BROKER_URL}
      TZ: Asia/Ho_Chi_Minh
    depends_on:
      mysql_db:
        condition: service_healthy
      kafka:
        condition: service_healthy
    ports:
      - "3000:3000"

  mysql_db:
    build:
      context: ../.build/mysql
    volumes:
      - mysql:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: ${PASSWORD_MYSQL}
      MYSQL_DATABASE: ${DATABASE_MYSQL}
      TZ: Asia/Ho_Chi_Minh
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 60s # Increase timeout to give MySQL more time
      retries: 5

  frontend:
    build:
      context: ../app/frontend
      dockerfile: ../../.build/frontend/Dockerfile # Adjusted to be relative to the context
    healthcheck:
      test: ["CMD", "nc", "-z", "localhost", "5137"] # TCP check on port 5137
      interval: 10s # Increase interval between health checks
      timeout: 10s # Increase timeout for slower responses
      retries: 5
      start_period: 60s # Give the frontend app more time to become ready
    restart: always
    ports:
      - "5137:5137"

  docs:
    build:
      context: ../docsify
      dockerfile: ../.build/docsify/Dockerfile # Adjusted to be relative to the context
    healthcheck:
      test: ["CMD", "nc", "-z", "localhost", "3001"] # TCP check on port 3001
      interval: 10s # Increase interval between health checks
      timeout: 10s # Increase timeout for slower responses
      retries: 5
    ports:
      - "3001:3001"

  kafka:
    image: "bitnami/kafka:latest"
    environment:
      KAFKA_CFG_NODE_ID: 0
      KAFKA_CFG_PROCESS_ROLES: controller,broker
      KAFKA_CFG_LISTENERS: PLAINTEXT://:9092,CONTROLLER://:9093
      KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP: CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT
      KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: 0@kafka:9093
      KAFKA_CFG_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_CFG_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
    healthcheck:
      test:
        [
          "CMD",
          "kafka-topics.sh",
          "--list",
          "--bootstrap-server",
          "localhost:9092",
        ]
      interval: 30s # Time between each health check
      timeout: 10s # Timeout for each health check
      retries: 5 # Number of retries before marking the container as unhealthy

  notification:
    build:
      context: ../app/notification-service
      dockerfile: ../../.build/notification/Dockerfile # Adjusted to be relative to the context
    environment:
      HOST_MYSQL: ${HOST_MYSQL}
      PORT_MYSQL: ${PORT_MYSQL}
      USER_MYSQL: ${USER_MYSQL}
      PASSWORD_MYSQL: ${PASSWORD_MYSQL}
      DATABASE_MYSQL: ${DATABASE_MYSQL}
      NODE_ENV: ${NODE_ENV}
      BROKER_URL: ${BROKER_URL}
      TZ: Asia/Ho_Chi_Minh
    depends_on:
      backend:
        condition: service_healthy
    ports:
      - "3002:3002"

networks:
  default:
    external: true
    name: scoobydoo
```

Find `app/frontend` folder and create `.env` file:

```bash
VITE_BASE_API_URL="http://localhost:3000/api/v1"
VITE_PUBLIC_FILE_URL="http://localhost:3000/api/v1/files"
```

## Build

After the `init` is complete, you can run project using this command from `root` project.

```bash
docker network create scoobydoo
docker compose -f .deploy/docker-compose.dev.yaml up -d --build
```

## Preview your site

You can preview your site in your browser on `http://localhost:5137`.

## Monitor

```bash
docker logs <container-id>
```

## Manual initialization

`Required` Install [MySQL](https://dev.mysql.com/downloads/workbench/)

`Required` Install `nvm (Node Package Manager)` and `Nodejs >= v18.17.0`:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

```bash
source ~/.bashrc
```

```bash
nvm install v18.17.0
nvm use v18.17.0
```

### Install dependencies

Install notification service

```bash
cd app/notification-service
npm install
```

Install Backend

```bash
cd app/backend
npm install
```

Install Frontend

```bash
cd app/frontend
npm install
```

### Create `.env`

Backend:

```bash
NODE_ENV=development
HOST_MYSQL=localhost
PORT_MYSQL=3306
USER_MYSQL=root
PASSWORD_MYSQL=Pass@1234
DATABASE_MYSQL=cmsweb_db
HASH_SALT=$2a$10$8UWSZY.XVY0wwB/s6P3l.u
JWT_SECRET=09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611
PASSPORT_SECRET=12345
DURATION=6000
REFRESHABLE_DURATION=36000
TAG=v1
PORT=3000
SWAGGER_ENDPOINT=http://localhost:3000/api
BROKER_URL=localhost:9092
```

Frontend:

```bash
VITE_BASE_API_URL="http://localhost:3000/api/v1"
VITE_PUBLIC_FILE_URL="http://localhost:3000/api/v1/files"
```

### Run your site

Start notification service:

```bash
cd app/notification-service/
npm run dev
```

Start Backend:

```bash
cd app/backend
npm run dev
```

Start Frontend:

```bash
cd app/frontend
npm run dev
```

Start Broker kafka:

```bash
docker compose -f .deploy/docker-compose-kafka.yml up -d
```

Start docify:

```bash
docsify serve docsify -p 3001
```

### Preview your site

- You can preview your site in your browser on `http://localhost:5173`.
- You can preview your API in your browser on `http://localhost:3000/api/api-docs`.
- You can preview your docs in your browser on `http://localhost:3001/docs`.
