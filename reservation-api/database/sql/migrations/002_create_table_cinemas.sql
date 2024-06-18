CREATE TABLE Cinemas(
   uid VARCHAR(255),
   name VARCHAR(255) NOT NULL,
       `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
   PRIMARY KEY(uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
