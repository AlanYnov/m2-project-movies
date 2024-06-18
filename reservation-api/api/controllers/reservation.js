const Reservation = require("../models/reservation");

exports.createReservation = async (req, res) => {
  const reservation = req.body;

  if (
    typeof reservation.seats !== "number" ||
    reservation.seats < 0 ||
    typeof reservation.ranks !== "number" ||
    reservation.ranks < 0
  ) {
    return res.status(422).json({ error: "Invalid seats or ranks" });
  }

  try {
    const createdReservation = await Reservation.createReservation(req.body);
    return res.status(201).json({
      message: "Reservation created successfully",
      createdReservation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating reservation" });
  }
};

exports.confirmReservation = async (req, res) => {
  try {
    const { uid } = req.params;
    const reservation = await Reservation.getReservation(uid);
    if(!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    if(reservation.status === 'confirmed') {
      return res.status(400).json({ error: "Reservation already confirmed" });
    }

    if(reservation.expiration_date <= Date.now()) {
      return res.status(410).json({ error: "Reservation expired" });
    }

    const confirmedReservation = await Reservation.confirmReservation(req.params.uid);
    if (confirmedReservation) {
      res.status(200).json({
        message: "Reservation confirmed successfully",
        confirmedReservation,
      });
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error confirming reservation" });
  }
};

exports.getMovieReservations = async (req, res) => {
  try {
    const reservations = await Reservation.getMovieReservations(
      req.params.movieUid
    );
    if (reservations) {
      res.status(200).json({
        message: "Reservations fetched successfully",
        total: reservations.length,
        reservations,
      });
    } else {
      res.status(404).json({ error: "Reservations not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching reservations" });
  }
};

exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.getReservation(req.params.uid);
    if (reservation) {
      res.status(200).json({
        message: "Reservation fetched successfully",
        reservation,
      });
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching reservation" });
  }
};
