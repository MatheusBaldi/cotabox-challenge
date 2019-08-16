# Cotabox Challenge

This repository is my project for the [Cotabox Fullstack Developer Challenge](https://github.com/Cotabox/fullstack-challenge). The link provide more information about the challenge and its rules.

## Frontend
* For the frontend I opted on using the following tools:
* [NuxtJS](https://nuxtjs.org/)
* [VueJS](https://vuejs.org/)
* [Nuxt Vue Apollo Module](https://github.com/nuxt-community/apollo-module)
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


## Deployment
The application was deployed to Heroku and is available [**here**](https://cotabox-challenge.herokuapp.com/)


## Run locally

Make sure the ports 3000 and 4000 are available

The backend must be run before the frontend

[MongoDB](https://www.mongodb.com) must be installed locally


### Get the project

```
git clone https://github.com/MatheusBaldi/cotabox-challenge.git
cd cotabox-challenge // Project's root directory
```

### Backend


```
// In the project's root directory
cd backend
npm i
npm start
```

### Frontend

```
//In the project's root directory
cd frontend
npm i
npm run dev
```