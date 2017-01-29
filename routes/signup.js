"use strict"

const Express = require('express')
const router = Express.Router()
const knex = require('../knex');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');


router.post('/', (req, res, next)=>{
	const {email, password, firstName, lastName} = req.query;

	knex('customers').where('email', email).first()
		.then((data)=>{
			if(data){
				res.status(406);
				res.send('this user is already in the database')
			}
		}).catch((err)=>{
			res.status(400);
			res.send('User in database')
		})

	bcrypt.hash(req.body.password, 12)
		.then((hashedPassword)=>{
			knex('customers').insert({'email': email, 'first_name':firstName, 'last_name': lastName, 'hashed_password': hashedPassword})
				.then((data)=>{
					res.json('success')
				})
		}).catch((err)=>{
			res.status(400);
			res.send('Bad email or password')
		})
})

module.exports = router
