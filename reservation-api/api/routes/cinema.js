const express = require('express');
const router = express.Router();

const controller = require('../controllers/cinema');

router.get('/cinema', controller.getCinemas);
router.get('/cinema/:uid', controller.getCinema);
router.post('/cinema', controller.createCinema);
router.put('/cinema/:uid', controller.updateCinema);
router.delete('/cinema/:uid', controller.deleteCinema);

module.exports = router;