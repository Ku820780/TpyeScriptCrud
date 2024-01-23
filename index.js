
var express = require("express");
var mysql = require("mysql"); // mysql.exampleFunction()
var app = express();
app.use(express.json());
var db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    port: 3306,
    database: "typescript"
});
db.connect(function (error) {
    if (error) {
        console.log("Error found....");
    }
    else {
        console.log("Connection SuccessFully..");
    }
});
app.post('/postdata', function (req, res) {
    var data = req.body;
    var sql = "INSERT INTO student SET ?";
    db.query(sql, data, function (err, result) {
        if (err) {
            console.log({ err: "Data Not Post..." });
            // res.json(err)
        }
        else {
            console.log({ result: "Data Post SuccessFullly...." });
        }
    });
});
app.get('/getdata', function (req, res) {
    var sql = "SELECT * FROM student";
    db.query(sql, function (err, result) {
        if (err) {
            console.log({ err: "data Not Get..." });
            res.json(err);
        }
        else {
            console.log({ result: "data get SuccessFully..." });
            res.json(result);
        }
    });
});
app.put('/dataupdate/:id', function (req, res) {
    var id = req.params.id;
    var data = req.body;
    var sqlQuery = "UPDATE student SET ? WHERE id =?";
    db.query(sqlQuery, [data, id], function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.status(200).json(result);
        }
    });
});
app.delete('/deletedata/:id', function (req, res) {
    var id = req.params.id;
    var sqlQuery = "DELETE FROM student WHERE id =?";
    db.query(sqlQuery, id, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.status(200).json(result);
        }
    });
});
var PORT = 5500;
app.listen(PORT, function () {
    console.log("Server Started On ".concat(PORT));
});
