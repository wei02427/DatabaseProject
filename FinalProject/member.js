const  database  = require('../utils/async-db.js')

async function register(fname, lname, sex, email, phone, password, credits, birthday, address, account) {

    var sql1 = "INSERT INTO `Member`(`First_Name`,`Last_Name`,`Sex`,`Email`,`Phone`,`Password`,`Credits`,`Class`,`Birthday`,`Address`,`Account`) VALUES (?,?,?,?,?,?,?,1,?,?,?)"
    const inserts = [fname, lname, sex, email, phone, password, credits, birthday, address, account]
    var sql2 ="INSERT INTO `Cart` (`ID`) VALUES (LAST_INSERT_ID())"
    
    sql1 = database.format(sql1, inserts)
    
    try {
        results=await database.transaction([sql1,sql2])
        return results
    }
    catch(err){
        return err
    }


};


async function modify(field, value, id) {
    var sql = "UPDATE `member` SET ??=? WHERE `ID`=?"
    const inserts = [field, value, id]
    sql = database.format(sql, inserts)
    try {
        results=await query(sql)
        return results
    }
    catch(err){
        return err
    }

}

register('a', 'wei', 1, 'gmail', '0911', '1234', '090', '1999-5-5', '我家', '威')
    .then(function (result) {
        console.log(result)
    })
    .catch(function (err) {
        console.log(err)
    })