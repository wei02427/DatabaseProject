const database = require('./async-db.js')

let addGame = async function (Author_ID, name, type, price, photo, description, release_state, time) {
    try {
        let sql = "INSERT INTO `Game` (`Author_ID`, `name`, `type`, `price`, `photo`, `description`, `release_state`, `time`) VALUE (?,?,?,?,?,?,?,?)"
        const inserts = [Author_ID, name, type, price, photo, description, release_state, time]
        sql = database.format(sql, inserts)

        result = await database.query(sql)
        return 'add game susscess'
    }
    catch (err) {
        return err
    }
}

let shelves_takeOff = async function (Game_ID, release_state) {
    try {
        let sql = "UPDATE `Game` SET release_state = ? WHERE `Game_ID`=? AND release_state =?"
        const updates = [release_state, Game_ID,!release_state]
        sql = database.format(sql, updates)

        result = await database.query(sql)
        if (result.affectedRows > 0) {
            return "modify success"
        }
        else{
            throw "already shelves/take off"
        }
        return result
    }
    catch (err) {
        return err
    }
}

let modify = async function (Game_ID, field, value) {
    try {
        let sql = "SET SQL_SAFE_UPDATES=0; UPDATE `Game` SET ??=? WHERE `Game_ID`=?; SET SQL_SAFE_UPDATES=1;"
        const inserts = [field, value, Game_ID]
        sql = database.format(sql, inserts)

        result = await database.query(sql)
        return result
    }
    catch (err) {
        return err
    }
}

let searchGame = async function (type) {
    try {
        let sql = "SELECT * FROM `Game` WHERE `type`=?"
        const inserts = [type]
        sql = database.format(sql, inserts)

        result = await database.query(sql)
        return result
    }
    catch (err) {
        return err
    }
}

// addGame(1,'fight', '射射起來', 200, null, '666', true, '4087-06-01').then(function(values) {
//     console.log(values)
//   })
//   .catch(function(err){
//     console.log(err)
//   })

// shelves_takeOff(1, 0).then(function(values) {
//     console.log(values)
//   })
//   .catch(function(err){
//     console.log(err)
//   })

// modify(1, 'description', 'good').then(function(values) {
//     console.log(values)
//   })
//   .catch(function(err){
//     console.log(err)
//   })

searchGame('射擊').then(function(values) {
    console.table(values)
})
.catch(function(err){
    console.log(err)
})

module.exports = { addGame, shelves_takeOff, modify, searchGame}