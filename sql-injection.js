const express = require('express');
const app = express();
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'mydb'
});

// VULNERABLE: Direct SQL concatenation - SQL injection risk
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM users WHERE id = " + userId;  // No parameterized query!
  conn.query(query, (err, results) => {
    if (err) res.status(500).send(err);
    res.json(results);
  });
});

// VULNERABLE: SQL injection in POST
app.post('/search', (req, res) => {
  const searchTerm = req.body.term;
  const query = "SELECT * FROM products WHERE name LIKE '%" + searchTerm + "%'";  // Vulnerable!
  conn.query(query, (err, results) => {
    if (err) res.status(500).send(err);
    res.json(results);
  });
});

app.listen(3000);
