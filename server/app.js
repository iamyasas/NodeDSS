var fs = require('fs');

var temp = {
	"type":"mysql",
	"host":"localhost",
	"port":"3306",
	"database":"employee",
	"user":"admin",
	"password":"admin"
};

var name = "type";

console.log(temp[name]);

/*fs.writeFile("./test.json", JSON.stringify(temp), function(err) {
    if(err) return console.log(err);
    console.log("The file was saved!");
}); */


/*fs.readFile('./test.json', 'utf8', function (err, data) {
	if (err) return console.log(err);
	console.log(JSON.parse(data).password);
});

var files = fs.readdirSync("./");

for (var i = files.length - 1; i >= 0; i--) {
	console.log(files[i]);
};*/

/*fs.writeFile("./test.js", "console.log('yasas');", function(err) {
    if(err) return console.log(err);
    console.log("The file was saved!");
});

var exec = require('child_process').exec,
    child;

child = exec('node test.js {{args}}',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});*/


/*var data = 'Simply Easy Learning';

// Create a writable stream
var writerStream = fs.createWriteStream('output.txt');

// Write the data to stream with encoding to be utf8
writerStream.write(data,'UTF8');
writerStream.write('\n','UTF8');
writerStream.write(data,'UTF8');

// Mark the end of file
writerStream.end();

// Handle stream events --> finish, and error
writerStream.on('finish', function() {
    console.log("Write completed.");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("Program Ended");*/