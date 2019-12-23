var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'project'
});

pool.getConnection(function (err, connection) {
    if (err) throw err;

    console.log(modify('Phone', '66666', 2))
    connection.query(modify('Phone', '66666', 2), function (err, result) {
        if (err) throw err;
        console.log(result);
        connection.release();
    })

});


function register(fname, lname, sex, email, phone, password, credits, birthday, address, account) {

    var sql = "INSERT INTO `Member`(`First_Name`,`Last_Name`,`Sex`,`Email`,`Phone`,`Password`,`Credits`,`Class`,`Birthday`,`Address`,`Account`) VALUES (?,?,?,?,?,?,?,1,?,?,?)"
    const inserts = [fname, lname, sex, email, phone, password, credits, birthday, address, account]
    sql = mysql.format(sql, inserts)
    return sql
}

function modify(field, value, id) {
    var sql = "UPDATE `member` SET ??=? WHERE `ID`=?"
    const inserts = [field, value, id]
    sql = mysql.format(sql, inserts)
    return sql
}