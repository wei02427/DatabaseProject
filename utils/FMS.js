const database = require('./async-db.js')
let insertRecord = async function (ID, DataTime) {
    try {
        let sql = "INSERT INTO `Order`(`ID`, `DataTime`) VALUE (?,?)"
        const inserts = [ID, DataTime]
        sql = database.format(sql, inserts)
        result=await database.query(sql)
        return Promise.resolve(result);
    }
    catch (err) {
        return Promise.reject(err);
    }
}

let showOrder = async function(ID){
    var sql = "SELECT `Order_ID`, `DataTime`, SUM(`price`) AS price FROM `order_view` WHERE `ID` = ? GROUP BY `Order_ID`";
    const inserts = [ID];
    sql = database.format(sql,inserts);
    try {
        result = await database.query(sql)
        return Promise.resolve(result);
    }
    catch (err) {
        return Promise.reject(err);
    }
}

let showOrderGame = async function(Order_ID){
    var sql = "SELECT `name`, `price`, FROM `order_view` WHERE `Order_ID` = ?";
    const inserts = [Order_ID];
    sql = database.format(sql,inserts);
    try {
        result = await database.query(sql)
        return Promise.resolve(result);
    }
    catch (err) {
        return Promise.reject(err);
    }
}

let showPersonGame = async function(ID){
    var sql = "SELECT `Game_ID`,`name`,`type`,`description`,`photo`, `price`, FROM `order_view` WHERE `ID` = ?";
    const inserts = [ID];
    sql = database.format(sql,inserts);
    try {
        result = await database.query(sql)
        return Promise.resolve(result);
    }
    catch (err) {
        return Promise.reject(err);
    }
}


let getOrderID = async function (ID, DataTime){
    try {
        let sql = "SELECT `Order_ID` FROM `Order` WHERE ID =? AND `DataTime` =?"
        const inserts = [ID, DataTime]
        sql = database.format(sql, inserts)

        result = await database.query(sql)
        return Promise.resolve(result[0].Order_ID);
    }
    catch (err) {
        return Promise.reject(err);
    }
}

//showOrder(1);

module.exports = {insertRecord, showOrder, getOrderID, showOrderGame, showPersonGame}