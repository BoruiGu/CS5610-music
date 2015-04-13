var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');
var url = require('url');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(session({ secret: 'this is the secret' }));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 2525;

var connection = mysql.createConnection({
    host: process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
    port: process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
    user: 'adminmwuUVlR',
    password: 'yfjg6-HIbGQw',
    database: 'music'
});

connection.connect();

app.get('/hello', function (req, res) {
    res.send('hello world');
});

app.use(express.static(__dirname + '/src'));

app.listen(port, ip);

/* Authentication */
passport.use(new LocalStrategy(
function (username, password, done) {
    //    for(var u in users)
    //    {
    //        if(username == users[u].username && password == users[u].password)
    //        {
    //            return done(null, users[u]);
    //        }
    //    }
    var query = connection.query('SELECT * from user where username = ?', username, function (err, rows, fields) {
        if (err) throw err;
        if ((rows.length == 0) || (username != rows[0].username) || !bcrypt.compareSync(password, rows[0].password)) {
            return done(null, false);
        }

        var user = {
            uid: rows[0].uid,
            username: rows[0].username
        };

        return done(null, user);
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.post("/api/login", passport.authenticate('local'), function (req, res) {
    var user = req.user;
    console.log(user);
    res.json(user);
});

app.get('/api/loggedin', function (req, res) {
    if (req.isAuthenticated()) {        
        connection.query('select uid from user where username = ?', req.user.username,
        function (err, rows, fields) {
            if (err) throw err;        
            var user = {
                uid: rows[0].uid,
                username: req.user.username
            }
            console.log(user);
            res.send(user);
        });
    } else {
        res.send('0');
    }
});

app.post('/api/logout', function (req, res) {
    req.logOut();
    res.send(200);
});

app.post('/api/register', function (req, res) {
    /* Generate a salt */
    var salt = bcrypt.genSaltSync(10);
    /* Hash the password with the salt */
    var hash = bcrypt.hashSync(req.body.password, salt);
    var newUser = {
        username: req.body.username,
        /* Store hashed password in database */
        password: hash
    };    
    connection.query('insert into user SET ?', newUser,
    function (err, rows, fields) {
        if (err) {
            res.json(err);
            return;
        }
        /* Successful */
        console.log(rows);
        req.login(newUser, function (err) {
            if (err) {
                res.json(err);
                return;
            }
            var createdUser = {
                uid: rows.insertId,
                username: newUser.username
            };
            res.json(createdUser);
        });
    });
});

var auth = function (req, res, next) {
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

/* List all users */
app.get("/rest/user", auth, function (req, res) {
    // UserModel.find(function (err, users) {
    //     res.json(users);
    // });
});

/* Remove a user */
app.delete("/rest/user/:id", auth, function (req, res) {
    // UserModel.findById(req.params.id, function (err, user) {
    //     user.remove(function (err, count) {
    //         UserModel.find(function (err, users) {
    //             res.json(users);
    //         });
    //     });
    // });
});

app.put("/rest/user/:id", auth, function (req, res) {
    // UserModel.findById(req.params.id, function (err, user) {
    //     user.update(req.body, function (err, count) {
    //         UserModel.find(function (err, users) {
    //             res.json(users);
    //         });
    //     });
    // });
});

/* create a new user?? */
app.post("/rest/user", auth, function (req, res) {
    // UserModel.findOne({ username: req.body.username }, function (err, user) {
    //     if (user == null) {
    //         user = new UserModel(req.body);
    //         user.save(function (err, user) {
    //             UserModel.find(function (err, users) {
    //                 res.json(users);
    //             });
    //         });
    //     }
    //     else {
    //         UserModel.find(function (err, users) {
    //             res.json(users);
    //         });
    //     }
    // });
});

app.post('/api/comment', function (req, res) {
    connection.query('insert into comment SET ?', req.body,
    function (err, rows, fields) {
        res.send(200);
    });
});