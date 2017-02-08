"use strict"

const Express = require('express')
const router = Express.Router()
const knex = require('../knex');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const {
    generateToken,
    authenticateAndJWT
} = require("../helpers.js");

//route works
router.get('/', (req,res) =>{
    knex('customers').then((users) => {
      res.json({users});
  });
});

router.post('/', (req, res, next)=>{
	const {email, password} = req.query;

	knex('customers').where('email', email).first()
		.then((data)=>{
			if(data){
                var user = data;
				var sqlPassword = data.hashed_password;
				var userId = data.id;

				bcrypt.compare(password, sqlPassword)
				.then((response)=>{
                    // console.log('user from login', user)
                    var authentication = authenticateAndJWT(user);
                    res.json(authentication);
				}, console.error)
		}
	})
})

module.exports = router
