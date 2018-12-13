var mysql  = require('mysql');  
var SqlConfig = require('../config/db');
var connection = mysql.createConnection(SqlConfig);  
connection.connect();
 
// var  sql = 'SELECT * FROM websites';
// //查
// connection.query(sql,function (err, result) {
//     if(err){
//         console.log('[SELECT ERROR] - ',err.message);
//         return;
//     }
//     console.log(result);
// });
 

module.exports = {
    getList: function() {
        var param=null;
        var  sql = 'SELECT * FROM websites';
        connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        console.log(result);
        });
    }
}


// connection.end();