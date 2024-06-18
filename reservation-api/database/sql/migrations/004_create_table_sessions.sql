CREATE TABLE Sessions(
   uid VARCHAR(255),
   start_date DATETIME NOT NULL DEFAULT current_timestamp(),
   uid_room VARCHAR(255) NOT NULL,
   uid_movie VARCHAR(255) NOT NULL,
   `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
   PRIMARY KEY(uid),
   FOREIGN KEY(uid_room) REFERENCES Rooms(uid),
   FOREIGN KEY(uid_movie) REFERENCES Movies(uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
