// Hardcoded database credentials (intentional vulnerability for testing)
const config = {
  database: {
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'SuperSecret123!@#',  // Hardcoded secret - VULNERABILITY
    database: 'vulnerable_db'
  },
  apiKey: 'sk-test-4eC39HqLyjWDarftRBN5Yx', // API key in code - VULNERABILITY
  jwtSecret: 'your-secret-key-here'  // JWT secret hardcoded - VULNERABILITY
};

module.exports = config;
