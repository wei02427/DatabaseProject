var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Aaron985858626',
    port: '3306',
    database: 'project'
});


//insert comment to mysql
var commentGame = function(ID,Game_ID,comment,star){     
    var dateTime = getRealTime();
    var sqlCommand = "INSERT into `comment` (`ID`,`Game_ID`,`description`,`stars`,`time`)VALUES (?,?,?,?,?)";
    const inserts = [ID,Game_ID,comment,star,dateTime]
    sqlCommand = mysql.format(sqlCommand, inserts)
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
                    console.log(sqlCommand)
                    connection.release();
                }
            });    
        }
    });
}

commentGame(1,1,"testing",5);

function getCommentAccount(){
    var sqlCommand = "SELECT "

}


function getGameComment(Game_ID){
    var sqlCommand = "SELECT *"
}
function getRealTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}