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
	const {email, password, firstName, lastName} = req.body;

	knex('customers').where('email', email).first()
		.then((data)=>{
			if(data){
				bcrypt.hash(req.body.password, 12)
					.then((hashedPassword)=>{

						bcrypt.compareSync(data.hashed_password, hashedPassword, function(res, err){
							if(res){
								res.status(200)
								res.json('success')
							}
						})
					})
				}

			}).catch((err)=>{
				res.status(400);
				res.send('Bad email or password')
			})
	})

module.exports = router
