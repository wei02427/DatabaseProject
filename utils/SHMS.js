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
        const cartID = await getCartID(uid)
        var sql = []
        gameID.forEach(function (item) {
            sql.push(database.format("INSERT INTO `Cart_List` VALUE (?,?)", [cartID, item]))
        });
        result = await database.transaction(sql)
        return Promise.resolve(result)

    }
    catch (err) {
        return Promise.reject(err)
    }

}

let remove = async function (uid, gameID) {
    try {
        const cartID = await getCartID(uid)
        var sql = "DELETE FROM `Cart_List` WHERE `Cart_ID`=? AND `Game_ID`=?"
        const insert = [cartID, gameID]
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
        const cartID = await getCartID(uid)
        var sql = "SELECT * FROM `Cart_List` WHERE `Cart_ID`=?"
        const insert = [cartID]
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
        const cartID = await getCartID(uid)
        var sql = "DELETE FROM `Cart_List` WHERE `Cart_ID`=?"
        const insert = [cartID]
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

/*list(3).then(function(values) {
    console.log(values)
    
  })
  .catch(function(err){
    console.log(err)
  })*/
module.exports = { getCartID, add, remove, clear, list }