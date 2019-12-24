const { query } = require('../utils/async-db.js')
const mysql = require('mysql')
async function register(fname, lname, sex, email, phone, password, credits, birthday, address, account) {

    var sql = "INSERT INTO `Member`(`First_Name`,`Last_Name`,`Sex`,`Email`,`Phone`,`Password`,`Credits`,`Class`,`Birthday`,`Address`,`Account`) VALUES (?,?,?,?,?,?,?,1,?,?,?)"
    const inserts = [fname, lname, sex, email, phone, password, credits, birthday, address, account]
    sql = mysql.format(sql, inserts)

    try {
        const results = await query(sql)
        return results
    }
    catch{
        return err
    }


};


async function modify(field, value, id) {
    var sql = "UPDATE `member` SET ??=? WHERE `ID`=?"
    const inserts = [field, value, id]
    sql = mysql.format(sql, inserts)
    try {
        const results = await query(sql)
        return results
    }
    catch{
        return err
    }

}

console.log(register('a', 'wei', 1, 'gmail', '0911', '1234', '090', '1999-5-5', '我家', '威'))