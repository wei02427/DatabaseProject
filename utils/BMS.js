const database = require('./async-db.js')

async function getPersonCartID(ID){
    var sqlCommand = "SELECT `Cart_ID` FROM `cart` WHERE `ID` = ?";
    const inserts = [ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        console.log("success get cart_ID");
        return results[0].Cart_ID;
    }
    catch(err){
        console.log(err);
    }
}

async function getPersonCartIDItem(Cart_ID){
    var sqlCommand = "SELECT `Game_ID` FROM `cart_list` WHERE `Cart_ID` = ?";
    const inserts = [Cart_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        console.log("success get Game_ID");
        return results;
    }
    catch(err){
        console.log(err);
    }
}

async function deleteCartListItem(ID,Game_ID){
    var personCart = await getPersonCartID(ID);
    var i = 0;
    while(Game_ID[i])
    {
        var sqlCommand = "DELETE FROM `cart_list` WHERE `Cart_ID`=? AND `Game_ID` = ?";
        const inserts = [personCart,Game_ID[i]];
        sqlCommand = database.format(sqlCommand, inserts);
        try {
            const results = await database.query(sqlCommand);
            console.log(`success delete Game_ID${i} in cart`);
        }
        catch(err){
            console.log(err);
        }  
        i++;
    }  
}

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

async function insertGameIDtoGameLibrary(ID,Game_ID){
    var DateTime = getRealTime();
    await insertIDtoOrder(ID,DateTime);
    var OrderID = await getOrderID(ID,DateTime);
    var i = 0;
    while(Game_ID[i])
    {
        var sqlCommand = "INSERT into `gamelibrary` (`Order_ID`,`Game_ID`)VALUES (?,?)";
        const inserts = [OrderID,Game_ID[i]];
        sqlCommand = database.format(sqlCommand, inserts);
        try {
            await database.query(sqlCommand);
            console.log(`success insert Game_ID${i} in gamelibrary`);
        }
        catch(err){
            console.log(err);
        }  
        i++;
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
    await insertGameIDtoGameLibrary(ID,Game_ID);
    await deleteCartListItem(ID,Game_ID);
    console.log("success payment!");
}

let getPersonCartList = async function(ID){
    var personCart =await getPersonCartID(ID);
    var cartItem = await getPersonCartIDItem(personCart);
    console.log(cartItem);
    return cartItem;
}


module.exports = { payment, getPersonCartList}