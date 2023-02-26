const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();


// For authentication using Oauth
router.use('/', require('./auth'));
router.get('/profile', requiresAuth(), (req, res) => {
	res.send(JSON.stringify(req.oidc.user))
});

router.use('/theme', require('./theme'));
router.use('/user', require('./user'));
router.use('/', require('./swagger'));


module.exports = router;