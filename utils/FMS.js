const database = require('./async-db.js')
let insertRecord = async function (ID, DataTime) {
    try {
        let sql = "INSERT INTO `Order`(`ID`, `DataTime`) VALUE (?,?)"
        const inserts = [ID, DataTime]
        sql = database.format(sql, inserts)
        result = await database.query(sql)
        console.log("add record susscess")
    }
    catch (err) {
        console.log(err)
    }
}

let showOrder = async function (ID, Order_ID) {
    try {
        let sql = "SELECT `name`, `price`, `DataTime` FROM `Member`, `Order`, `Game`, `GameLibrary` WHERE `Member`.ID =? AND `GameLibrary`.Order_ID =? AND `GameLibrary`.Game_ID = `Game`.Game_ID"
        const inserts = [ID, Order_ID]
        sql = database.format(sql, inserts)

        result = await database.query(sql)
        return result
    }
    catch (err) {
        return err
    }
}

let getOrderID = async function (ID, DataTime){
    try {
        let sql = "SELECT `Order_ID` FROM `Order` WHERE ID =? AND `DataTime` =?"
        const inserts = [ID, DataTime]
        sql = database.format(sql, inserts)

        result = await database.query(sql)
        return result[0].Order_ID
    }
    catch (err) {
        console.log(err)
    }
}

// insertRecord(1,'1999-01-23').then(function(values) {
//     console.log(values)
//   })
//   .catch(function(err){
//     console.log(err)
//   })

// showOrder(1,1).then(function(values) {
//     console.table(values)
//   })
//   .catch(function(err){
//     console.log(err)
//   })

// getOrderID(1,'2012-01-12').then(function(values) {
//     console.table(values)
//   })
//   .catch(function(err){
//     console.log(err)
//   })

module.exports = {insertRecord, showOrder, getOrderID}