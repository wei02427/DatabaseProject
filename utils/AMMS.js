const database = require('./async-db.js')

let register = async function (fname, lname, sex, email, phone, password, credits, birthday, address, account) {

    try {
        let sql1 = "INSERT INTO `Member`(`First_Name`,`Last_Name`,`Sex`,`Email`,`Phone`,`Password`,`Credits`,`Class`,`Birthday`,`Address`,`Account`) VALUES (?,?,?,?,?,?,?,1,?,?,?)"
        const inserts = [fname, lname, sex, email, phone, password, credits, birthday, address, account]
        let sql2 = "INSERT INTO `Cart` (`ID`) VALUES (LAST_INSERT_ID())"
        sql1 = database.format(sql1, inserts)
        results = await database.transaction([sql1, sql2]) 
        let sql3 = "select `ID` from `Cart` where `Cart_ID` = LAST_INSERT_ID()"
        id = await database.query(sql3)
        return Promise.resolve(id[0].ID);
    }
    catch (err) {
        return Promise.reject(err);
    }



};


let modify = async function (id, field, value) {
    try {
        let sql = "UPDATE `member` SET ??=? WHERE `ID`=?"
        const inserts = [field, value, id]
        sql = database.format(sql, inserts)
        results = await query(sql)
        return Promise.resolve(results)
    }
    catch (err) {
        return  Promise.reject(err)
    }

}

let login = async function (email, password) {
    try {
        let sql = "SELECT `password`,`ID` FROM `Member` WHERE `Email`=?"
        const inserts = [email]
        sql = database.format(sql, inserts)
        console.log(sql)
        results = await database.query(sql)
        
        if (results[0].password.localeCompare(password)) {
            return Promise.resolve(results[0].ID)
        }
        else {
            throw 'password is not correct or account no exist'
        }

    }
    catch (err) {
        return  Promise.reject(err)
    }

}
// register('A', 'WEI', 'boy', 'cmail', '0911', '123456', 'none', '1999-5-5', 1, '哈')
//     .then(function (result) {
//         console.log(result)
//     })
//     .catch(function (err) {
//         console.log(err)
//     })



module.exports = { register, modify, login }
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

