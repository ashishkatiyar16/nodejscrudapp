/**
 * New node file
 */
var nodemailer = require('nodemailer');
exports.sendmail=function(req, res) {
	var mailOpts, smtpTrans;
	// Setup Nodemailer transport
	smtpTrans = nodemailer.createTransport('SMTP', {
		service : 'Gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secureConnection: true,
		auth : {
			user : "ashish.kumar.katiyar16@gmail.com",
			pass : "As9301321920"
		}
	});
	// Mail options
	mailOpts = {
		from : 'CFE INDIA',
		to : req.params.mail,
		cc:'ashish_katiyar16@rediffmail.com',
		subject : 'Mail Through Node js',
		text : 'hello.. Node js mail is very easy...'
	};
	smtpTrans.sendMail(mailOpts, function(error, response) {
		// Email not sent
		if (error) {
			console.log(error);
			}
		//  Email sent
		else {
			console.log("Success found...");
			}
		smtpTrans.close();
	});};