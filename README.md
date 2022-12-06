# Sample Database
Just a small repo to learn how to set up backend + frontend only using JS and frameworks. I've avoided things like sequelize and mysql-js
and other modules so I can make life harder for me (my chosen torture, if you will). That way I can be sure I know the inner workings of this stuff.
This helps so when I start using abstraction to make things quicker, more consistent and easier, I will have a solid ground knowledge to understand what's going on.

The host is defaulted to localhost. All tests for API will be available via Postman Collections which can
be imported into Postman and ran in sequence or individually (ensure server is running).
To host the backend server, 5 small steps:

1. Run "npm install" in terminal after changing directory to be wherever you cloned this repo at.

2. Set up MySQL credentials and have database running on some port (does not matter which). See official details for this at the main site, https://www.mysql.com/. Plenty of guides exist for setting up, but official details are located at https://dev.mysql.com/doc/mysql-getting-started/en/

3. A .env file is needed to setup environment variables. These include:

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
4. Run the createDb.js file using "npm run init"
5. Run the main app using "npm run start"

While running the server, navigating to "http://localhost:YOUR_PORT" will go to the home page. Very much WIP, but gives some info about the project.

If you wish to stop the server, use CTRL + C (on windows) or the Mac/Linux equivalent.
If you wish to delete the database, run SQL query: DROP DATABASE "yourDatabaseName";