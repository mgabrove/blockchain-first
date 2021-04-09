const express = require('express')
const app = express()

const fs =require('fs');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
 
app.get('/', function (req, res) {
    res.sendFile(__dirname+'/public/index.html');
})

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    console.log(req.file);
    var data = new Buffer(fs.readFileSync(req.file.path));
    ipfs.add(data, function (err,file){
        if(err){
            console.log(err);
        }
        console.log(file);
        res.send(file[0].hash);
    })

  })

  app.get('/download/:ID',function(req,res){
      console.log(req.params.ID);
      res.redirect('https://ipfs.io/ipfs/'+req.params.ID);
  })
 
app.listen(3000)