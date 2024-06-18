const connection = require("../../config/db.js");
const { generateUID } = require('../utils/uuid');

class Reservation {
    static createReservation(reservation){
        const uid = generateUID();
        reservation.uid = uid;

        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO reservations SET ?",
                reservation,
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({ uid: results.insertId, ...reservation });
                    }
                }
            );
        });
    }

    static confirmReservation(uid){
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE reservations SET status = 'confirmed' WHERE uid = ?",
                [uid],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({ uid });
                    }
                }
            );
        });
    }

    static getMovieReservations(movieUid){
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM reservations WHERE movie_uid = ?",
                [movieUid],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }

    static getReservation(uid){
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM reservations WHERE uid = ?",
                [uid],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results[0]);
                    }
                }
            );
        });
    }

    static checkSeatAvailability(sessionUid, seatNumber){
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM reservations WHERE uid_session = ? AND seats = ?",
                [sessionUid, seatNumber],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results[0]);
                    }
                }
            );
        });
    }
}

module.exports = Reservation;