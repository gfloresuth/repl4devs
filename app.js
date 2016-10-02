var fs = require('fs');
var path = require('path');
var colors = require('colors');
var http = require('http');
const repl = require('repl');

var msg = 'message';


var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
      terminal.println('Error: ' + err.message);
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

var terminal = {
    println: function(text){
        console.log(text.green);
    },
    printerror:function(error){
        console.log(text.red);
    },
    wget: function (url,dest){
        var self = this;
        download(url,dest,function(error){
            self.println('Error in download: ' + error);
        });
    },
    ls: function(){
        self = this;
        fs.readdir('.',function(err,files){
            if(err){
                self.printerror(err.message);
            }else{
                
            }
        });
    },
    testDownload:function(){
        var self = this;
        self.wget('http://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries',__dirname+'/demos/demo.html');
    }
};


const r = repl.start('> ');
r.defineCommand('ls', {
  help: 'Say hello',
  action: function(name) {
    this.lineParser.reset();
    this.bufferedCommand = '';
    terminal.ls();
    this.displayPrompt();
  }
});

Object.defineProperty(r.context, 'terminal', {
  configurable: false,
  enumerable: true,
  value: terminal
});
