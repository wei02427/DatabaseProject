SET FOREIGN_KEY_CHECKS = 0; 
Truncate table `Member`;
Truncate table `Author`;
Truncate table `Game`;
Truncate table `Order`;
Truncate table `GameLibrary`;
Truncate table `Cart`;
Truncate table `Cart_List`;
Truncate table `Comment`;
SET FOREIGN_KEY_CHECKS = 1;

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
