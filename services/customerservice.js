var customerdaos = require("../daos/customerdaos");

exports.allcustomer = function(req, res) {

	customerdaos.getall(req, function(err, rows) {
		res(err, rows);
	});

};

exports.editcustomer = function(req, res) {
	customerdaos.editcustomerdao(req, function(err, rows) {
		res(err, rows);

	});

};

exports.savecustomer = function(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
	var data = {

		name : input.name,
		address : input.address,
		email : input.email,
		phone : input.phone

	};

	customerdaos.savecustomerdao(req, data, function(err) {
		res(err);
	});
};

exports.editsave = function(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;

	var data = {

		name : input.name,
		address : input.address,
		email : input.email,
		phone : input.phone

	};

	customerdaos.editsavecustomerdao(req, data, id, function(err) {
		res(err);
	});

};
exports.deletecustomerservice = function(req, res) {
	var id = req.params.id;
	customerdaos.deletecustomer(req, id, function(err) {
		res(err);
	});
};

exports.logincustomer = function(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
	var data = " email='" + input.username + "' and password= '"
			+ input.password + "'";
	customerdaos.logincustomer(req, data, function(err, rows) {
		res(err, rows);
	});
};
