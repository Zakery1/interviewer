const numOfSaltRounds = 12;
const bcrypt = require('bcrypt');

module.exports = {
    read: ( req, res ) => {
        req.app.get('db').read_questions().then( questions => {
            console.log(questions)
            res.status(200).send(questions)}).catch( err => {
                res.status(500).send(err, 'server error--------')
        })
    },
    register: (req, res ) => {
        const { first_name, last_name, username, password, email } = req.body 
        bcrypt.hash(password, numOfSaltRounds).then(hashedPassword => {
        req.app.get('db').create_user([first_name, last_name, username, hashedPassword, email ])
        .then(newUser => {
            console.log(newUser)
            req.session.user = { username };
            console.log('username-------------', username)
            res.json({
                username: newUser[0].username,
                userId: newUser[0].id  
            })
            }).catch(error => {
                console.log('Endpoint error with createUser', error)
                res.status(500).json({message: 'Error on the server'})
        })   
    })
    },
    login: ( req, res ) => {
        const { username, password } = req.body
                                    ///// username in array because db statement is $1 and not ${user}
        req.app.get('db').read_user([username]).then(users => {
            //if this db statement brings back a response
            if(users.length) {
                //bcript method compares user input to that useres password
                bcrypt.compare(password, users[0].password).then(passwordsMatch => {
                    //if the passwords
                    if(passwordsMatch) {
                        req.session.user = { 
                            username: users[0].username,
                            userId: users[0].id
                         };
                        res.json(req.session.user)
                    } else {
                        res.status(403).json({ message: 'Wrong password' })
                      }
                })
            } else {
                res.status(403).json({ message: "That user is not registered" })
              }
        })
    },
    logout: (req, res)=> {
        req.session.destroy();
        res.status(200).send('logged out');
    }
}