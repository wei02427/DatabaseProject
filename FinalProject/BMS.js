const database = require('../utils/async-db.js')

//async function
const item =[];
var cartItem = [];
async function getPersonCartID(ID){
    var sqlCommand = "SELECT `Cart_ID` FROM `cart` WHERE `ID` = ?";
    const inserts = [ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        var i =0;
        const results = await database.query(sqlCommand);
        console.log("success get cart_ID");
        return results[0].Cart_ID;
    }
    catch(err){
        console.log(err);
    }
}

async function getPersonCartIDItem(Cart_ID){
    var sqlCommand = "SELECT `Game_ID` FROM `cart_list` WHERE `Cart_ID` = ?";
    const inserts = [Cart_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        console.log("success get Game_ID");
        var i =0;
        while(results[i]){
            item.push(results[i].Game_ID);
            i++;
        }
        return item;
    }
    catch(err){
        console.log(err);
    }
}

function getPersonCartList(ID){
    var personCart = getPersonCartID(ID);
    console.log(personCart);
    personCart
    .then(function(results){ 
        cartItem = getPersonCartIDItem(results);
        cartItem
        .then(function(results){
            console.log(results);
            return results;   
        })
        .catch(function(err){
            console.log(err);
        });
    })
    .catch(function(err){
        console.log(err);
    });
}

var getID = getPersonCartList(1);

/*cartItem
.then(function(results){
    console.log(results);
})
.catch(function(err){
    console.log(err);
});*/