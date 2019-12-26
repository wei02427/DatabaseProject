const database = require('./async-db.js')

let register = async function (fname, lname, sex, email, phone, password, credits, birthday, address, account) {
    try {
        let sql1 = "INSERT INTO `Member`(`First_Name`,`Last_Name`,`Sex`,`Email`,`Phone`,`Password`,`Credits`,`Class`,`Birthday`,`Address`,`Account`) VALUES (?,?,?,?,?,?,?,1,?,?,?)"
        const inserts = [fname, lname, sex, email, phone, password, credits, birthday, address, account]
        let sql2 = "INSERT INTO `Cart` (`ID`) VALUES (LAST_INSERT_ID())"

        sql1 = database.format(sql1, inserts)
        results = await database.transaction([sql1, sql2])
        return results
    }
    catch (err) {
        return err
    }


};


let modify = async function (id, field, value) {
    try {
        let sql = "UPDATE `member` SET ??=? WHERE `ID`=?"
        const inserts = [field, value, id]
        sql = database.format(sql, inserts)
        results = await query(sql)
        return results
    }
    catch (err) {
        return err
    }

}

module.exports = { register, modify }