const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post("/users/register", authController.register);
router.post("/users/login", authController.login);

module.exports = router;