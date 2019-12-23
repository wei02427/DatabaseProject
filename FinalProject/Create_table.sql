DROP DATABASE IF EXISTS Project;

CREATE DATABASE IF NOT EXISTS Project CHARACTER SET utf8;

USE Project;

CREATE TABLE IF NOT EXISTS `Member` (
  ID INT NOT NULL AUTO_INCREMENT,
  First_Name VARCHAR(20),
  Last_Name VARCHAR(20),
  Sex CHAR NOT NULL,
  Email VARCHAR(50) NOT NULL,
  Phone VARCHAR(10),
  `Password` VARCHAR(30) NOT NULL,
  Credits VARCHAR(20),
  Class VARCHAR(20),
  Birthday DATE,
  Address VARCHAR(50) NOT NULL,
  Account VARCHAR(20) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Author` (
  Author_ID INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50),
  PRIMARY KEY(Author_ID)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Game` (
  Game_ID INT NOT NULL AUTO_INCREMENT,
  Author_ID INT,
  name VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  photo LONGBLOB,
  description TEXT NOT NULL,
  release_state BOOLEAN NOT NULL,
  `time` DATE NOT NULL,
  PRIMARY KEY(Game_ID),
  FOREIGN KEY(Author_ID) REFERENCES `Author`(Author_ID) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Cart` (
  Cart_ID INT NOT NULL AUTO_INCREMENT,
  ID INT NOT NULL,
  PRIMARY KEY (Cart_ID),
  FOREIGN KEY(ID) REFERENCES `Member`(ID) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Cart_List` (
  Cart_ID INT NOT NULL,
  Game_ID INT NOT NULL,
  PRIMARY KEY (Cart_ID, Game_ID),
  FOREIGN KEY(Cart_ID) REFERENCES Cart(Cart_ID) ON DELETE CASCADE,
  FOREIGN KEY(Game_ID) REFERENCES Game(Game_ID) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Order` (
  Order_ID INT NOT NULL AUTO_INCREMENT,
  ID INT,
  DataTime DateTime,
  PRIMARY KEY (Order_ID, ID),
  FOREIGN KEY(ID) REFERENCES `Member`(ID) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `GameLibrary` (
  Order_ID INT NOT NULL,
  Game_ID INT NOT NULL,
  PRIMARY KEY (Order_ID, Game_ID),
  FOREIGN KEY(Order_ID) REFERENCES `Order`(Order_ID) ON DELETE CASCADE,
  FOREIGN KEY(Game_ID) REFERENCES Game(Game_ID) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Comment` (
  Comment_ID INT NOT NULL AUTO_INCREMENT,
  ID INT,
  Game_ID INT,
  description TEXT NOT NULL,
  stars INT,
  `time` DateTime,
  PRIMARY KEY(Comment_ID),
  FOREIGN KEY(ID) REFERENCES `Member`(ID) ON DELETE CASCADE,
  FOREIGN KEY(Game_ID) REFERENCES `Game`(Game_ID) ON DELETE CASCADE
) ENGINE = InnoDB;

INSERT INTO
  `Member` (
    First_Name,
    Last_Name,
    Sex,
    Email,
    Phone,
    Password,
    Credits,
    Class,
    Birthday,
    Address,
    Account
  )
VALUES
  (
    'ASD',
    'FF',
    0,
    'EJFIOWEF@JIOA',
    '0956481235',
    'fewgdq',
    'creditddd',
    '123',
    '1999-01-12',
    '在哪裡',
    'wd'
  );

INSERT INTO
  `Author` (name)
VALUES
  ('張育瑞');

INSERT INTO
  `Game` (
    Author_ID,
    name,
    type,
    price,
    photo,
    description,
    release_state,
    time
  )
VALUES
  (
    1,
    '越南大戰',
    '射擊',
    100,
    NULL,
    '很好玩 吧',
    TRUE,
    '2087-05-11'
  );

INSERT INTO
  `Order` (ID, DataTime)
VALUES
  (1, '2012-01-12');

INSERT INTO
  `GameLibrary`(Order_ID, Game_ID)
VALUES
  (1, 1);

INSERT INTO
  `Cart` (ID)
VALUES
  (1);

INSERT INTO
  `Cart_List` (Cart_ID, Game_ID)
VALUES
  (1, 1);

SELECT
  *
FROM
  `comment`;

