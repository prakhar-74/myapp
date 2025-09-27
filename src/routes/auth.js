const router = require('express').Router();
const { login } = require('../controllers/authcontroller');

router.post('/login', login);

module.exports = router;
