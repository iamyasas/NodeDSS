module.exports = {
  	getDataSource: function (name) {
  		var fs = require('fs');
		return JSON.parse(fs.readFileSync('../configs/datasources/' + name + '.json', 'utf8'));
	}
};