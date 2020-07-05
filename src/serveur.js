const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT;
const Product = require('./models/Product');

// Connect Database
const db = require('./util/database');

const app = express();

//Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}));

//Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
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

// products routes
app.use('/products', require('./routes/products'));



// players routes
// app.use('/players', require('./routes/players'));

// Index route afficher la template OK
app.get('/', (req, res) => {
    res.render('index', {
        layout: 'landing'
    });
});

// Index route afficher la template OK
app.get('/products/new', (req, res) => {
    res.render('add');
});

// éditer un produit OK
app.get("/product/edit-products/:id", async (req, res) => {
    const {
        id
    } = req.params;
    Product.findOne({
            where: {
                idproduct: id
            },
            raw: true
        })
        .then((product) => {
            res.render('edit-product', {
                dataValues: product
            });
        });
});

// Affiche une carte
app.get('/products/all/:id', async (req, res) => {
    const {
        id
    } = req.params;
    Product.findOne({
            where: {
                idproduct: id
            },
            raw: true
        })
        .then((product) => {
            res.render('card', {
                dataValues: product
            });
        });
});

// app.get("/products/delete/:id", (req, res) => {
//     res.render("edit-product");
// });

app.get('/products/all/delete', (req, res) => {
    res.render(result);
});

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