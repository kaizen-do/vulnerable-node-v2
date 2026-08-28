var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

// Command Injection vulnerability
router.post('/execute', function(req, res) {
  var userInput = req.body.command;
  
  // VULNERABLE: User input directly passed to exec without sanitization
  exec("ping -c 4 " + userInput, function(error, stdout, stderr) {
    if (error) {
      res.json({ error: error.message });
      return;
    }
    res.json({ output: stdout });
  });
});

module.exports = router;
