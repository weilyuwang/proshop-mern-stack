# ProShop MERN Stack

## An E-Commerce platform built from the ground up with React, Redux, Express & MongoDB

## Functionalities

- Full featured shopping cart

- Product reviews and ratings

- Top products carousel

- Product pagination

- Product search feature

- User profile with orders

- Admin product management

- Admin user management

- Admin Order details page

- Mark orders as delivered option

- Checkout process (shipping, payment method, etc)

- PayPal / credit card integration

- Custom database seeder script

## Tech Stacks used/learned throughout building this project

- React with Functional Components & Hooks

- React router

- React-Bootstrap UI library

- Component level state & props

- Managing global state with Redux (Actions & Reducers)

- Using Redux state in components (useDispatch & useSelector)

- Creating an extensive back end with Express

- Working with a MongoDB database and the Mongoose ODM

- JWT authentication (JSON web tokens)

- Creating custom authentication middleware

- Custom error handler

- Integrating the PayPal API

- Environment variables

- Project deployment

## Run locally:

#### Install dependencies

```
npm install

cd frontend && npm install
```

#### Create .env file

```
Under the project root directory, create a `.env` file and include the following vars:

NODE_ENV = ...
PORT = ...
MONGO_URI = ...
JWT_SECRET = ...
PAYPAL_CLIENT_ID = ...

```

- To use `PayPal API` along with `PAYPAL_CLIENT_ID`, checkout @https://developer.paypal.com/home

#### Start the application (both Express server and React frontend):

```
npm run dev
```

#### To load the sample data into or clear all data from the Mongo database with the seeder script

```
npm run data:import

npm run data:destroy
```

## Dev Tools (Optional)

### To enable hot reload

`nodemon` npm module

### To start up Frontend + Backend concurrently

`concurrently` npm module

### To customize console logging style

`colors` npm module

### Logger

`morgan` npm module to log client requests on the server console

### Redux Dev Tools

`redux-devtools-extension` npm module + Google Chrome `Redux DevTools` extension

## Environment Variables Config

`dotenv` npm module

- Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env

## React Frontend

### Theme

`Bootswatch - LUX` with `react-bootstrap` npm module

### Icons

`font-awesome` CDN from cdnjs.com

### Titles & Meta

`react-helmet`: A document head manager for React

### SPA Routes

`react-router-dom` + `react-router-bootstrap`: Integration between React Router v4 and React Bootstrap.

### State Management

`React Hooks (useState, useEffect, etc.)` for component-level state management

`Redux Pattern` for global-level state management with `redux`, `react-redux` and `redux-thunk` npm modules

### Handle Payment

`react-paypal-button-v2` npm module for handling PayPal payments

## NodeJS Backend

### ES Module

- To use `ES Module` instead of `CommonJS Module`:  
  Add `“type”: “module”` to the `package.json` for your project, and Node.js will treat all .js files in your project as ES modules.

### File Upload

`Multer` npm module for hanlding file uploading

## Database

### MongoDB

`MongoDB Atlas` + `mongoose` npm module

## Authentication

### JSON Web Token

`jsonwebtoken` npm module: An implementation of JSON Web Tokens  
`bcryptjs` npm module: Optimized bcrypt in JavaScript

## Deployment

### Heroku

#### Heroku Login & Create app

```
heroku login

heroku create APP_NAME
```

#### Create Procfile

```
web: node backend/server.js
```

#### Set up heroku-postbuild command

```
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"

```

#### Set up heroku remote git repo

```
heroku git:remote -a APP_NAME

git push heroku master
```

#### Add env variables in heroku settings

- To match with values inside `.env` file

#### Live App

- https://weilyu-proshop.herokuapp.com/
