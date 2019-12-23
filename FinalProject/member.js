var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'project'
});


var register = function (fname, lname, sex, email, phone, password, credits, birthday, address, account) {

    var sql = "INSERT INTO `Member`(`First_Name`,`Last_Name`,`Sex`,`Email`,`Phone`,`Password`,`Credits`,`Class`,`Birthday`,`Address`,`Account`) VALUES (?,?,?,?,?,?,?,1,?,?,?)"
    const inserts = [fname, lname, sex, email, phone, password, credits, birthday, address, account]
    sql = mysql.format(sql, inserts)

    pool.getConnection(function (err, connection) {
        if (err) {
            console.error('error connecting: ', err);
        }
        else {
            connection.beginTransaction(function (err) {
                if (err) {                  //Transaction Error (Rollback and release connection)
                    connection.rollback(function () {
                        connection.release();
                        //Failure
                    });
                } else {
                    connection.query(sql, function (err, results) {
                        if (err) {          //Query Error (Rollback and release connection)
                            connection.rollback(function () {
                                connection.release();
                                //Failure
                            });
                        }
                        else {
                            connection.commit(function (err) {
                                if (err) {
                                    connection.rollback(function () {
                                        connection.release();
                                        //Failure
                                    });
                                } else {
                                    connection.release();
                                    //Success
                                }
                            });
                        }
                    });
                }
            });

        }
    })



};

function modify(field, value, id) {
    return new Promise(function (resolve, reject) {
        var sql = "UPDATE `member` SET ??=? WHERE `ID`=?"
        const inserts = [field, value, id]
        sql = mysql.format(sql, inserts)
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            else {
                connection.query(sql, function (err, results) {
                    connection.release()
                    resolve(results)
                })
            }
        })
    })
}

modify('Phone', '878', 1)
    .then(function (fulfilled) {
        console.log(fulfilled)
    })
    .catch(function (error) {
        console.log(error)
    })