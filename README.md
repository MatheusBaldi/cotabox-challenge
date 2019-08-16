# Cotabox Challenge

This repository is my project for the [Cotabox Fullstack Developer Challenge](https://github.com/Cotabox/fullstack-challenge). The link provide more information about the challenge and its rules.

## Frontend
For the frontend I opted on using the following tools:
* [NuxtJS](https://nuxtjs.org/)
* [VueJS](https://vuejs.org/)
* [Nuxt Vue ApolloClient Module](https://github.com/nuxt-community/apollo-module)
    * [Vue Apollo Docs](https://vue-apollo.netlify.com/guide/)
* [VueChart.js](https://vue-chartjs.org/)
    * [Chart.js](https://www.chartjs.org/)
* [Vuelidate](https://vuelidate.netlify.com/)


## Backend

* [Express.js](https://expressjs.com/)
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
* [GraphQL](https://graphql.org/)
* [MongoDB](https://www.mongodb.com)
* [Mongoose](https://mongoosejs.com/)


---

## Deployment
The application was deployed to Heroku and is available [**here**](https://cotabox-challenge.herokuapp.com/)

---


## Run locally


**The backend must be run before the frontend**

[MongoDB](https://www.mongodb.com) must be installed locally

By default the database connection will be configured as `mongodb://127.0.0.1:27017/local_db`, but you can use a `.env` file to change it. There is a `.env-example` file in the root directory for convenience. The `PORT` variable should not be changed.


### Get the project

```
git clone https://github.com/MatheusBaldi/cotabox-challenge.git
cd cotabox-challenge 
```


### Backend

The backend will be available at `http://127.0.0.1:4000/graphql`

In the project's root directory:
```
cd backend
npm i
npm start
```


### Frontend

With the backend running, open a new terminal

In the project's root directory:
```
cd frontend
npm i
npm run local
```


Everything should be working now, you should be able to access the application on `http://127.0.0.1:3000/`