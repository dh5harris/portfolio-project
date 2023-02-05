const express = require('express');
const router = express.Router();

router.use('/theme', require('./theme'));
router.use('/user', require('./user'));
router.use('/', require('./swagger'));

module.exports = router;