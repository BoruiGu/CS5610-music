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
        if (err) { 
            //throw err;
            console.log('err in auth: ' + err);
        }
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
            if (err) {
                //throw err;
                console.log('err in loggedin: ' + err);
            }
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

/* Retrieve basic user info by uid */
app.get('/api/userinfo/:uid', function (req, res) {
    var uid = req.params.uid;
    var queryString = 'select uid, username from user '
                    + 'where uid = ?';
    connection.query(queryString, uid,
    function (err, rows, fields) {
        res.json(rows);
    });
});

/* Post a new comment */
app.post('/api/comment', function (req, res) {
    connection.query('insert into comment SET ?', req.body,
    function (err, rows, fields) {
        res.send(200);
    });
});

/* Retrieve comments for a certain song/artist/album identified by id */
app.get('/api/comment/:id', function (req, res) {
    var id = req.params.id;
    var queryString = 'select user.uid, user.username, comment.time, comment.content '
                    + 'from user '
                    + 'join comment '
                    + 'on user.uid = comment.uid '
                    + 'where comment.id = ?';
    connection.query(queryString, id,
    function (err, rows, fields) {
        res.json(rows);
    });
});

/* Get comments from a certain user */
app.get('/api/comments/:uid([0-9]+)', function (req, res) {
    var uid = req.params.uid;
    var queryString = 'select time, content, id, type, name '
                    + 'from comment '
                    + 'where uid = '
                    + uid;
    var query = connection.query(queryString,
    function (err, rows, fields) {
        res.json(rows);
    });
    //console.log(query.sql);
});

/* Follow a user */
app.post('/api/follow', function (req, res) {
    connection.query('insert into follow SET ?', req.body,
    function (err, rows, fields) {
        res.send(200);
    });
});

/* Unfollow a user */
app.post('/api/unfollow', function (req, res) {
    var query = connection.query('delete from follow where uid1 = ? and uid2 = ?',
    [req.body.uid1, req.body.uid2],
    function (err, rows, fields) {
        res.send(200);
    });
    console.log(query.sql);
});

/* Retrieve following of a certain user identified by uid */
app.get('/api/following/:uid', function (req, res) {
    var uid = req.params.uid;
    var queryString = 'select uid, username from user '
                    + 'where uid in'
                    + '(select uid2 from follow where uid1 = ?)';
    connection.query(queryString, uid,
    function (err, rows, fields) {
        res.json(rows);
    });
});

/* Retrieve followed of a certain user identified by id */
app.get('/api/followed/:uid', function (req, res) {
    var uid = req.params.uid;
    var queryString = 'select uid, username from user '
                    + 'where uid in'
                    + '(select uid1 from follow where uid2 = ?)';
    connection.query(queryString, uid,
    function (err, rows, fields) {
        res.json(rows);
    });
});

// MyList

/* Get MyList */
app.get('/api/mylist/:uid([0-9]+)', function (req, res) {
    var uid = req.params.uid;
    connection.query('select list from mylist where uid = ?', uid,
    function (err, rows, fields) {
        res.json(rows);
    });
});
/* Update MyList */
app.post('/api/mylist/:uid([0-9]+)', function (req, res) {
    var uid = req.params.uid;    
    var query = connection.query('update mylist SET list = ? where uid = '+uid,
    [JSON.stringify(req.body)],
    function (err, rows, fields) {
        //console.log(rows);
        res.send(200);
    });
    //console.log(query.sql);
});

app.post('/api/mylist/create', function (req, res) {
    //console.log(req.body)
    var query = connection.query('insert into mylist SET ?',
    [req.body],
    function (err, rows, fields) {
        res.send(200);
    });
    //console.log(query.sql);
});