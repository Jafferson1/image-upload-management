create database projects_test;
use projects_test;

CREATE TABLE IF NOT EXISTS images_path (
  id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_user int NOT NULL,
  type varchar(100) NOT NULL,
  path varchar(250) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;