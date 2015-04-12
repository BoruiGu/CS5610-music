var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');
var url = require('url');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

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
var mysqlHost = process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1';
var mysqlPort = process.env.OPENSHIFT_MYSQL_DB_PORT || 3306;

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
    if (username != 'a') {
        return done(null, false);
    }

    var user = {
        name: username,
        uid: 1
    }
    return done(null, user);
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.post("/login", passport.authenticate('local'), function (req, res) {
    var user = req.user;
    console.log(user);
    res.json(user);
});

app.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/logout', function (req, res) {
    req.logOut();
    res.send(200);
});

app.post('/register', function (req, res) {
    var newUser = req.body;
    // newUser.roles = ['student'];
    // UserModel.findOne({ username: newUser.username }, function (err, user) {
    //     if (err) { return next(err); }
    //     if (user) {
    //         res.json(null);
    //         return;
    //     }
    //     var newUser = new UserModel(req.body);
    //     newUser.save(function (err, user) {
    //         req.login(user, function (err) {
    //             if (err) { return next(err); }
    //             res.json(user);
    //         });
    //     });
    // });
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