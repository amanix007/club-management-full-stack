# Club Member Management system React, Express, Mysql , Typescript

## Run the System
We can easily run the whole with only a single command:
```bash
docker-compose up
```


 [App Available at http://127.0.0.1:8888/](http://127.0.0.1:8888/).

The services can be run on the background with command:
```bash
docker-compose up -d
```

## Stop the System
Stopping all the running containers is also simple with a single command:
```bash
docker-compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker-compose down --rmi all
```



MYSQLDB_USER=root
MYSQLDB_ROOT_PASSWORD=123456
MYSQLDB_DATABASE=bezkoder_db
MYSQLDB_LOCAL_PORT=3307
MYSQLDB_DOCKER_PORT=3306

NODE_LOCAL_PORT=6868
NODE_DOCKER_PORT=8080

CLIENT_ORIGIN=http://127.0.0.1:8888
CLIENT_API_BASE_URL=http://127.0.0.1:6868/api

REACT_LOCAL_PORT=8888
REACT_DOCKER_PORT=80