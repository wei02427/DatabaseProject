const database = require('./async-db.js');
const cartFunction = require('./SHMS');

async function insertIDtoOrder(ID,DateTime){
    var sqlCommand = "INSERT into `order` (`ID`,`DataTime`)VALUES (?,?)";
    const inserts = [ID,DateTime];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        console.log(`success insert ID to order`);
    }
    catch(err){
        console.log(err);
    }
}
async function getOrderID(ID,DateTime){
    var sqlCommand = "SELECT `Order_ID` FROM `order` WHERE `ID` = ? AND `DataTime` = ?";
    const inserts = [ID,DateTime];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        var OrderID = await database.query(sqlCommand);
        console.log(`success get OrderID from order`);
        return OrderID[0].Order_ID;
    }
    catch(err){
        console.log(err);
    }
}


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
    await insertIDtoOrder(ID,DateTime);
    var Order_ID = getOrderID(ID,DateTime);
    var Cart_ID = cartFunction.getCartID(ID);
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
        console.log("success payment!");
    }
    catch (err) {
        return err;
    }
}

let getPersonCartList = async function(ID){
    var personCartItem =await cartFunction.list(ID);

    console.log(personCartItem);
    return personCartItem;
}

var hell = getPersonCartList(1);
//payment(1,[1]);
module.exports = { payment, getPersonCartList}