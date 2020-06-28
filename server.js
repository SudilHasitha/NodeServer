//import the express package
const express = require('express');
//Create the app
const app = express();
//Use cors to by pass https
const cors = require('cors');
app.use(cors())
// Need to import body parser to read data
const bodyParser = require('body-parser');
app.use(bodyParser.json())
// import bcrypt
const bcrypt = require('bcrypt-nodejs'); 
const { response } = require('express');

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log('app is running',PORT) 
})

const register = require('./controllers/register.js');
const signIn = require('./controllers/signin.js');
const getUser = require('./controllers/getUser.js');
const rank = require('./controllers/rank.js');


// create knex instance and connect with DB
var knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'Pa$$w0rd',
      database : 'smart-brain'
    }
  });


//register the user 
// use dependency injections to pass connections
app.post('/register', (req,res) => {register.handleRegister(req,res,knex,bcrypt)})

//get user
app.get('/profile/:id',(req,res) => {getUser.getUserByID(req,res,knex)})

// Update the rank
app.put('/image',(req,res) => {rank.rankIncrement(req,res,knex)})

//Sign in
app.post('/signin', (req,res) => {signIn.UserSignin(req,res,knex,bcrypt)})

//API request 
app.post('/imageURL',(req,res) => {rank.handleAPICall(req,res)})

console.log(process.env);