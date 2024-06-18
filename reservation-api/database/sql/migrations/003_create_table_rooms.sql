CREATE TABLE Rooms(
   uid VARCHAR(255),
   name VARCHAR(255) NOT NULL,
   seats VARCHAR(50) NOT NULL,
   uid_cinema VARCHAR(50) NOT NULL,
   PRIMARY KEY(uid),
       `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
   FOREIGN KEY(uid_cinema) REFERENCES Cinemas(uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
