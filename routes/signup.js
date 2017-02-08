"use strict"

const Express = require('express')
const router = Express.Router()
const knex = require('../knex');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const cookieParser = require('cookie-parser')
const {
    generateToken,
    authenticateAndJWT
} = require("../helpers.js");


router.post('/', (req, res, next)=>{
	const {email, password, firstName} = req.query;
	const lastName = 'temp';

	knex('customers').where('email', email).first()
		.then((data)=>{
			if(data){
				console.log('user already in database', data)
				res.json("user already exsists")
				res.status(406);
			} else {
				bcrypt.hash(password, 12)
					.then((hashedPassword)=>{

						knex('customers').insert({'email': email, 'first_name':firstName, 'last_name': lastName, 'hashed_password': hashedPassword}).returning('*')
							.then((user)=>{

								console.log(user, 'added!')
								res.json(authenticateAndJWT({
									   id: user[0].id,
									   username: user[0].first_name,
									   email: user[0].email
								   }));

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
