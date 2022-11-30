# Sample Database
Just a small repo to learn how to set up backend + frontend only using JS and frameworks.
A .env file is needed to setup environment variables. These include:

- USER (The user for the database, default = root)
- PASSWORD (The user's password, default = )
- PORT (The port to run the server on, default = 3000)
- DATABASE (The name of the database we create/connect to, default = sample_database);

The host is defaulted to localhost. All tests for API will be available via Postman Collections which can
be imported into Postman and ran in sequence or individually (ensure server is running).

Main entry point is app.js, so to run, use "node app.js" or via the script start, such as "npm run start".