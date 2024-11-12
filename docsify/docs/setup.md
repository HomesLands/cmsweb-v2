# Deploy

- We can deploy in both development and production modes. Here, we will show you how to deploy in development and production modes using Nginx Proxy Manager.
- In this project, we use GitHub Actions to implement CI/CD for automation purposes.

## Development mode

This is our GitHub Actions file for dev:

- `deploy-dev.yaml` file

```yml
name: Deploy-dev

on:
  pull_request_target:
    branches: [main]
    types: [opened, closed]
  workflow_run:
    workflows: ["Build and Test"] # Trigger after 'Build and Test' workflow succeeds
    types:
      - completed

jobs:
  deploy:
    if: github.event.pull_request.merged
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Deploy dev
        uses: appleboy/ssh-action@v0.1.2
        with:
          host: ${{ secrets.REMOTE_HOST }}
          username: ${{ secrets.REMOTE_USER }}
          port: ${{ secrets.SSH_PORT }} # Specify your SSH port here
          key: ${{ secrets.SSH_PRIVATE_KEY_DEV }} # Add your private key here
          script: |
            cd cmsweb-v2/  # Change to your application directory on the remote host
            git pull origin main  # Pull latest changes
            docker compose -f .deploy/docker-compose.dev.yaml down
            docker compose -f .deploy/docker-compose.dev.yaml up -d --build
            docker image prune -f  # clean up none image after built
```

As you can see, we need to add the following secrets: `secrets.REMOTE_HOST`, `secrets.REMOTE_USER`, `secrets.SSH_PORT`, `secrets.SSH_PRIVATE_KEY_DEV` o allow GitHub Actions to authenticate and connect to your server remotely.

### Add secrets in Github Actions

1. Go to your GitHub repository.
2. In the repository, click on Settings.
3. In the left sidebar, select Secrets and variables > Actions.
4. Click New repository secret.
5. Add a name for your secret (e.g., `REMOTE_HOST`, `REMOTE_USER`) in the Name field.
6. Add the secret value in the Secret field.
7. Click Add secret.

### How to run Github Actions

- In this project, we use the GitHub fork feature. This means that if you want to contribute to our project, you need to fork this project to your repository.

- When you create a pull request from your repository to ours, `build-and-test.yaml` will run automatically to check for errors in your pull request.

- If your pull request passes, we will merge the code. After that, `deploy-dev.yaml` will run automatically..

## Production mode

This is our GitHub Actions file for dev:

- `deploy-prod.yaml` file

```yml
name: Deploy-prod

on:
  push:
    tags:
      - "v*" # This triggers the workflow on any tag

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Verify SSH Key Exists
        run: |
          if [ -z "${{ secrets.SSH_PRIVATE_KEY_PROD }}" ]; then
            echo "SSH_PRIVATE_KEY_PROD is not set"
          else
            echo "SSH_PRIVATE_KEY_PROD is set"
          fi

      - name: Set tag as environment variable
        id: set_tag
        run: echo "TAG=${GITHUB_REF#refs/tags/}" >> $GITHUB_ENV

      - name: Deploy production
        uses: appleboy/ssh-action@v0.1.2
        with:
          host: ${{ secrets.REMOTE_HOST_PROD }}
          username: ${{ secrets.REMOTE_USER_PROD }}
          port: ${{ secrets.SSH_PORT_PROD }} # Specify your SSH port here
          key: ${{ secrets.SSH_PRIVATE_KEY_PROD }} # Add your private key here
          script: |
            cd workspace/cmsweb-v2/  # Change to your application directory on the remote host

            # Update or add the TAG variable in the .env file with the current tag
            if grep -q '^TAG=' .deploy/.env; then
              sed -i "s/^TAG=.*/TAG=${{ env.TAG }}/" .deploy/.env
            else
              echo "TAG=${{ env.TAG }}" >> .deploy/.env
            fi

            git pull origin main  # Pull latest changes

            docker compose -f .deploy/docker-compose.prod.yaml down

            docker compose -f .deploy/docker-compose.prod.yaml up -d --build

            docker image prune -f  # clean up none image after built
```

In production mode, GitHub Actions wil run when we pushlish a new release.
