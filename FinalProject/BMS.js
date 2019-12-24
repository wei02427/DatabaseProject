const { query } = require('../utils/async-db.js')
var mysql = require('mysql');
//async function

async function getPersonCartID(ID){
    var sqlCommand = "SELECT `Cart_ID` FROM `cart` WHERE `ID` = ?";
    const inserts = [ID];
    sqlCommand = mysql.format(sqlCommand, inserts);
    try {
        var cartItem = [];
        const results = await query(sqlCommand);
        console.log("success get cart_ID");
        while(results[i]){
            cartItem.push(getPersonCartIDItem(results[i].Cart_ID));
        }
        return cartItem;
    }
    catch{
        console.log(err);
    }
}

async function getPersonCartIDItem(Cart_ID){
    var sqlCommand = "SELECT `Game_ID` FROM `cart_list` WHERE `Cart_ID` = ?";
    const inserts = [Cart_ID];
    sqlCommand = mysql.format(sqlCommand, inserts);
    try {
        const results = await query(sqlCommand);
        console.log("success get Game_ID");
        return results;
    }
    catch{
        console.log(err);
    }
}

function getPersonPaymentList(ID){
    var personCart = getPersonCartID(ID);
    console.log(personCart);
}

