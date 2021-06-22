# Geosoftware1


Readme for folder 'Uebung07' which works with Docker:

The app runs as a dockerized application.
Therefore you will need the following images:
    - mongo
    - mongo-express
    - jbalzer12/uebung7

Once pulled all images or started the application via the docker-compose.yml file, you'll
need to create a database in mongo using the mongo-express admin-interface (accessible via localhost:8081)
    ->the database must be named "testserver_db"
    ->the testserver_db must contain a collection named "routes"
this must be done only once!

Now you can use the application!
It is accessible via:
localhost:3000/ for the app (or the port you advice the app to be)
localhost:8081/ for the database admin interface

Have fun!
