/*
 * GET home page.
 */

exports.index = function(req, res) {
	var userid = req.session.username;
	if (!userid) {
		res.render('index', {
			title : 'Hello World',
			message : 'Hello',
			page_title : "Login Success",
			title : "Success",
			user: req.user 
		});

	} else {
		res.render('loginsuccess', {
			message : '',
			page_title : "Login Success",
			title : "Success",
			username : userid
		});
	}

};
