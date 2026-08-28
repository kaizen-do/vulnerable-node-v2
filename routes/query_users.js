var express = require('express');
var router = express.Router();

// SQL Injection vulnerability - user input directly concatenated into SQL query
router.get('/users/:id', function(req, res) {
  var userId = req.params.id;
  
  // VULNERABLE: Direct string concatenation allows SQL injection
  var query = "SELECT * FROM users WHERE id = " + userId;
  
  db.query(query, function(err, results) {
    if (err) throw err;
    res.json(results);
  });
});

// Insecure deserialization vulnerability
router.post('/deserialize', function(req, res) {
  var data = req.body.data;
  
  // VULNERABLE: Using eval on user input
  var result = eval('(' + data + ')');
  
  res.json(result);
});

module.exports = router;
