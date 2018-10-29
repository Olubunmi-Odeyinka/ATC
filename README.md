# ATC
ATC(i.e. Aircraft Traffic Coordination system for Tallinn Airport) a Lab 1 in subject “Software Quality and standards” (IDY0204) 

## Backend:

### Installation:

1. Install [JDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html). 
1. Install [Maven](https://maven.apache.org/). Follow the installation guide provided by the website.
1. Install [Postgres](https://www.postgresql.org/).
1. Create a database in Postgres (for example `atc`, since this one is provided by example config)
1. Clone the repository via git: `git clone git@github.com:Olubunmi-Odeyinka/ATC.git`.
1. Move into the backend folder: `cd atc_backend`.
1. Build using the project using `mvn package`.

Copy and paste for the lazy:
```
git clone git@github.com:Olubunmi-Odeyinka/ATC.git
cd atc_backend
mvn package
```

### Running

1. Configure your own database instance (We use Postgres)
1. Create a configuration file with the following structure:
```
server:
  port: 8080 # port to run the server on

database:
  user: postgres # db user
  password: postgres # db password

  source: jdbc:postgresql://localhost:5432/atc # location of the database and database name 
  driver: org.postgresql.Driver # driver to use when connecting to cb

security:
  password:
    length: 8 # minimal length of allowed password
  defaults:
    role: inactive # default role for newly created user
  jwt:
    secret: zAP5MBA4B4Ijz0MZaS48 # user to use for JWT
    issuer: ATC # JWT token issuer
    validity: 36000000 # How long is the token valid
    realm: atc-realm # Issuer realm
  
```
1. Run the application with ```java -jar -Datc.env=path/to/config -Dlog4j.configurationFile=env/log4j2.yaml target/atc-backend-1.0-SNAPSHOT-jar-with-dependencies.jar```

### API documentitation

API is available with the path `host:port/api/`.

#### Unauthenticated routes

____

**POST** `/users/login/`

Consumes:
```
{
  "id": 0, /* Optional */
  "username": "username",
  "password": "password",
  "role": "optional" /* Optional */
}

```

Produces:

403, Unauthorized

200, OK

JWT token e.g. `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsImlzcyI6IkFUQyIsImlkIjozMCwiZXhwIjoxNTQwMjY3NTM1fQ.U4jO7f7_KPjqK2uja7M68BXlBdvHsTTKk1UbHZQvBr0`

___

**POST** `/users/`

Consumes:
```
{
  "username": "",
  "password": "",
  "confirmPassword": ""
}
```


Produces:

409, Conflict if data is conflicting

201, Created: A user is created: 
```
{
  "id": 0,
  "username": "",
  "password": "******",
  "role": ""
}
```

____

### Authorized routes

____

**PATCH** `/users/{id}`

Consumes:
```
{
  "id": 0,
  "username": "",
  "password": "******",
  "role": ""
}
```

Produces:

409, Conflict - no id provided

200, OK - user was updated:
```
{
  "id": 0,
  "username": "",
  "password": "******",
  "role": ""
}
```

_____


**GET** `/users`

Consumes: -

Produces:

200, OK 
```
[
  {
    "id": 0,
    "username": "",
    "password": "******",
    "role": ""
  }
]
```

____
