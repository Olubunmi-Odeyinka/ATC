# ATC
ATC(i.e. Aircraft Traffic Coordination system for Tallinn Airport) a Lab 1 in subject “Software Quality and standards” (IDY0204) 

## Backend:

### Installation:

1. Make sure you have [Maven](https://maven.apache.org/) installed.
1. Clone the repository.
1. Move into the backend folder.
1. Build using `mvn package`.

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
  port: 8080 # port to run server on

database:
  user: postgres # user to access db as
  password: postgres # password of the user to access db as

  source: jdbc:postgresql://localhost:5432/atc # location of the db
  driver: org.postgresql.Driver # driver to use when connecting to the db
  
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
