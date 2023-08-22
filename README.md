# airweb Technical Test

In order to run this test you need to:

1. Fill the `.env.example` file and change its name to: `.env.production`
  
  The database name set by default is `airweb_test` and the sqlite file can be found in the root of the project. The sqlite file by default contains the test's database information. If there is needed to use another database please change the sqlite file to the database name in the environment file, otherwise the application will create a new empty database.

2. Run the following commands in the project's root directory:

  ```bash
  npm run build
  npm run start:prod
   ```

3. Now you can access the application from the port defined in the environment file. A swagger interactive documentation is available at: <http://localhost:PORT/docs>
