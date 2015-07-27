module.exports = {
  getConnection: function (type, host, port, database, user, password) {
  	var DBconnection;
  	if (type == "oracle") {
  		var oracle = require('oracledb');
  		oracle.getConnection({
		    user          : user,
		    password      : password,
		    connectString : host + ":" + port + "/" + database
		},	  
		function(err, connection){
			DBconnection = connection;
		});
  	}
  	else if(type == "mysql"){
  		var mysql = require('mysql');
  		DBconnection = mysql.createConnection({
			host     : host,
			database : database,
			port	 : port,
			user     : user,
			password : password
		});
  	}
  	else if(type == "mssql"){
  		var mssql = require('mssql'); 
  	}

  	return DBconnection;
  },

  bar: function () {
    // whatever
  }
};