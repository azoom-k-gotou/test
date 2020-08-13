# Strapi application

A quick description of your strapi application


Set up project.
```
$ yarn
$ yarn dcc:up
$ yarn develop
```

Import data.
```
$ cp ./deployments/development/mysql-dump/places.sql ./deployments/development/.data/mysql-dump/places.sql
$ docker exec -i -t development_places-strapi-mysql_1 bash
(container)$ mysql -u root -D places < /var/backups/places.sql
```