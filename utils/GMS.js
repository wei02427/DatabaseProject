const database = require('./async-db.js')

let addGame = async function (Author_ID, name, type, price, photo, description, release_state, time) {
    try {
        let sql = "INSERT INTO `Game` (`Author_ID`, `name`, `type`, `price`, `photo`, `description`, `release_state`, `time`) VALUE (?,?,?,?,?,?,?,?)"
        const inserts = [Author_ID, name, type, price, photo, description, release_state, time]
        sql = database.format(sql, inserts)

        result=await database.query(sql)
        return Promise.resolve(result)
    }
    catch (err) {
        return Promise.reject(err);
    }
}

let shelves_takeOff = async function (Game_ID, release_state) {
    try {
        let sql = "UPDATE `Game` SET release_state = ? WHERE `Game_ID`=? AND release_state =?"
        const updates = [release_state, Game_ID,!release_state]
        sql = database.format(sql, updates)

        result = await database.query(sql)
        if (result.affectedRows > 0) {
            return Promise.resolve("modify success")
        }
        else{
            return Promise.reject( "already shelves/take off");
        }
    }
    catch (err) {
        return Promise.reject(err);
    }
}

let modify = async function (Game_ID, field, value) {
    try {
        let sql = "SET SQL_SAFE_UPDATES=0; UPDATE `Game` SET ??=? WHERE `Game_ID`=?; SET SQL_SAFE_UPDATES=1;"
        const inserts = [field, value, Game_ID]
        sql = database.format(sql, inserts)

        result=await database.query(sql)
        return Promise.resolve(result)
    }
    catch (err) {
        return Promise.reject(err);
    }
}


let gamelist = async function (type) {
    try {
        let sql = "SELECT `price`,`Game_ID`,`description`,`photo`,`release_state` FROM `game` WHERE `release_state`=1 AND `type`=?"
        sql=database.format(sql,[type])
        result = await database.query(sql)
        return Promise.resolve(result);
    }
    catch (err) {
        return Promise.reject(err);
    }
}

module.exports = { addGame, shelves_takeOff, modify, gamelist }
