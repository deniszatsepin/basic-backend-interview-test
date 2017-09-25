# Near Earth Object tracker
I decided to implement this project based on Express framework. It's a matured Node.js framework with the biggest community, so it's a lot of middlewares for it available in NPM and it's easy to get help if you get any problems.

As a persistent layer, I chose MongoDB with Mongoose. MongoDB is a pretty good NoSQL database for fast prototyping and also for production. And Mongoose is the best tool to work with MongoDB on Node.js.

For API realization I prefer specification-driven approach. It means that firstly for API endpoint we should prepare specification (swagger), then write tests, and then implement required models, controllers, etc. I use swagger-tools to connect an application with a specification.

And I also used Docker to implement development and production environment.

## Directory structure
- `codebase` - all application sources placed in that directory
- `contract` - includes swagger specification file
- `infra` - all infrastructure related resources should be placed here. (Docker files, Jenkins files, etc.)

## Usage
- clone this repo
- go to your `basic-backend-interview-test` directory
- run `docker-compose -f infra/docker-compose-files/docker-compose.yaml up`

### Command
To run a command which requests the data from the last 3 days from nasa api you may run:
`docker-compose -f infra/docker-compose-files/docker-compose.yaml exec api npm run loadObjects`

### API
API documentation will be available on http://localhost:8080/docs

To change application ports you may edit `.env` file in root directory of the project. It also includes NASA API address and key.

## Development
For development purposes we have `infra/docker-compose-files/docker-compose.tdd.yaml` file. Use it to run project in development (TDD) environment.

---
# Basic Backend Developer Interview

Dear candidate, please follow this readme and solve all questions.

> Before you can start, you should prepare your development environment.

**This test requires:**
- access to the internet
- your favourite IDE
- (PHP) working dev environment with PHP 7 and symfony 3.x
- (Node) working dev environment with Node.js LTS
- database (MongoDB, Postgres, MySQL)
- nginx or alternative simple dev web server

**Good luck!**


--------


## Test tasks:

**NOTE:** You are free to use any framework you wish. Bonus points for an explanation of your choice.

1. Specify a default controller
  - for route `/`
  - with a proper json return `{"hello":"world!"}`

2. Use the api.nasa.gov
  - the API-KEY is `N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD`
  - documentation: https://api.nasa.gov/neo/?api_key=N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD
  
3. Write a command
  - to request the data from the last 3 days from nasa api
  - response contains count of Near-Earth Objects (NEOs)
  - persist the values in your DB
  - Define the model as follows:
    - date
    - reference (neo_reference_id)
    - name
    - speed (kilometers_per_hour)
    - is hazardous (is_potentially_hazardous_asteroid)

4. Create a route `/neo/hazardous`
  - display all DB entries which contain potentially hazardous asteroids
  - format JSON

5. Create a route `/neo/fastest?hazardous=(true|false)`
  - analyze all data
  - calculate and return the model of the fastest asteroid
  - with a hazardous parameter, where `true` means `is hazardous`
  - default hazardous value is `false`
  - format JSON

6. Create a route `/neo/best-year?hazardous=(true|false)`
  - analyze all data
  - calculate and return a year with most asteroids
  - with a hazardous parameter, where `true` means `is hazardous`
  - default hazardous value is `false`
  - format JSON

7. Create a route `/neo/best-month?hazardous=(true|false)`
  - analyze all data
  - calculate and return a month with most asteroids (not a month in a year)
  - with a hazardous parameter, where `true` means `is hazardous`
  - default hazardous value is `false`
  - format JSON
   
## Additional Instructions

- Fork this repository
- Tests are not optional
- (PHP) Symfony is the expected framework
- After you're done, provide us the link to your repository.
- Leave comments where you were not sure how to properly proceed.
- Implementations without a README will be automatically rejected.

## Bonus Points

- Clean code!
- Knowledge of application flow.
- Knowledge of modern best practices/coding patterns.
- Componential thinking.
- Knowledge of Docker.
- Usage of MongoDB as persistance storage.
