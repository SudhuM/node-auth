const express = require('express');
const authController = require('../controllers/authController');
const validateBody = require('../midddlewares/bodyValidation');
const { loginSchema, signUpSchema } = require('../helpers/validationSchema');

const router = express.Router();

router.post('/login', validateBody(loginSchema), authController.login);

router.post('/register', validateBody(signUpSchema), authController.register);

router.post('/refresh-token', authController.refreshToken);

router.delete('/logout', authController.logout);

module.exports = router;
