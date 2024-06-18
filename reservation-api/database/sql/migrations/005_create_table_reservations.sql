CREATE TABLE Reservations(
   uid VARCHAR(255),
   ranks VARCHAR(255) NOT NULL,
   status VARCHAR(255) NOT NULL DEFAULT 'open',
   seats VARCHAR(255) NOT NULL,
   uid_session VARCHAR(255) NULL,
   expiration_date DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL 30 DAY),
   `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
   PRIMARY KEY(uid),
   FOREIGN KEY(uid_session) REFERENCES Sessions(uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
