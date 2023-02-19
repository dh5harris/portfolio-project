const express = require('express');
const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
const router = express.Router();
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

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
	res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.use('/theme', require('./theme'));
router.use('/user', require('./user'));
router.use('/', require('./swagger'));

module.exports = router;