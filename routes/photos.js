"use strict"

const Express = require('express')
const router = Express.Router()
var knex = require("../knex")
const JWT = require("jsonwebtoken");
const APP_SECRET = "SUPERSECRETAPPSECRET";

//route works!
router.get('/', function(req, res, next){
	// var email = req.cookies['/user']
	const jwt = req.query.jwt;

	try {
        var user = JWT.verify(req.query.jwt, APP_SECRET);
    } catch(err) {
        console.error(err);
    }

	if(user){
	console.log('user on line 21 of photo.js', user)
	knex('customers').where('id', user.id).first()
		.then(function(data){

			const id = data.id

			knex('health_stats').where('customer_id', id).orderBy('pre_meal_bdgs_time_stamp', 'desc')
				.then((results)=>{
					var photoObj = results.map((data)=>{
						var obj = {}
						obj.id = data.id
						obj.pre_meal_bdgs= data.pre_meal_bdgs;
						obj.post_meal_bdgs= data.post_meal_bdgs;
						obj.insulin_units= data.insulin_units
						obj.aws_name= data.aws_name
						obj.aws_type= data.aws_type
						obj.customer_id= data.customer_id
						obj.photo_url= data.photo_url
						obj.pre_meal_bdgs_time_stamp = data.pre_meal_bdgs_time_stamp
						obj.post_meal_bdgs_time_stamp = data.post_meal_bdgs_time_stamp
						obj.created_at = data.created_at
						obj.updated_at = data.updated_at
						return obj
					})
					// var photoId = data.id
					var getCats = photoObj.map((data)=>{
						var photoId = data.id

						return knex.select('category').from('health_stat_categories')
						.innerJoin('health_stats', 'health_stat_categories.health_stat_id', 'health_stats.id')
						.innerJoin('categories', 'health_stat_categories.categories_id', 'categories.id')
						.where('health_stat_id', photoId)
							.then((categoeries)=>{
								var arr = categoeries.map((cats)=>{
									return cats.category
								})

								data.category = arr

								return data
							}).catch((err)=> {
								console.log(err)
							})
					})
					// console.log(getCats, 'what is getcats')
					Promise.all(getCats)
						.then(data=>{
							// console.log(data, 'list of objs?sss')
							res.json({data})
						})

				}).catch(function(err){

					res.json({err})

				})
		})
	} else {
		res.error("failed to authenticate user")
	}
})

router.post('/', function(req, res, next){
	const {photo_url, pre_meal_bdgs, insulin_units, customer_id, aws_type, aws_name, category} = req.body;
	const currentTime = knex.fn.now();
	var categoryId = ''
	var photoId = ''

	knex('categories').where({'category': category}).first()
		.then((results)=>{

			if(!results){
				knex('categories').insert({'category': category}).returning('*')
					.then((results)=>{
						categoryId = results[0].id
					})
			} else {
				categoryId = results.id
			}

		}).then(() =>{
			knex('health_stats').insert({'photo_url':photo_url, 'pre_meal_bdgs': pre_meal_bdgs, 'insulin_units':insulin_units, 'customer_id':customer_id, 'pre_meal_bdgs_time_stamp': currentTime, "aws_type":aws_type, "aws_name":aws_name}).returning('*')
				.then((results)=>{
					photoId = results[0].id
					res.json({results});
				}).then(data =>{
					knex('health_stat_categories').insert({'categories_id': categoryId, 'health_stat_id': photoId})
						.then((results)=>{
							console.log(results, 'results from jioning that cat and photo')
						}).catch((err)=>{
							console.log(err, 'error from trying to joing cats id and photo id')
						})
				})

		})


});

router.post('/addPostBdgs', function(req, res, next){
	var postBdgs = req.body.postBdgs;
	var photoId = req.body.id;
	const currentTime = knex.fn.now();

	knex('health_stats')
	.where('id', photoId)
	.update({'post_meal_bdgs': postBdgs, 'post_meal_bdgs_time_stamp': currentTime})
	.returning('*')
	.then((results)=>{
		res.json({results})
	}).catch((err)=>{
		console.log(err)
		res.json({err})
	})

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
