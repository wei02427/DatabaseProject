var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Aaron985858626',
    port: '3306',
    database: 'project'
});

var test;
//insert comment to mysql
var commentGame = function(ID,Game_ID,comment,star){     
    var dateTime = getRealTime();
    var sqlCommand = "INSERT into `comment` (`ID`,`Game_ID`,`description`,`stars`,`time`)VALUES (?,?,?,?,?)";
    const inserts = [ID,Game_ID,comment,star,dateTime];
    sqlCommand = mysql.format(sqlCommand, inserts);
    pool.getConnection(function(err, connection) {
        if (err) {
            console.error('error connecting: ', err);
        }
        else{
            connection.query(sqlCommand, function(err, result) {
                if(err){
                    connection.rollback(function () {
                        connection.release();
                        //Failure
                    });
                }
                else{
                    var string=JSON.stringify(result.length); 
                    console.log(sqlCommand);
                    connection.release();
                }
            });    
        }
    });
}


function getCommentAccount(){
    var sqlCommand = "SELECT "

}



var getGameComment= function(Game_ID,callback){
    var currentResult;
    var memberID = [];
    var des = [];
    var sqlCommand = "SELECT `ID`, `description` FROM comment WHERE `Game_ID` = ?";
    const inserts = [Game_ID];
    sqlCommand = mysql.format(sqlCommand, inserts);
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(console.error('error connecting: ', err),null);
        }
        else{
            connection.query(sqlCommand, function(err, result) {
                if(err){
                    connection.rollback(function () {
                        connection.release();
                        //Failure
                    });
                }
                else{
                    currentResult = result;
                    console.log(result[0].ID);
                    connection.release();
                    return callback(err,result);
                }
            });    
        }
    }); 
}

function getRealTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

getGameComment(1,function(err,result){
    if (err) {
        console.log(err);
    }
    else {
        console.log(err,result);
        return result;
    }
});


