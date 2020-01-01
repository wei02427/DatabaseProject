DROP VIEW cart_view;
CREATE VIEW cart_view AS SELECT C.ID, CL.Game_ID, G.name, G.type, G.price FROM cart C, cart_list CL, game G WHERE C.Cart_ID = CL.Cart_ID AND CL.Game_ID = G.Game_ID ORDER BY C.ID;

DROP VIEW order_view;
CREATE VIEW order_view AS SELECT O.Order_ID, O.ID, GL.Game_ID, G.price, O.DataTime FROM `order` O, `gamelibrary` GL, `game` G WHERE O.Order_ID = GL.Order_ID AND GL.Game_ID = G.Game_ID ORDER BY O.Order_ID;


SELECT * FROM cart_view;
SELECT * FROM order_view;