"use strict"

const Express = require('express')
const router = Express.Router()
var knex = require("../knex")


//route works!
router.get('/', function(req, res, next){
	// var email = req.cookies['/user']
	const email = req.query.email
	// console.log(email, 'request photos email')

	knex('customers').where('email', email).first()
		.then(function(data){

			const id = data.id
			// console.log('the users id is ' + id)

			knex('health_stats').where('customer_id', id)
				.then((results)=>{
					// console.log(results, 'iusidfuisdufisdufisd')
					var photoObj = results.map((data)=>{
						var obj = {}
						obj.id = data.id
						obj.pre_meal_bdgs= data.pre_meal_bdgs;
						obj.post_meal_bdgs= obj.post_meal_bdgs;
						obj.insulin_units= data.insulin_units
						obj.customer_id= data.customer_id
						obj.photo_url= data.photo_url
						obj.pre_meal_bdgs_time_stamp = data.pre_meal_bdgs_time_stamp
						obj.post_meal_bdgs_time_stamp = data.post_meal_bdgs_time_stamp
						obj.created_at = data.created_at
						obj.updated_at = data.updated_at
						return obj
					})
					// var photoId = data.id
					// console.log(photoObj, 'this is the photo datakshdjkfsdkfskdhfsdhfjsdjfhjshsdfhjjdffdjddjdfjdfjhs')
					var getCats = photoObj.map((data)=>{
						var photoId = data.id

						// console.log(obj, 'objs before join')
						return knex.select('category').from('health_stat_categories')
						.innerJoin('health_stats', 'health_stat_categories.health_stat_id', 'health_stats.id')
						.innerJoin('categories', 'health_stat_categories.categories_id', 'categories.id')
						.where('health_stat_id', photoId)
							.then((categoeries)=>{
								// categoeries = [ anonymous { category: 'sandwhich' }, anonymous { category: 'eggs' } ]
								var arr = categoeries.map((cats)=>{
									return cats.category
								})

								data.category = arr
								// console.log(data, 'at the end')
								// res.writeHead({
								// 	data
								// })
								return data
								// console.log('data from join', obj)
							}).catch((err)=> {
								console.log(err)
							})
					})
					console.log(getCats, 'what is getcats')
					Promise.all(getCats)
						.then(data=>{
							console.log(data, 'list of objs?sss')
							res.json({data})
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
