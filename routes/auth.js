const express = require('express');
const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
const router = express.Router();

const authController = require('../controllers/auth');

dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

router.get('/', authController.getAuth);
// router.get('/profile', authController.getProfile);

module.exports = router;