const express = require('express');
const authController = require('../controllers/authController');
const { validateBody, checkAuth, validateRefreshToken } = require('../midddlewares/middleware');
const { loginSchema, signUpSchema } = require('../helpers/validationSchema');

const router = express.Router();

router.post('/login', validateBody(loginSchema), authController.login);

router.post('/register', validateBody(signUpSchema), authController.register);

router.post('/refresh-token', validateRefreshToken, authController.refreshToken);

router.delete('/logout', checkAuth, authController.logout);

module.exports = router;
