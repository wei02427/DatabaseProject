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
    console.log(register('q', 'p', 'q', '1111', '123', '0', '123456', 'ded', '1987-1-3', '123455'));
    connection.query(register('q', 'p', 'q', '1111', '123', '0', '123456', 'ded', '1987-1-3', '123455'), function (err, result) {
        if (err) throw err;
        console.log(result);
        connection.release();
    })

});


function register(fname, lname, email, phone, address, sex, password, account, birthday, credits) {
    return "INSERT INTO `Member` SET `First_Name`='" + fname +
        "',`Last_Name`='" + lname +
        "',`Sex`=" + sex +
        ", `Email`='" + email +
        "',`Phone`='" + phone +
        "',`Password`='" + password +
        "',`Credits`='" + credits +
        "',`Class`='1'" +
        ",`Birthday`='" + birthday +
        "',`Address`='" + address +
        "',`Account`='" + account + '\''
}