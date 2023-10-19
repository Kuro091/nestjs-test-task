
Fork of https://github.com/brocoders/nestjs-boilerplate
but at its minimal form, with only the necessary packages to start a project.

## General requirements

1.  Stack - Nest JS
2.  Use version control and publish project in Github.
3.  JWT authentication and 3 pre-defined users (admin, normal, limited)
4.  Solution should generate an automated OpenAPI documentation in Swagger or any other engine.
5.  Use this PostgreSQL database as a data source: [https://rnacentral.org/help/public-database](https://rnacentral.org/help/public-database)

## Task description

1.  Make a GET method /locus
7.  Filtering parameters:
Id, int enum (rl table)
assemblyId, int, single value (rl table)
regionId, enum, (rld table)
membershipStatus, varchar,single value (rld table)

8.  Add sideloading parameter as enum. Make 1 value in the list - locusMembers
9.  Apply pagination parameters with default rows count=1000.
10.  Add sorting option of results for couple fields
11.  Relations to be defined in models. No raw sql.
12.  Permission: admin can access all columns, normal can access only data from rl table and cannot use sideloading, limited user can get data only for regionId in (86118093,86696489,88186467)
13.  Cover solution with some simple tests
 
 
![enter image description here](https://i.imgur.com/8ASKBqB.png)
![enter image description here](https://i.imgur.com/NderNKg.png)

# Admin user:

 With sideloading
 ![enter image description here](https://i.imgur.com/szc1ai6.png)
 Without sideloading
 ![enter image description here](https://i.imgur.com/8tTXMNI.png)
## Normal user
![enter image description here](https://i.imgur.com/rv0fN4J.png)(doesn't have locusMembers even though passed in as parameter)

## Limited User
No region Id/Wrong region Id:

![enter image description here](https://i.imgur.com/M4kPDqM.png)

Correct region Id 
![enter image description here](https://i.imgur.com/3Jg6bjk.png)
