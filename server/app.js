var fs = require('fs');

var temp = {
	"type":"mysql",
	"host":"localhost",
	"port":"3306",
	"database":"employee",
	"user":"admin",
	"password":"admin"
};

fs.writeFile("./test.json", JSON.stringify(temp), function(err) {
    if(err) return console.log(err);
    console.log("The file was saved!");
}); 


fs.readFile('./test.json', 'utf8', function (err, data) {
	if (err) return console.log(err);
	console.log(JSON.parse(data).password);
});

var files = fs.readdirSync("./");

for (var i = files.length - 1; i >= 0; i--) {
	console.log(files[i]);
};

