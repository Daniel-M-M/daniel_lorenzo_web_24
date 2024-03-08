-- MySQL Workbench Forward Engineering

CREATE SCHEMA IF NOT EXISTS vueclinic3 DEFAULT CHARACTER SET utf8;

USE vueclinic3;

CREATE TABLE IF NOT EXISTS users (
                                     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                     id_user VARCHAR(16) NOT NULL UNIQUE,
                                     user_name VARCHAR(50) NOT NULL,
                                     user_surname VARCHAR(255) NOT NULL,
                                     password VARCHAR(255) NOT NULL ,
                                     email_address VARCHAR(255) NOT NULL,
                                     role ENUM('admin', 'user') DEFAULT 'user'
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS prestazione (
                                           id         INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                           titolo     VARCHAR(255) NOT NULL,
                                           costo      DECIMAL(10, 2),
                                           created_at TIMESTAMP DEFAULT NOW(),
                                           updated_at TIMESTAMP DEFAULT NOW()
                                               ON UPDATE NOW()
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS doctors (
                                       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                       id_doctor INT NOT NULL,
                                       doth_name VARCHAR(50) NOT NULL,
                                       doth_surname VARCHAR(255) NOT NULL,
                                       password VARCHAR(255) NOT NULL,
                                       prestazione1 INT,
                                       prestazione2 INT,
                                       prestazione3 INT
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS booking (
                                       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                       id_user VARCHAR(16) NOT NULL,
                                       id_doctor INT NOT NULL,
                                       id_prestazione INT NOT NULL,
                                       data_prenotazione DATE NOT NULL,
                                       ora_prenotazione INT NOT NULL
) ENGINE  = InnoDB;