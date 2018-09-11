
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const c = require('./controller');
const session = require('express-session');
// const checkForSession = require('./middlewares/checkForSession');

require('dotenv').config();


const app = express(); 
// console.log(process.env.SESSION_SECRET);
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {maxage: 1000*60*24}
}))


// app.use( checkForSession );
app.use( express.static( `${__dirname}/../build` ) );




massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database)
    console.log('database connected')
}).catch(error => {
    console.log('error from massive connection', error)
})

app.get('/api/questions', c.read)

app.post('/api/register', c.register)

//login user
app.post('/api/login', c.login)

//logout
app.post('/api/logout', c.logout)



const path = require('path')
app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../build/index.html'));
    })

PORT = 4000
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))

