"use strict"

const Express = require('express')
const router = Express.Router()
const knex = require('../knex');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');

//route works
router.get('/', (req,res) =>{
    knex('customers').then((users) => {
      res.json({users});
    })
});

router.post('/', (req, res, next)=>{
	const {email, password} = req.query;
	// console.log(req.query, 'this is the login req')

	// console.log(password, 'this shoudl be the password')
	knex('customers').where('email', email).first()
		.then((data)=>{
			if(data){
				var sqlPassword = data.hashed_password
				var userId = data.id
				// console.log(data)
				bcrypt.compare(password, sqlPassword)
				.then((results)=>{
					// console.log(data, 'worked?')
					// console.log(res, 'this is the res')
					var obj = {
						"data": data,
						"validPassword": true
					}
					res.json(obj)
				}, console.error)

		}

			// }).catch((err)=>{
			// 	res.status(400);
			// 	res.send('Bad email or password')
	})
})

module.exports = router
