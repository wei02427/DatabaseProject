const database = require('./async-db.js')

let getCartID = async function (uid) {
    var sql = "SELECT `Cart_ID` FROM `Cart` WHERE `ID`=?"
    const insert = [uid]
    sql = database.format(sql, insert)
    try {
        result = await database.query(sql)
        if (result.length) {
            return result[0].Cart_ID
        }
        else {
            throw 'User no found'
        }
    }
    catch (err) {
        return err
    }
}

let add = async function (uid, gameID) {

    try {
        var sql = []
        sql.push(database.format("INSERT INTO `Cart_List` (`Cart_ID`, `Game_ID`)VALUE ((SELECT `Cart_ID` FROM `Cart` WHERE `ID`=?),?)", [uid, gameID]))
        result = await database.transaction(sql)
        return Promise.resolve(result)

    }
    catch (err) {
        return Promise.reject(err)
    }

}

let remove = async function (uid, gameID) {
    try {
        var sql = "DELETE FROM `Cart_List` WHERE `Game_ID`=? AND `Cart_ID`=(SELECT `Cart_ID` FROM `Cart` WHERE `ID`=?)"
        const insert = [gameID,uid]
        sql = database.format(sql, insert)
        result = await database.query(sql)
        if (result.affectedRows > 0) {
            Promise.resolve('remove game suscess')
        }
        else {
            throw 'game no found, remove fail'
        }
    }
    catch (err) {
        return Promise.reject(err)
    }
}

let list = async function (uid) {
    try {
        var sql = "SELECT `Game_ID`, `name`, `type`, `price` FROM `cart_view` WHERE `ID`=?"
        const insert = [uid]
        sql = database.format(sql, insert)
        results = await database.query(sql)
        return Promise.resolve(results)

    }
    catch (err) {
        return Promise.reject(err)
    }
}

let clear = async function (uid) {
    try {
        var sql = "DELETE FROM `Cart_List` WHERE `Cart_ID`=(SELECT `Cart_ID` FROM `Cart` WHERE `ID`=?)"
        const insert = [uid]
        sql = database.format(sql, insert)
        result = await database.query(sql)
        if (result.affectedRows > 0) {
            return Promise.resolve('clear cart suscess')
        }
        else {
            throw 'cart is empty'
        }
    }
    catch (err) {
        return Promise.reject(err)
    }
}

module.exports = { getCartID, add, remove, clear, list }