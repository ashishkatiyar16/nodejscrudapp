/*
 * GET home page.
 */

exports.index = function(req, res) {
	var userid = req.session.userid;
	if (!userid) {
		console.log(userid);
		res.render('index', {
			title : 'Hello World',
			message : 'Hello',
			page_title : "Login",
			title : "Success",
			user : req.user
		});

	} else {
		res.render('loginsuccess', {
			page_title : "Login Success",
			title : "Customer Home",
			username : req.session.username,
		});
	}

};
