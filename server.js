// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://default:password@proximus.modulusmongo.net:27017/uqusiN3u');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/www'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // define model ================= 
    var Contacts = mongoose.model('Contacts', {
        firstName: String,
        lastName: String,
        phone: Number,
        email : String,
        favourite : Boolean
    });

    // routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all contacts
    app.get('/api/getContacts', function(req, res) {

        // use mongoose to get all contacts in the database
        Contacts.find(function(err, contacts) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(contacts); // return all contacts in JSON format
        });
    });

    // create contact and send back all contacts after creation
    app.post('/api/saveContact', function(req, res) {

        // create a contact, information comes from AJAX request from Angular
        Contacts.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email : req.body.email,
            favourite : req.body.favourite,
            done : false
        }, function(err, contacts) {
            if (err)
                res.send(err);

            // get and return all the contacts after you create another
            Contacts.find(function(err, contacts) {
                if (err)
                    res.send(err)
                res.json(contacts);
            });
        });

    });

    // delete a contact
    app.delete('/api/deleteContact/:contact_id', function(req, res) {
        Contacts.remove({
            _id : req.params.contact_id
        }, function(err, contact) {
            if (err)
                res.send(err);

            // get and return all the contacts after you delete
            Contacts.find(function(err, contacts) {
                if (err)
                    res.send(err)

                res.json(contacts);
            });
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./www/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");