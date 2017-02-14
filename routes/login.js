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
    console.log(email, password, "EMAIL")

	knex('customers').where('email', email).first()
		.then((data)=>{
			if(data){
                var user = data;
				var sqlPassword = data.hashed_password;
				var userId = data.id;

				bcrypt.compare(password, sqlPassword)
				.then((response)=>{
                    if (!response){
                        res.text('passwords dont match')
                    }
                    console.log(response, 'RESPONSE')
                    delete user['hashed_password'];
                    delete user['updated_at'];
                    delete user['created_at'];

                    var authentication = authenticateAndJWT(user);

                    var obj = {
                        'user': user,
                        'authentication': authentication
                    };
                    res.json(obj);
				}, console.error)
		} else {
            res.text('user email does not exist')
        }
	});
});

router.get('/:id', (req, res, next)=>{
    console.log(req.params, 'parans from the get')
	const id = req.params.id

	knex('customers').where('id', id).first()
		.then((user)=>{
			if(user){
                delete user['hashed_password'];
                delete user['updated_at'];
                delete user['created_at'];

                res.json({user})
		}
	});
});

router.put('/:id', (req, res, next)=>{
	const id = req.params.id
    // console.log(req.body, 'body in update')
    const {photo, first_name, bdgs_high_range, bdgs_low_range} = req.body
    console.log(photo, first_name, bdgs_high_range, bdgs_low_range, 'all the value')
	knex('customers')
    .where('id', id)
    .update({'first_name': first_name, 'photo': photo, 'bdgs_high_range': bdgs_high_range, 'bdgs_low_range': bdgs_low_range})
    .returning('*')
		.then((user)=>{
            console.log(user, 'user should be updated')
			if(user){
                delete user['hashed_password'];
                delete user['updated_at'];
                delete user['created_at'];

                res.json({user})
		}
	});
});

module.exports = router;
