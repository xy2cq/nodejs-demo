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
 
// var jsonWrite = function(res, ret) {
//     if(typeof ret === 'undefined'){
//         res.json({
//             code: 0,
//             msg: '操作失败'
//         })
//     }else{
//         res.json({
//             code:1,
//             body:ret.rows
//         });
//     }
// };
module.exports = {
    jsonWrite: function(res, ret) {
        if(typeof ret === 'undefined'){
            res.json({
                code: 0,
                msg: '操作失败'
            })
        }else{
            res.json({
                code:1,
                body:ret
            });
        }
    },
    getList: function (res,resolve) {
        var sql = 'SELECT * FROM websites';
        const _this = this;
            connection.query(sql,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    return;
                }   
                _this.jsonWrite(res,result);         
                console.log(res);       
                resolve(res);
            });
    }
}


// connection.end();