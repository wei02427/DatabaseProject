var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Aaron985858626',
    port: '3306',
    database: 'project'
});
 




pool.getConnection(function(err, connection) {
    var  sql = commentGame(1,1);
  // Use the connection
    if (err) throw err;
    connection.query(sql, function(err, result) {
        if(err)throw err;
        var string=JSON.stringify(result.length); 
        console.log(sql);
        
        // Don't use the connection here, it has been returned to the pool.
    });



    //var  sql = '';


    /*function getEvent() {
        var input = document.getElementById("SCMSGetEvent").string;
        //alert(input);
    }*/

    //insert comment to mysql
    function commentGame(ID,Game_ID){
        //var comment = document.getElementById("SCMSGetComment").string;
        //var star = document.getElementById("SCMSGetStar").string;
        var comment = "testing";
        var star = 1;
        var sqlCommand;
        var commentID;
        var dateTime = getRealTime(); //call function get real time 
        //get comment amount to calculate commentID
        connection.query("SELECT * FROM comment", function(err, result) {
            if(err)throw err;
            commentID=JSON.stringify(result.length); 
            console.log(commentID);
            // Don't use the connection here, it has been returned to the pool.
        });

        
        sqlCommand = "INSERT into `comment` (`ID`,`Game_ID`,`description`,`stars`,`time`)VALUES (?,?,?,?,?)";
        const inserts = [ID,Game_ID,comment,star,dateTime]
        sqlCommand = mysql.format(sqlCommand, inserts)
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


    connection.release();
});