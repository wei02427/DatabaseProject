const { query } = require('../utils/async-db.js')
var mysql = require('mysql');


//insert comment to mysql
async function insertComment(ID,Game_ID,des,star){     
    var dateTime = getRealTime();
    var sqlCommand = "INSERT into `comment` (`ID`,`Game_ID`,`description`,`stars`,`time`)VALUES (?,?,?,?,?)";
    const inserts = [ID,Game_ID,des,star,dateTime];
    sqlCommand = mysql.format(sqlCommand, inserts);
    try {
        await query(sqlCommand);
        console.log("success insert");
    }
    catch{
        console.log(err);
    }
}

async function updateComment(ID,Game_ID,des,stars){
    var dateTime = getRealTime();
    var sqlCommand = "UPDATE comment SET `description` = ?, `stars` =?, `time` =? WHERE `ID` = ? AND `Game_ID` = ?";
    const inserts = [des,stars,dateTime,ID,Game_ID];
    sqlCommand = mysql.format(sqlCommand, inserts);
    try {
        await query(sqlCommand);
        console.log("success update");
    }
    catch{
        console.log(err);
    }
}


async function getPersonComment(ID, Game_ID){
    var sqlCommand = "SELECT `ID`, `description`,`stars`,`time` FROM comment WHERE `Game_ID` = ? AND `ID` = ?";
    const inserts = [Game_ID,ID];
    sqlCommand = mysql.format(sqlCommand, inserts);
    try {
        const results = await query(sqlCommand);
        console.log("success");
        return results;
    }
    catch{
        console.log(err);
    }
}


async function getGameComment(ID,Game_ID){
    var sqlCommand = "SELECT `ID`, `description`,`stars`,`time` FROM comment WHERE `Game_ID` = ? AND NOT `ID` = ?";
    const inserts = [Game_ID,ID];
    sqlCommand = mysql.format(sqlCommand, inserts);
    try {
        const results = await query(sqlCommand);
        console.log("success get game comment");
        return results;
    }
    catch{
        console.log(err);
    }
}

async function getCommentID(Game_ID){
    var sqlCommand = "SELECT `ID` FROM comment WHERE `Game_ID` = ?";
    const inserts = [Game_ID];
    sqlCommand = mysql.format(sqlCommand, inserts);
    try {
        const results = await query(sqlCommand);
        console.log("success get comment id");
        return results
    }
    catch{
        console.log(err);
    }
}

function compareObj(obj1,obj2){
    var i=0;
    while(obj2[i]){
        if(obj1 === obj2[i].ID){
            return true;
        }
        i++; 
    }
    return false;
}

function commentGame(ID,Game_ID,des,star){
    var results = getCommentID(Game_ID);
    results
    .then(function(result){
        var isOwn = false;
        isOwn = compareObj(ID,result);
        if(isOwn){
            updateComment(ID,Game_ID,des,star);
            console.log("update");
        }
        else{
            insertComment(ID,Game_ID,des,star);
            console.log("insert");
        }
    })
    .catch(function(err){
        console.log(err);
    });
    
}

function getRealTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

commentGame(1,1,"shit",1);

/*var text = getGameComment(2,1);
text
.then(function(results){
    console.log(results);
})
.catch(function(err){
    console.log(err);
});*/
