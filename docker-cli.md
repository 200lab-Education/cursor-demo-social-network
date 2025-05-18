```bash
docker run -d --name demo-mysql -e MYSQL_ROOT_PASSWORD="my-root-pass"  -e MYSQL_USER="200lab" -e MYSQL_PASSWORD="my-user-secret" -e MYSQL_DATABASE="cursor-demos"  -p 3306:3306 bitnami/mysql:8.0
```

OR

```bash
docker run --name demo-postgres -p 5444:5432 -e POSTGRESQL_USERNAME=200lab  -e POSTGRESQL_PASSWORD=200lab_secret -e POSTGRESQL_DATABASE=cursor-demos  -d bitnami/postgresql:17
```