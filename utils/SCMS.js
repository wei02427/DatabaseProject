const database = require('./async-db.js')

async function insertComment(ID,Game_ID,des,star){     
    var dateTime = getRealTime();
    var sqlCommand = "INSERT into `comment` (`ID`,`Game_ID`,`description`,`stars`,`time`) VALUE (?,?,?,?,?)";
    const inserts = [ID,Game_ID,des,star,dateTime];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        console.log("success insert");
    }
    catch(err){
        console.log(err);
    }
}

async function updateComment(ID,Game_ID,des,stars){
    var dateTime = getRealTime();
    var sqlCommand = "UPDATE `comment` SET `description` = ?, `stars` =?, `time` =? WHERE `ID` = ? AND `Game_ID` = ?";
    const inserts = [des,stars,dateTime,ID,Game_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        console.log("success update");
    }
    catch(err){
        console.log(err);
    }
}


async function getPersonComment(ID, Game_ID){
    var sqlCommand = "SELECT `ID`, `description`,`stars`,`time` FROM `comment` WHERE `Game_ID` = ? AND `ID` = ?";
    const inserts = [Game_ID,ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        console.log("success get person comment");
        return results;
    }
    catch(err){
        console.log(err);
    }
}


async function getGameComment(ID,Game_ID){
    var sqlCommand = "SELECT `ID`, `description`,`stars`,`time` FROM `comment` WHERE `Game_ID` = ? AND NOT `ID` = ?";
    const inserts = [Game_ID,ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        console.log("success get game comment");
        return results;
    }
    catch(err){
        console.log(err);
    }
}

async function getCommentID(Game_ID){
    var sqlCommand = "SELECT `ID` FROM `comment` WHERE `Game_ID` = ?";
    const inserts = [Game_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        console.log("success get comment id");
        return results
    }
    catch(err){
        console.log(err);
    }
}

async function deleteGameComment(ID,Game_ID){
    var sqlCommand = "DELETE FROM `comment` WHERE `Game_ID`=? AND `ID` = ?";
    const inserts = [ID,Game_ID];
    sqlCommand = mysql.format(sqlCommand, inserts);
    try {
        await query(sqlCommand);
        console.log("success delete comment id");
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

let getAllComment = async function(ID,Game_ID){
    var object1 = await getPersonComment(ID,Game_ID);
    var object2 = await getGameComment(ID,Game_ID);
    var comment = [];
    var i = 0;
    while(object1[i]){
        comment.push(object1[i]);
        i++;
    }
    i = 0;
    while(object2[i]){
        comment.push(object2[i]);
        i++;
    }
    console.log(comment);
    try{
        return Promise.resolve(resolve(comment));
    }
    catch(err){
        return Promise.reject(err);
    }
}

let commentGame = async function(ID,Game_ID,des,star){
    var results =await getCommentID(Game_ID);
    var isOwn = false;
    isOwn = compareObj(ID,results);
    if(isOwn){
        updateComment(ID,Game_ID,des,star);
        console.log("update");
    }
    else{
        insertComment(ID,Game_ID,des,star);
        console.log("insert");
    }
    
}

function getRealTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

//ex:
//commentGame(2,1,"good good lah",5);
var commentObj = getAllComment(1,1);

module.exports = { commentGame, getAllComment,deleteGameComment}