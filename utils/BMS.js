const database = require('./async-db.js');
const cartFunction = require('./SHMS');
const orderFunction = require('./FMS');

function getRealTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

//Game_ID is a list [] ex:payment(1,[1]);
let payment = async function(ID,Game_ID){
    var DateTime = getRealTime();
    await orderFunction.insertRecord(ID,DateTime);
    var Order_ID = await orderFunction.getOrderID(ID,DateTime);
    var Cart_ID = await cartFunction.getCartID(ID);
    var i = 0;
    var sqlCommand = [];
    while(Game_ID[i]){
        var sql1 = "INSERT into `gamelibrary` (`Order_ID`,`Game_ID`)VALUES (?,?)";
        const inserts1 = [Order_ID, Game_ID[i]];
        var sql2 = "DELETE FROM `cart_list` WHERE `Cart_ID`=? AND `Game_ID` = ?";
        const inserts2 = [Cart_ID, Game_ID[i]];
        sql1 = database.format(sql1,inserts1);
        sqlCommand.push(sql1);
        sql2 = database.format(sql2,inserts2);
        sqlCommand.push(sql2);
        i++;
    }
    try {
        await database.transaction(sqlCommand)
        return Promise.resolve("success payment!");
    }
    catch (err) {
        return Promise.reject(err);
    }
}




//payment(1,[211,101]);
module.exports = {payment}