const connection = require("../../config/db.js");
const { generateUID } = require('../utils/uuid');

class Cinema {
  static countCinemas() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) AS total FROM cinemas",
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0].total);
          }
        }
      );
    });
  }
  
  static getCinemas(limit, offset) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT uid, name, created_at, updated_at FROM cinemas LIMIT ? OFFSET ?",
        [limit, offset],
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

  static getCinema(uid) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT uid, name, created_at, updated_at FROM cinemas WHERE uid = ?",
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

  static createCinema(cinema) {
    const uid = generateUID();
    cinema.uid = uid;

    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO cinemas SET ?",
        cinema,
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve({ uid: results.insertId, ...cinema });
          }
        }
      );
    });
  }

  static updateCinema(cinema, uid) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE cinemas SET ? WHERE uid = ?",
        [cinema, uid],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve({ uid: cinema.uid, ...cinema });
          }
        }
      );
    });
  }

  static deleteCinema(uid) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM cinemas WHERE uid = ?",
        uid,
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
}

module.exports = Cinema;
