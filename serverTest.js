

//import the express package
const express = require('express');

//Create the app
const app = express();

//Use cors to by pass https
const cors = require('cors');
app.use(cors())

app.listen(3000, ()=>{
    console.log('app is running 3000')
})

//create a get
app.get('/',(req,res)=>{
    res.send(database.users)
})

// Create temporary array of users using an database object
const database = {
    users:[
        {
            id:'123',
            name:'john',
            email:'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id:'124',
            name:'sally',
            email:'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

// Need to import body parser to read data
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// /signin --> POST = success/fail
app.post('/signin',(req,res) =>{
    // Load hash from your password DB.
    bcrypt.compare("cookies", '$2a$10$Gs1uoK9M0PPa2wNJunbTvOkkpX3xMc84OHhv7wa0twfOYYNmoslzW', function(err, res) {
        console.log('First Guess',res)
    });
    bcrypt.compare("veggies", '$2a$10$Gs1uoK9M0PPa2wNJunbTvOkkpX3xMc84OHhv7wa0twfOYYNmoslzW', function(err, res) {
        console.log('Second Guess',res)
    });

    if(req.body.email === database.users[0].email
        && req.body.password === database.users[0].password){
            res.json(database.users[0]);
    }else{
        res.status(400).json('error logging in');
    }
   
})

// import bcrypt
const bcrypt = require('bcrypt-nodejs');

// /register --> POST = user
app.post('/register',(req,res) => {
    //use destructuring to get 
    const {email,name,password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
    });
    database.users.push({
            id:'124',
            name:name,
            email:email,
            entries: 0,
            joined: new Date()
    });
    //Need to response otherwise the express will hang there
    res.json(database.users[database.users.length - 1]);
})


// Use of bcrypt to get hash
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });




// Get users
app.get('/profile/:id',(req,res) =>{
    const {id} = req.params;
    let statusFound = false;

    database.users.forEach(userValue =>{
        if(userValue.id === id){
            statusFound = true;
            return res.json(userValue.entries);
        }
    })
    if(!statusFound){
        res.status(400).json('not found');
    }
})

// increase the image count
app.put('/image',(req,res) =>{
    const {id} = req.body;
    let statusFound = false;

    database.users.forEach(userValue =>{
        if(userValue.id === id){
            statusFound = true;
            userValue.entries++;
            return res.json(userValue.entries);
        }
    })
    if(!statusFound){
        res.status(400).json('not found');
    }
})



/*
            API Design

/ --> get : root
/signin --> POST = success/fail
/register --> POST = user
/profile/userID --> GET = user
/image --> PUT -->User rank

*/