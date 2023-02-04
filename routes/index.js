const express = require('express');
const router = express.Router();

router.use('/', require('./theme'));
router.use('/', require('./user'));
router.use('/', require('./swagger'));

module.exports = router;