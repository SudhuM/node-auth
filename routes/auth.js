const express = require('express');
const authController = require('../controllers/authController');
const { authBodyValidator } = require('../midddlewares/bodyValidation');

const router = express.Router();

router.post('/login', authController.login);

router.post('/register', authBodyValidator, authController.register);

router.post('/refresh-token', authController.refreshToken);

router.delete('/logout', authController.logout);

module.exports = router;
