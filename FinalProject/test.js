var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  port     : '3306',
  database : 'project'
});
 
connection.connect();
 
var  sql = 'SELECT * FROM author';


connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }

    

    console.log(string);
    console.log('--------------------------SELECT----------------------------');
    console.log("this result = " ,result);
    var string=JSON.stringify(result); 
    console.log(string);
    console.log('------------------------------------------------------------\n\n');  
});
connection.end();