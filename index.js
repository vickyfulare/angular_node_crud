const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const server = express()
server.use(bodyParser.json())
server.use(cors())
server.use(express.static('angularcode'))
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydata'
})

db.connect(function(error) {
    if (error) {
        console.log("Error for connect to db")
    } else {
        console.log("Connected to database")
    }
})

// Create a data 

server.post('/api/add', (req, resp) => {
    let details = {
        stname: req.body.stname,
        course: req.body.course,
        fee: req.body.fee
    };
    let sql = "INSERT INTO student SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            resp.send({ status: false, message: "Data not added sucessfully..." })
        } else {
            resp.send({ status: true, message: "Data added sucessfully..." })
        }
    });
});


// Read the data from database

server.get('/api/view', (req, resp) => {
    var sql = "SELECT * FROM student";
    db.query(sql, function(error, result) {
        if (error) {
            resp.send({ status: false, message: "Data not fetched" })
        } else {
            resp.send({ status: true, data: result })
        }
    })
})

// Search a data 
server.get('/api/view/:id', (req, resp) => {
    var studentid = req.params.id
    var sql = "SELECT * FROM student where id=" + studentid;
    db.query(sql, function(error, result) {
        if (error) {
            resp.send({ status: false, message: "Data not fetched" })
        } else {
            resp.send({ status: true, data: result })
        }
    })
})

// Update the data

server.put('/api/update/:id', (req, resp) => {
    let sql = "UPDATE student SET stname='" + req.body.stname + "', course='" + req.body.course +
        "',fee='" + req.body.fee + "' where id =" + req.params.id;
    let query = db.query(sql, function(error, result) {
        if (error) {
            resp.send({ status: false, message: "Data not updated" })
        } else {
            resp.send({ status: true, message: "Data updated Sucessfully..." })
        }
    })

})

// Delete the data 
server.delete('/api/delete/:id', (req, resp) => {
    var studentid = req.params.id
    var sql = "DELETE FROM student where id=" + studentid;
    db.query(sql, function(error, result) {
        if (error) {
            resp.send({ status: false, message: "Data not deleted" })
        } else {
            resp.send({ status: true, message: "Data deleted sucessfully..." })
        }
        // if (error) throw error
        // resp.send({ status: true, message: "Data deleted sucessfully..." })
    })
})


server.listen(8805, function check(error) {
    if (error) { console.log("Error to listen port") } else { console.log("Listen port successfully...") }
})