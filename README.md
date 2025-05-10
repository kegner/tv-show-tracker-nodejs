# TV Show Tracker

TV Show Tracker is a fullstack Node JS webapp to keep a running list of shows to watch or shows you have already watched. It can be combined with a frontend application to display data.

### Tech Stack

- NodeJS with Typescript to run the app
- Express as the framework
- Objection/Knex for ORM and queries
- PostgreSQL for storing data

## Build Instructions

#### Set up the DB

- Install [PostgreSQL](https://www.postgresql.org/download/) on your system (or download [PgAdmin](https://www.postgresql.org/download/) for a database GUI tool).
- Create a new database.
- Run the SQL script `/scripts/create_schema.sql`

#### Set up the .env file

- Create a `.env` file from the `.env-template` file.
- Add values for `DB_NAME`, `DB_USER`, `DB_PASS` for your local Postgres instance.
- If setting up the application with HTTPS, the `COOKIE_SECURE` variable should be changed to `true`.

#### Run the app for development

- Use `npm start` or `npm run server` to start the app normally or with nodemon respectively.

This will default to running the app on port 5000. You may edit this port in the `.env` file.

#### Run the app with a frontend app

- Add a frontend app to a folder called `/client`.
- Adjust the `package.json` as needed for running the frontend app.
- Run the command `npm run dev`. This will use `concurrently` to start the Node JS app on `localhost:5000` by default and the frontend app on whichever port it is configured to.

#### Build the Node JS backend

- `npm run build` will output the transpiled js files to `/dist`.
- `npm run build-client` will build the client app to `/client/dist/` if it exists.
