# ETHEREUM TOKEN TRACKER

This small application is used to track new tokens that appeared in WETH transactions.

----------
# Getting started
## Requirements

In order to run this application, one needs to have (recommended versions):

- [NodeJs](https://nodejs.org/en/) (14.15.1)
- [Npm](https://www.npmjs.com/get-npm)
- [Docker](https://www.docker.com/)

## Running the project 

1. Open console and make sure you're in the root folder.
2. Run `docker-compose -f postgres/docker-compose.yml up -d` command to install PostgreSQL database.
3. Run `npm install` to install dependencies.
4. Run `npm run db:seed` to seed the database with all existing tokens.
5. Run `npm run start` to start the application.
6. Open the token controller and check the api on `localhost:3000/token/`

Warning: Running the `npm run db:seed` command will override any schema and data that exists in the database!

The project was tested and is working on Windows 10 Pro Edition with Linux Docker Containers.

## Testing

To start the test suite run `npm run test` command.

### Additional docker scripts
To completely remove the database run:

`docker-compose -f postgres/docker-compose.yml down`

To stop or start docker simply run:

start: `docker-compose -f postgres/docker-compose.yml start`

stop: `docker-compose -f postgres/docker-compose.yml stop`

### Warning!

Docker exposes postgres to standard postgres port: 5432.

## Credits

This project wouldn't be possible without:
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [JestJs](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Uniswap](https://uniswap.org/docs/v2/API/overview/)