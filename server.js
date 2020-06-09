var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 6060;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "NOODLE@13",
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
 
// Get existing, undevoured burgers
app.get('/', function(req, res) {
    connection.query('SELECT * FROM burgers', function(err, results) {
        if (err) {
            return res.status(500).end();
        };

        res.render('index', { burgers: results });
    });
});

// Add new burgers
app.post('/api/burgers', function(req, res) {
    connection.query('INSERT INTO burgers (burger) VALUES (?)', [req.body.burger], function(err, results) {
        if (err) {
            return res.status(500).end();
        };

        res.json({ id: results.insterId});
        console.log({ id: results.insterId});
    });
});

// Update burgers
app.put('/api/burgers/:id', function(req, res) {
    connection.query("UPDATE burgers SET burger = ? WHERE id = ?", [req.body.burger, req.params.id], function(err, results) {
        if (err) {
            return res.status(500).end();
        }
        else if (results.changedRows === 0) {
            return res.status(404).end();
        };
        res.status(200).end();
    });
});

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + 6060);
});