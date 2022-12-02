# Sample Database
Just a small repo to learn how to set up backend + frontend only using JS and frameworks.
The host is defaulted to localhost. All tests for API will be available via Postman Collections which can
be imported into Postman and ran in sequence or individually (ensure server is running).
To run the backend, 3 small steps:

1. A .env file is needed to setup environment variables. These include:

- USER - The user for your MySQL server (default = root)
- PASSWORD - The user's password (default = )
- PORT - The port to run the server on, does not need to be MySQL's port (default = 3000)
- DATABASE - The name of the database we create/connect to (default = sample_database)

Example .env might look like:

```
# MySQL creds
USER=root
PASSWORD=

# Port to run server on
PORT=3000

# Name of the database
DATABASE=sample_database
```
2. Run the createDb.js file using "npm run init"
3. Run the main app using "npm run start"

If you wish to stop the server, use CTRL + C (on windows) or the Mac/Linux equivalent
If you wish to delete the database, run SQL query: DROP DATABASE "yourDatabaseName";