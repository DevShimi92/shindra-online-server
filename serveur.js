const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const port = 5003

// Connect Database
const db = require('./util/database');

const  app = express();

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));

//Handlebars
app.engine('handlebars', exphbs({ defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.set("views", path.join(__dirname, "./views"));
app.disable('view cache');

//Set static folder
app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));

// middleware pour les CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    next();
})



// players routes
// app.use('/players', require('./routes/players'));

// app.get("/users", (req, res) => {
//     var user1 = {firstName : "Dom", lastName: "Lung"}
//     const user2 = {firstName: "Kev", LastName: "Bauer"}
//     res.json([user1, user2]);
//     res.send("Nodemon auto updates when I save this file");
// })

// app.get('/users/:id', (req, res) => {
//     console.log("Responding to root route" + req.params.id);

//     res.end();
// })

// ** User: routes **
// app.get('/users', (req, res) => {
//     var q = 'SELECT * FROM users';
//     conn.query(q, (err, result) => {
//         res.json({ users: result });
//     })
// })
// Index route
app.get('/', (req, res) => 
    {res.render('index', { layout: 'landing' })});

// app.get('/', (req, res) => {
//     res.json({ message: 'homepage' })
// })

// app.get('/', (req, res) => res.send('Hello World!'))


// Product routes
app.use('/products', require('./routes/products'));

// create a table
// sequelize
//     .sync()
//     .then(result => {
//         console.log(result);
//         app.listen(5002);
//     })
//     .catch(err => {
//         console.log(err);
//     });


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
