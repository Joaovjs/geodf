## Getting Started

### Prerequisites

* Docker
* Npm or Yarn

### Installing

**Instantiate the required containers with Docker**

*By default the project is configured with POSTGRES, but can be changed by any other database supported by [TypeORM](https://typeorm.io/#/).*

Replace DATABASENAME with the name of the desired database and PASSWORD with the desired password.

```
$ docker run --name DATABASENAME -e POSTGRES_PASSWORD=PASSWORD -p 5432:5432 -d postgres
$ docker run --name redis -p 6379:6379 -d -t redis:alpine

```

**Configure the database connection**

Create a file named "ormconfig.json" at the root of the project and the server package folder, identical to the file *ormconfig.example.json*, with your database settings

```
{
	"type": "postgres",
	"host": "localhost",
	"port": 5432,
	"username": "postgres",
	"password": "PASSWORD",
	"database": "DATABASE",
	"entities": [
		"./src/modules/**/infra/typeorm/entities/*.ts"
	],
	"migrations": [
		"./src/shared/infra/typeorm/migrations/*.ts"
	],
	"cli": {
		"migrationsDir": "./src/shared/infra/typeorm/migrations"
	}
}
```

**Set the environment variables**

Create a file named ".env" at the root of the project identical to the *.env.example file*, replacing the environment variables with the desired ones

```
# Application
APP_SECRET=YOUR-SCECRET-KEY # Generate a secret key for your project at https://www.md5hashgenerator.com/
APP_API_URL=http://localhost:3333 # Enter the project URL
APP_WEB_URL=http://localhost:4200 # Enter the Front End URL for this project

# Redis
REDIS_HOST=localhost # Host to connect to Redis
REDIS_PORT=6379 # Port used in the docker to connect to Redis
REDIS_PASS= # Password used to connect to Redis

STORAGE_DRIVER=disk # Disk (local) or s3 support
MAIL_DRIVER=ethereal # Support for ethereal (tests) or SES
```

**Run the migrations to create the basic tables**

```
$ yarn typeorm migration:run
```

**Install all project dependencies**

```
$ yarn
```

## Running the tests

Run the tests to validate that everything is working fine

```
$ yarn test
```

## Running in development mode

```
$ yarn dev:server
```

You can see the project running in http://localhost:3333/
