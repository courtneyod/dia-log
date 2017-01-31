"use strict"

const Express = require('express')
const router = Express.Router()
var knex = require("../knex")


//route works!
router.get('/', function(req, res, next){
	// var email = req.cookies['/user']
	const email = req.query.email
	console.log(email, 'request photos email')

	knex('customers').where('email', email).first()
		.then(function(data){

			const id = data.id
			console.log('the users id is ' + id)

			knex('health_stats').where('customer_id', id)
				.then((data)=>{
					console.log(data, 'this is the photo data')
					res.json({
						'photo': data
					})

				}).catch(function(err){

					res.json({err})

				})
		})
})

router.post('/', function(req, res, next){
	console.log(req.body, 'this is the req.body')
	const {photo_url, pre_meal_bdgs, insulin_units, customer_id} = req.body;
	const currentTime = knex.fn.now();

	knex('health_stats').insert({'photo_url':photo_url, 'pre_meal_bdgs': pre_meal_bdgs, 'insulin_units':insulin_units, 'customer_id':customer_id, 'pre_meal_bdgs_time_stamp': currentTime}).returning('*')
		.then((results)=>{
			console.log(results, 'inserted objs')
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
