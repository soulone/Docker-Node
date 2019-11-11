CREATE DATABASE db_contactos;

USE db_contactos;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

INSERT INTO users (id, username, password, fullname) 
  VALUES (1, 'john', 'password1', 'John Carter');

SELECT * FROM users;

-- contacts TABLE
CREATE TABLE contacts (
  id INT(11) NOT NULL,
  contact_fullname VARCHAR(150) NOT NULL,  
  phone VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  direction VARCHAR(255) NOT NULL,
  notes TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE contacts
  ADD PRIMARY KEY (id);

ALTER TABLE contacts
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE contacts;