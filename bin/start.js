//start up server
var restify = require('restify');

var db = require('./functions/db.js');
var dsrc = require('./functions/datasource.js');

var server = restify.createServer();
server.use(restify.queryParser());

server.get('/Employee', getAllEmp);
server.get('/Employee/:id', getEmpById);

function getAllEmp(req, res, next) {
	var dataSource = dsrc.getDataSource("localMysql");
	var connection = db.getConnection(dataSource.type, dataSource.host, dataSource.port, dataSource.database, dataSource.user, dataSource.password);
	connection.connect();
	
	connection.query('SELECT * from emp', function(err, results, fields){
		sendResults(err, results, fields, res)
	}); 
	
	connection.end();
}

function getEmpById(req, res, next) {
	var dataSource = dsrc.getDataSource("localMysql");
	var connection = db.getConnection(dataSource.type, dataSource.host, dataSource.port, dataSource.database, dataSource.user, dataSource.password);
	connection.connect();

	connection.query('SELECT * from emp where id = ?', [req.params.id], function(err, results, fields){
			sendResults(err, results, fields, res)
	});
	
	connection.end();
}

function sendResults(err, results, fields, res){
	if (err) throw err;
  	res.send(results);
	next();
}

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});