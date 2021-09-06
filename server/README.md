# Prerequisite
- Docker Desktop (running)
- `npm install -g ts-node` to run `npm start`

# Start the DB
- Start docker desktop
- `docker compose up -d`

# Start the server
- `npm start`

# Env file
Create a `.env` file with the following variables:
```
ACCESS_TOKEN_SECRET=put_your_access_token_secret_here
REFRESH_TOKEN_SECRET=put_your_refresh_token_secret_here
```