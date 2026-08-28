const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

// VULNERABLE: Command injection via unsanitized user input
app.post('/ping', (req, res) => {
  const host = req.body.host;
  const cmd = `ping -c 4 ${host}`;  // VULNERABLE: No input validation/sanitization!
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`error: ${error.message}`);
    }
    res.send(stdout);
  });
});

// VULNERABLE: Command injection in filename
app.get('/download', (req, res) => {
  const filename = req.query.file;
  const cmd = `cat ${filename}`;  // VULNERABLE: Attacker can pass "file.txt; rm -rf /"
  exec(cmd, (error, stdout) => {
    if (error) res.status(500).send(error);
    res.send(stdout);
  });
});

// VULNERABLE: Hardcoded API key (secrets)
const API_KEY = "sk-proj-abc123xyz789defghi";
const DB_PASSWORD = "SuperSecretPassword123!";

app.get('/api/data', (req, res) => {
  // Using the secrets...
  res.json({ key: API_KEY, db: DB_PASSWORD });
});

app.listen(3000);
