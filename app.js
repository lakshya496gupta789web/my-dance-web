const mysql = require('mysql');
const express = require("express");
const path = require("path");
const app = express();
const port = 80;

app.use(express.json());

const bodyParser = require('body-parser');
const con = require('./mysql');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//Express Specific Stuff
app.use('/static', express.static('static')) //for serving static files
    // app.use(express.urlencoded({ extended: true }))



//Pug Specific Stuff
app.set('view engine', 'pug') // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // set the view directory

//EndPoints
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params)
});
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params)
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + './views/index.pug');
});

app.post('/', (req, res, ) => {
    // var id = req.body.id
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var address = req.body.address;

    console.log(req.body, "bodu]y data");

    var sql = "INSERT INTO d_1(name,phone,email,address) values('" + name + "', '" + phone + "', ' " + email + "','" + address + "')";
    con.query(sql, (error, result) => {
        // if (error) throw error;
        if (error) console.log("[mysql error]", error);
        // console.log(auth);
        res.send('student registered successfully ' + result);
        console.log(result);
    });
});

// start the server
app.listen(port, () => {
    console.log(`this application is started on port ${port}`);
})