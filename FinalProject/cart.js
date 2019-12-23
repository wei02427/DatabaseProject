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
