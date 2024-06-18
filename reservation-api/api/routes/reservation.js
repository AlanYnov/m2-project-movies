const express = require('express');
const router = express.Router();

const controller = require('../controllers/reservation');

router.post('/movie/:movieUid/reservations', controller.createReservation);
router.post('/reservations/:uid/confirm', controller.confirmReservation);
router.get('/movie/:movieUid/reservations', controller.getMovieReservations);
router.get('/reservations/:uid', controller.getReservation);

module.exports = router;