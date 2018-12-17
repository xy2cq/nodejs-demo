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
            resolve(res);
        });
    },
    addList: function(res, data, resolve){
        var sql = 'INSERT INTO websites(country,name,url) VALUES(?,?,?)';
        const _this = this;
        connection.query(sql,data,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            if(result.insertId>0){
                _this.jsonWrite(res,"ok");        
            }            
            resolve(result);
        });
    }
}

// connection.end();