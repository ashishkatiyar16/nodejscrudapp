var customerservice = require("../services/customerservice");
/*
 * GET users listing.
 */

exports.list = function(req, res) {
	req.getConnection(function(err, connection) {
		var query = connection.query('SELECT * FROM customer', function(err,
				rows) {
			if (err)
				console.log("Error Selecting : %s ", err);
			res.render('customers', {
				page_title : "Customers List",
				data : rows,
				username:"Guest"
			});
		});
	});
};

exports.add = function(req, res){
	var username=req.session.username;
	  res.render('add_customer',{ page_title: "Add Customers ", username:username});
	};


exports.edit = function(req, res) {
	var id = req.params.id;

	req.getConnection(function(err, connection) {

		var query = connection.query('SELECT * FROM customer WHERE id = ?',
				[ id ], function(err, rows) {

					if (err)
						console.log("Error Selecting : %s ", err);

					res.render('edit_customer', {
						page_title : "Edit Customers - ",
						data : rows,
						username:"Guest"
					});

				});

		// console.log(query.sql);
	});
};

/* Save the customer */
exports.save = function(req, res) {

	var input = JSON.parse(JSON.stringify(req.body));

	req.getConnection(function(err, connection) {

		var data = {

			name : input.name,
			address : input.address,
			email : input.email,
			phone : input.phone

		};

		var query = connection.query("INSERT INTO customer set ? ", data,
				function(err, rows) {

					if (err)
						console.log("Error inserting : %s ", err);

					res.redirect('/customers');
				});

		// console.log(query.sql); get raw query

	});
};

exports.save_edit = function(req, res) {

	var input = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;

	req.getConnection(function(err, connection) {

		var data = {

			name : input.name,
			address : input.address,
			email : input.email,
			phone : input.phone

		};

		connection.query("UPDATE customer set ? WHERE id = ? ", [ data, id ],
				function(err, rows) {

					if (err)
						console.log("Error Updating : %s ", err);

					res.redirect('/customers');

				});

	});
};

exports.delete_customer = function(req, res) {

	var id = req.params.id;

	req.getConnection(function(err, connection) {

		connection.query("DELETE FROM customer  WHERE id = ? ", [ id ],
				function(err, rows) {

					if (err)
						console.log("Error deleting : %s ", err);

					res.redirect('/customers');

				});

	});
};

exports.login_customer = function(req, res) {

	var input = JSON.parse(JSON.stringify(req.body));
	var data = " email='" + input.username + "' and password= '"
			+ input.password + "'";

	req.getConnection(function(err, connection) {

		var query = connection.query('SELECT * FROM customer where ' + data,
				function(err, rows) {
					if (err)
						console.log("Error Selecting : %s ", err);
					if (rows.length > 0) {
						console.log("success");
						req.session.userid = rows[0].id;
						req.session.username=rows[0].name;
						res.render('loginsuccess', {
							page_title : "Customers - Login success",
							data : rows,
							username:"Guest"
						});
					} else {
						res.render('index', {
							message : "Login failure, Please Try Again"
						});

					}

				});
		 console.log(query.sql);
	});

};

exports.editprofile = function(req, res) {
	var userid = req.session.userid;
	console.log("userid"+userid);
	req.getConnection(function(err, connection) {

		var query = connection.query('SELECT * FROM customer WHERE id = ?',
				[ userid ], function(err, rows) {

					if (err) {
						console.log("Error Selecting : %s ", err);
						res.render('index', {
							message : 'User does not exit into database',username:"Guest"
						});
					}

					res.render('edit_customer', {
						page_title : "Edit Customers Profile",
						data : rows,
						username:"Guest"
					});

				});

		// console.log(query.sql);
	});
};
