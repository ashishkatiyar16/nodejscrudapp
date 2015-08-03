var customerservice = require("../services/customerservice");
var request = require("request");
/*
 * GET users listing.
 */
exports.list = function(req, res) {

	customerservice.allcustomer(req, function(err, rows) {
		if (err) {
			console.log("Error Selecting : %s ", err);
		}
		res.render("customers", {
			page_title : "Customers List",
			username : "Guest",
			data : rows
		});
	});

};
exports.add = function(req, res) {
	var username = req.session.username;
	res.render('add_customer', {
		page_title : "Add Customers ",
		username : username
	});
};

exports.edit = function(req, res) {
	var userid = req.session.userid;
	customerservice.editcustomer(req, function(err, rows) {

		if (err)
			console.log("Error Selecting : %s ", err);

		res.render('edit_customer', {
			page_title : "Edit Customers",
			data : rows,
			username : userid
		});

	});
};

/* Save the customer */
exports.save = function(req, res) {

	customerservice.savecustomer(req, function(err) {

		if (err)
			console.log("Error inserting : %s ", err);
		res.redirect('/customers');
	});

};

exports.save_edit = function(req, res) {

	customerservice.editsave(req, function(err) {
		if (err)
			console.log("Error Updating : %s ", err);

		res.redirect('/customers');
	});
};

exports.delete_customer = function(req, res) {

	customerservice.deletecustomerservice(req, function(err) {
		if (err)
			console.log("Error deleting : %s ", err);

		res.redirect('/customers');
	});

};

exports.login_customer = function(req, res) {

	customerservice.logincustomer(req, function(err, rows) {
		if (err) {
			console.log("Error Selecting : %s ", err);
		}
		if (rows.length > 0) {
			console.log("success");
			console.log(rows);
			req.session.userid = rows[0].id;
			req.session.username = rows[0].name;
			req.session.loggedIn = true;
			res.render('loginsuccess', {
				page_title : "Customers - Login success",
				data : rows,
				username : rows[0].name
			});
		} else {
			res.render('index', {
				message : "Login failure, Please Try Again"
			});

		}

	});

};

exports.logout_customer = function(req, res) {

	req.session.userid = null;
	req.session.username = null;
	req.session.loggedIn = false;
	res.render('index', {
		message : "Login failure, Please Try Again"
	});

};

exports.apirequest = function(req, res) {
	// var data =
	// "token='thisistoken'&agentId='100'&account='8586818344'&amount='10'&opcode='vd'&clientTransId='121212121212'";

	request(
			{
				uri : "http://www.cybertelindia.com/api/recharge?token='thisistoken'&agentId='100'&account='8586818344'&amount=10&opcode=vd&clientTransId=54121212121212%27&originator=cybertel",
				method : "GET",
				timeout : 10000,
				followRedirect : true,
				maxRedirects : 10
			}, function(error, response, body) {
				console.log(response);
				res.write(body);
			});
};
