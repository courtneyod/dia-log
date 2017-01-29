"use strict"

const Express = require('express')
const router = Express.Router()
var knex = require("../knex")


//route works!
router.get('/', function(req, res, next){
	// var email = req.cookies['/user']
	const email = req.query.email
	console.log(email, 'request phtos email')

	knex('customers').where('email', email).first()
		.then(function(data){

			const id = data.id

			knex('health_stats').where('customer_id', id)
				.then((data)=>{

					res.json({data})

				}).catch(function(err){

					res.json({err})

				})
		})
})

router.post('/', function(req, res, next){
	console.log(req.body)
	const {photo, pre_meal_bdgs, insulin_units, customer_id} = req.body;
	const currentTime = knex.fn.now();

	knex('health_stats').insert({'photo':photo, 'pre_meal_bdgs': pre_meal_bdgs, 'insulin_units':insulin_units, 'customer_id':customer_id, 'pre_meal_bdgs_time_stamp': currentTime})
		.then((results)=>{
			console.log(results)
			res.json({results});
		}).catch((err)=>{
			res.send(err);
		});
});

router.patch('/:id/edit', function(req, res, next){
	const health_stats_id = req.params.id
	const post_meal_bdgs = req.body.post_meal_bdgs
	const currentTime = knex.fn.now();

	knex('health_stats')
    .where('health_stat_id', health_stats_id)
    .update({
		'post_meal_bdgs': post_meal_bdgs,
		'post_meal_bdgs_time_stamp': currentTime
	}).then((results)=>{
			res.json({results})
		}).catch((err)=>{
			res.json({err})
		})
})

module.exports = router
