var restify = "var restify = require('restify');";
var db = "var db = require('../bin/functions/db.js');";
var dsrc = "var dsrc = require('../bin/functions/datasource.js');";
var serverStart = "var server = restify.createServer();server.use(restify.queryParser());";

var route = "server.%s('%s', %s);";
var queryFunction = "function %s(req, res, next) {var dataSource = dsrc.getDataSource('%s'); var connection = db.getConnection(dataSource.type, dataSource.host, dataSource.port, dataSource.database, dataSource.user, dataSource.password); connection.connect(); connection.query('%s', [%s], function(err, results, fields){ sendResults(err, results, fields, res) }); connection.end(); }";

var sendResults = "function sendResults(err, results, fields, res){	if (err) throw err;	res.send(results); next();}";
var serverListen = "server.listen(8080, function() {console.log('%s listening at %s', server.name, server.url);});";

module.exports = {
	loadDataServices: function () {
		var fs = require('fs');
		var path = require("path");
		var file;
		var fileNames = fs.readdirSync("../configs/dataservices"); 
  		for (var i = fileNames.length - 1; i >= 0; i--) {
  			file = JSON.parse(fs.readFileSync('../configs/dataservices/' + fileNames[i], 'utf8'));
  			generateSource(path.parse(fileNames[i]).name, file);
  		};
	},

  	loadDataService: function (name) {
  		var fs = require('fs');
		var file = JSON.parse(fs.readFileSync('../configs/dataservices/' + name + '.json', 'utf8'));
  		generateSource(name, file);
	}
};

var generateSource = function (fileName, dataServiceConfiguration){
	var fs = require('fs');
	var util =  require('util');

	var writerStream = fs.createWriteStream('../server/' + fileName + '.js');

	writerStream.write(restify + db + dsrc + serverStart,'UTF8');

	//line break
	writerStream.write('\n','UTF8');

	var operation;
	var verb;
	var queryName;
	var query;
	var params;

	for (var i = dataServiceConfiguration.operation.length - 1; i >= 0; i--) {
		operation = dataServiceConfiguration.operation[i];
		params = [];		
		switch(operation.verb){
			case 'GET' : 
				verb = 'get';
				break;
			case 'POST' : 
				verb = 'post';
				break;
			case 'PUT' : 
				verb = 'put';
				break;
			case 'DELETE' : 
				verb = 'delete';
				break;
		}
		if(operation.query.length == 1){
			queryName = operation.query[0].name;
			query = dataServiceConfiguration.query[queryName];

			for (var j = query.params.length - 1; j >= 0; j--) {
				params[j] = 'req.params.' + query.params[j];
			};

			writerStream.write(util.format(route, verb, operation.resourcePath, queryName),'UTF8');
			//line break
			writerStream.write('\n','UTF8');

			writerStream.write(util.format(queryFunction, queryName, query.dataSource, query.sql, params),'UTF8');

			//line break
			writerStream.write('\n','UTF8');
		}
		else{
			//TODO
			//when there are multiple queries to be executed for one operation.
		}		
	};

	writerStream.write(sendResults + serverListen,'UTF8');

	writerStream.end();

	var exec = require('child_process').exec,
    child;

	child = exec('node Employee.js {{args}}', {cwd: '../server'},
	  function (error, stdout, stderr) {
	    console.log('stdout: ' + stdout);
	    console.log('stderr: ' + stderr);
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
}