"use strict"

const Express = require('express')
const router = Express.Router()
const knex = require('../knex');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const cookieParser = require('cookie-parser')


router.post('/', (req, res, next)=>{
	const {email, password, firstName} = req.query;
	const lastName = 'temp'

	console.log(email, password, firstName, 'this is the sign up query string')

	knex('customers').where('email', email).first()
		.then((data)=>{
			console.log(data, "howererowior")
			if(data){
				console.log('getting in heree', data)
				res.status(406);
				res.json("this user is already in the database")
			} else {
				console.log(password, 'this should be the password when creating a new users')

				bcrypt.hash(password, 12)
				//    .then(console.log, console.error)
					.then((hashedPassword)=>{

						console.log(hashedPassword, 'hasheddd')

						knex('customers').insert({'email': email, 'first_name':firstName, 'last_name': lastName, 'hashed_password': hashedPassword}).returning('*')
							.then((data)=>{

								var opts = {
									path: '/',
									httpOnly: true
								};
								res.cookie('/login_token', firstName, opts);
								res.cookie('/user', email, opts);

								console.log(data, 'added!')
								res.json(data)
							})
					}).catch((err)=>{
						res.status(400);
						res.send('Bad email or password')
					})
			}
		}).catch((err)=>{
			res.status(400);
			res.send('User in database')
		})

})

module.exports = router
