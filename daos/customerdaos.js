exports.getall = function(req, res) {

	req.getConnection(function(err, connection) {
		var query = connection.query('SELECT * FROM customer', function(err,
				rows) {
			if (err)
				console.log("Error Selecting : %s ", err);
			res(err, rows);
		});
	});
};

exports.editcustomerdao = function(req, res) {
	var id = req.params.id;

	req.getConnection(function(err, connection) {

		var query = connection.query('SELECT * FROM customer WHERE id = ?',
				[ id ], function(err, rows) {

					if (err)
						console.log("Error Selecting : %s ", err);

					res(err, rows);

				});

	});
};

exports.savecustomerdao = function(req, data, res) {
	req.getConnection(function(err, connection) {
		var query = connection.query("INSERT INTO customer set ? ", data,
				function(err, rows) {
					res(err);
				});
	});
};

exports.editsavecustomerdao = function(req, data, id, res) {
	req.getConnection(function(err, connection) {
		connection.query("UPDATE customer set ? WHERE id = ? ", [ data, id ],
				function(err, rows) {

					res(err);

				});

	});
};
exports.deletecustomer = function(req, id, res) {
	req.getConnection(function(err, connection) {
		connection.query("DELETE FROM customer  WHERE id = ? ", [ id ],
				function(err, rows) {
					res(err);
				});

	});
};

exports.logincustomer = function(req, data, res) {

	req.getConnection(function(err, connection) {

		var query = connection.query('SELECT * FROM customer where ' + data,
				function(err, rows) {
					if (err)
						console.log("Error Selecting : %s ", err);
					res(err, rows);

				});
	});
};
