# Shopa

A shared real-time grocery list - ditch the old scraps of paper and go shopa-ing!
Shopa is a grocery list web-application that can be shared in real-time by multiple users. Shopa allows you to build your shopping list collaboratively with others and share it instantly with anyone around the world with access to a smart phone, tablet or computer. The live-updating checklist functionality shows which items have been purchased already and which remain to be purchased, so you won't end up with unwanted extras. You can also edit items on your shopping list and remove items which are no longer needed.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need to have Node Package Manager (npm) and the database system (postgres) installed on your machine.

```
https://www.npmjs.com/get-npm
https://www.postgresql.org/download/
```

### Installing

- Clone this repo into a directory using `git clone https://github.com/matthewjackson1/shopa.git` 

- Install dependencies by running `npm install`

- Create `.env` file in the top level directory (same level as `package.json` to accommodate requirement for secret option for sessions. add the line `megasecret="but there are plenty of forks"` to `/env`.

- Set up databases for development and test:

Start the database server
```
pg_ctl -D /usr/local/var/postgres start
```
Create the databases
```
createdb -U postgres -w bloccit-dev
createdb -U postgres -w bloccit-test
```
Run database migrations to generate the required tables
```
sequelize db:migrate
sequelize db:migrate --env test
```
You should then be able to start the development server
```
npm start
```
Navigate to `http://localhost:3001/` to try out the site

### Features

##### Homepage
A brief introduction to 
![image](https://user-images.githubusercontent.com/31005853/42067516-7f8e38a2-7b3e-11e8-8a00-b8b1b8443529.png)

##### Sign up and login
To create a shopping list, users must be logged in to an account. You can easily create an account using a username and password, or log in to your existing account.

![image](https://user-images.githubusercontent.com/31005853/42067506-738bef68-7b3e-11e8-9441-ae0a45125920.png)

![image](https://user-images.githubusercontent.com/31005853/42067513-794a7294-7b3e-11e8-8014-27ec320b09e2.png)

##### My list page (the homepage for logged in users)
This is where the magic happens! From here you can:
- Add list items 
- Edit existing list items
- Delete unwanted list items
- Mark items completed or incomplete again.

![image](https://user-images.githubusercontent.com/31005853/42067492-694cab96-7b3e-11e8-98b6-b788f828c1cd.png)

## Running the tests

Tests are written in jasmine for this application, and there are unit and integration tests. You can run the tests using the `npm test` command.

### Break down into end to end tests

Explain what these tests test and why

- Can I see the homepage when I am logged out?
- Can I create an account
- Can I create an account with duplicate username
- Can I sign in to an existing account
- Can I sign in with an incorrect password
- Can I see the list page when not logged in?
- Can I add a list item?
- Can I edit a list item?
- Can I delete a list item?
- Can I update a list item?
- Can I save an empty list item
- Can I mark an item as completed?
- Can I mark a completed item as incomplete again?


### What is next? 

- Test coverage is severely lacking due to time constraints - better to have a working prototype without tests than no product with tests. Most likely such an MVP would be thrown away quickly anyway.
- Code quality - code formatting and naming conventions could be followed better, and better commenting would also help users.
- Architecture - the front end is only partly in react at the moment due to time/complexity, could move over other components piece by piece.
- A better UI for the basic functionality (see story board https://trello.com/b/sFJ2ojKq/bloc-shopping-list)
- Ability to create multiple lists 
- Ability to add different users as collaborators to lists
- Add descriptions to items
- Categorise and prioritise the items on lists
- Public vs private lists
- Save “frequently purchased” items to a list of suggestions.
- Allow these to be added to the list.
- Allow users to set a max budget for an item (i.e., New Jeans for Lei - Max $25)
- Allow users to split payments based on grocery costs.
- Add a coupon API to your application to display available coupons for listed items.



## Deployment

I deployed my site to heroku at `https://matthewjackson1-shopa.herokuapp.com/`

You will need to have a heroku account set up (if not please go to http://www.heroku.com to set one up, and follow the setup instructions https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

From the command line:

Create a heroku app
```
heroku create YOUR_GITHUB_HANDLE-bloccit
```
Enable sessions by setting the secret variable
```
heroku config:set megasecret="but there are plenty of forks"
```
Create the database on production
```
heroku addons:create heroku-postgresql:hobby-dev
```
Push the repository to heroku
```
git push heroku master
```
Run the database migrations
```
heroku run sequelize db:migrate
```

If you have any issues, `heroku logs -t` may be useful for troubleshooting.

## Built With

* [Node](https://nodejs.org/en/) - Open Source JavaScript run time environment
* [Express](https://expressjs.com/) - A minimal and flexible Node.js web application framework
* [Sequelize](http://docs.sequelizejs.com/) - A promise-based ORM for Node.js v4 and up
* [NPM](https://www.npmjs.com/) - npm is the package manager for JavaScript and the world's largest software registry.
* [PostgreSQL](https://www.postgresql.org/) - The world's most advanced open source database
* [React](https://reactjs.org/) - React is a JavaScript library for building user interfaces
* [Passport](http://www.passportjs.org/) - Passport is authentication middleware for Node.js.
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - bcrypt is a password hashing function designed by Niels Provos and David Mazières
* [Jasmine](https://jasmine.github.io/) - Jasmine is an open source testing framework for JavaScript.
* [Body parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

# Technical choices
- Node/express is the framework I know best for managing building applications that need to store data in a database. Because this application needed to have persistent data across different devices it seemed necessary to use such a framework
- Passport and bcrypt because users should have to log in to create lists, otherwise the one list would have to be used by many people and this would be strange.
- React enables us to have live-updating information that does not require page refreshes

# Technical challenges you encountered
- Deciding how to incorporate React into the project - I thought at first I might build the front end totally in React. But my knowledge was very rusty and I realised that it would be overkill for the project given that only part of the application benefits from the live updating. 
- I found it hard to work out how React should integrate with Node, and I built a react app inside the node one and set up a proxy expecting to build this app. In the end I saw one solution which was to run a production build of a react app and include the bundle file into the node pages, but I couldn't figure out how this would work during development, how to get the two talking. So I went with the simplest option, integrating via the CDN files.
- It was also really hard working out how to pass data between node and react - I ended up using routes not including detailed user info such as IDs to fetch and post data, instead relying on bodyparser to send the user information across.
- I figured out how to use `fetch` to get required data from node and to post updates or change things, but there was a gotcha that I should have included `app.use(bodyParser.json());` in my `main-config.js` file which took me several hours to figure out.

# Enjoyable aspects of the project
- I enjoyed thinking through how the user interface would look and implementing aspects of that (though I didn't have time for everything)
- I liked near the end when everything started coming together and I knew how to make changes I wanted to make (e.g adding updating and deletion functionality, as I'd basically done this before with the creation).

## Authors

* **Matthew Jackson** - (https://github.com/matthewjackson1)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* **Bloc** - many aspects of the application have been adapted from Bloc projects.
