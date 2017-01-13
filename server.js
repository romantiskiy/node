var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: '/tmp/'});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
});

app.post('/file_upload', upload.single('file'), function (req, res) {
   console.log(req.file.name);
   console.log(req.file.path);
   console.log(req.file.type);

   var file = __dirname + "/" + req.file.originalname;

   console.log("writing file called: ", file);
   
   fs.readFile( req.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ){
            console.log("error", err );
            } else {
               response = {
                  message:'File uploaded successfully',
                  filename: file
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
   
   console.log("Example app listening at http://%s:%s", host, port)
})