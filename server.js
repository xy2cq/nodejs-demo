var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require("fs");
var cookieParser = require('cookie-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(multer({ dest: '/tmp/'}).array('image'));
app.use(express.static('public'));
app.use(cookieParser()) 
var mysqlmodel = require('./src/model/mysqlmodel');

app.get('/index', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/process_get', function (req, res) {
   // 输出 JSON 格式
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    new Promise(function(resolve){mysqlmodel.getList(res,resolve)}).then(function(response){
        res.end(JSON.stringify(response));
    });
})

app.post('/process_post', urlencodedParser, function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // 输出 JSON 格式
    console.log(req);
    var params = [
        req.body.country,
        req.body.name,
        req.body.url,
    ];
    new Promise(function(resolve){mysqlmodel.addList(res,params,resolve)}).then(function(response){
        res.end(JSON.stringify(response));
    });
})

app.post('/file_upload', function (req, res) { 
    console.log(req.files[0]);  // 上传的文件信息  
    var des_file = __dirname + "/file/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
         fs.writeFile(des_file, data, function (err) {
          if( err ){
               console.log( err );
          }else{
                response = {
                    message:'File uploaded successfully', 
                    filename:req.files[0].originalname
               };
           }
           console.log( response );
           res.end( JSON.stringify( response ) );
        });
    });
 })
  
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})