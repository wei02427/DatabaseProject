var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Aaron985858626',
    port: '3306',
    database: 'project'
});
 

var test = 'author'
var  sql = "SELECT * FROM  (?)";
const inserts = [test]
sql = mysql.format(sql, inserts)

pool.getConnection(function(err, connection) {
  // Use the connection
  if (err) throw err;
  connection.query( 'SELECT * FROM author', function(err, result) {
    if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
    }
    var string=JSON.stringify(result.length); 
    console.log(string);
    connection.release();
    // Don't use the connection here, it has been returned to the pool.
  });
});


//var  sql = '';


/*function getEvent() {
    var input = document.getElementById("SCMSGetEvent").string;
    //alert(input);
}*/

//insert comment to mysql
function commentGame(ID,Game_ID){
    var comment = document.getElementById("SCMSGetComment").string;
    var star = document.getElementById("SCMSGetStar").string;
    var sqlCommand;

    var dateTime = getRealTime(); //call function get real time 

    
    sqlCommand = "INSERT into `comment` (`ID`,`Game_ID`,`description`,`stars`,`time`) VALUES (?,?,?,?,?)";
    const inserts = [ID,Game_ID,comment,star,dateTime]
    sqlCommand = mysql.format(sql, inserts)
    return sqlCommand;
}


function getCommentAccount(){

    
}


function getAllGameComment(){

}
function getRealTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

