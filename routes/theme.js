const express = require('express');
const router = express.Router();

const themeController = require('../controllers/theme');

router.get('/:themeName', themeController.getTheme);

// router.get('/', themeController.getAll);

// router.get('/:id', themeController.getSingle);

// router.post('/', themeController.createTheme);

// router.put('/:id', themeController.updateTheme);

// router.delete('/:id', themeController.deleteTheme)

module.exports = router;