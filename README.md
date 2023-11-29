# pet-sitting-services-app-backend
## Description
Server side code of the Pet Sitting Services application.

### Tech Stack
* Express.js

## Features
* RESTful API app management(CRUD operations):
  * GET list of sitters and requests;
  * POST requests;
  * UPDATE accepting/declining requests;
  * DELETE requests;
* MySQL database integration;
* Error handling;
  
## Getting started

### Prerequisites
* Node.js
* MySQL

### Installation
* Refer to https://nodejs.org/en/ to install node.js
* Configure the database connetion in database.ts in the data folder 

### Cloning and Running the Application in local

* Clone the project into local
* Install all the npm packages
  
```bash
npm install
```
* In order to run the application Type the following command

```bash
npm run dev
```
### API Endpoints
#### Authentication
* <strong>POST /url/log-in</strong>: saves user's log-in information to compare with the one in the database
* <strong>POST /url/sign-up</strong>: saves a new user in the database
#### Customer's page
* <strong>GET /url/customer/sitters</strong>: to display all the signed up sitters
* <strong>GET /url/customer/requests</strong>: to display all the requests made by the user
* <strong>POST /url/customer/post</strong>: saves the user's request in the database
* <strong>DELETE /url/customer/delete</strong>: to delete a request
#### Sitter's page
* <strong>GET /url/sitter/requests</strong>: to display all request sent to the sitter
* <strong>UPDATE /url/sitter/request_answer</strong>: to accept or decline a request

## Frontend Instructions
Refer to https://github.com/samuel-santos91/pet-sitting-services-app/tree/main
