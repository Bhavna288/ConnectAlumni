const jsonwebtoken = require('jsonwebtoken');
const config = require('config');
const fs = require('fs');
const path = require('path');
module.exports = (req, res, next) => {

	//Get Token from headers
	const token = req.header('x-auth-token');

	// Check if not token
	if (!token) {
		return res.status(401).json({ message: 'No token, authorization denied' });
	}

	// Verify token
	try {
		var publickey = fs.readFileSync('./public.key', 'utf8');

		jsonwebtoken.verify(token, publickey, (error, verified) => {
			if (error) {
				return res.status(401).json({ message: 'Token is Not valid' });
			} else {
				req.user = verified.user;
				next();
			}
		});

	} catch (err) {
		console.error('something wrong with auth middleware');
		console.log(err);
		res.status(500).json({ message: 'Server Error' });
	}
};
