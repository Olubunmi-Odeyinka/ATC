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
java -jar target/atc-backend-1.0-SNAPSHOT-jar-with-dependencies.jar
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
