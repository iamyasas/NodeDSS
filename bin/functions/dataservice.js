module.exports = {
	loadDataServices: function () {
		var fs = require('fs');
		var file;
		var fileName = fs.readdirSync("../../configs/dataservices"); 
  		for (var i = fileName.length - 1; i >= 0; i--) {
  			file = JSON.parse(fs.readFileSync('../../configs/dataservices/' + fileName[i], 'utf8'));
  			generateSource(file);
  		};
	},

  	loadDataService: function (name) {
  		var fs = require('fs');
		var file = JSON.parse(fs.readFileSync('../../configs/dataservices/' + name + '.json', 'utf8'));
  		generateSource(file);
	}
};

var generateSource = function (dataServiceConfiguration){

}