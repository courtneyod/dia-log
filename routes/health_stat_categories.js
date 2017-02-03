"use strict"

const Express = require('express')
const router = Express.Router()
var knex = require("../knex")

//route works
router.get('/', function(req, res, next){

	knex.select().table('health_stat_categories')
		.then(function(data){

			res.json({data})

		}).catch((err)=>{
			res.status(500)
		})
})

router.post('/', function(req, res, next){
	const health_stat_id = req.query.health_stat_id;
	const categories_id = req.query.categories_id;

			knex('health_stat_categories').insert({'health_stat_id': health_stat_id, 'categories_id': categories_id})
				.then((data)=>{
					res.json({data});
				}).catch((err)=>{
					res.status(500);
					res.send(err);
				});

});


router.get('/:id', function(req, res, next){
	const id = req.params.id;

	knex('health_stat_categories').where('health_stat_id', id)
		.then(function(data){
			res.json({data});

		}).catch((err)=>{
			res.status(500)
		})
})
router.get('/name/:id', function(req, res, next){
	const id = req.params.id;
//
// SELECT
//  categories.category
// FROM
//  health_stat_categories
// INNER JOIN health_stats ON health_stat_categories.health_stat_id = health_stats.id
// INNER JOIN categories ON health_stat_categories.categories_id = categories.id
// where health_stats_id = 5;

knex.select('category').from('health_stat_categories')
.innerJoin('health_stats', 'health_stat_categories.health_stat_id', 'health_stats.id')
.innerJoin('categories', 'health_stat_categories.categories_id', 'categories.id')
.where('health_stat_id', id)
	.then((data)=>{
		// console.log('data from join', data)
		res.json({data})
	}).catch((err)=> {
		console.log(err)
	})
})

router.delete('/', function(req, res, next){
	console.log('here')
	console.log(req.body, 'body')
	var category = req.body.category
	var photoId = req.body.id

	knex('categories').where('category', category)
		.then(function(data){

			console.log(data, 'cat I want to delete')
			var categories_id = data[0].id
			console.log(categories_id, 'id of cat', photoId, 'id of phot i want to delete')

// delete from health_stat_categories where health_stat_id = 1 and categories_id =1;
			knex('health_stat_categories').where({
				'health_stat_id':photoId,
				'categories_id':categories_id
			}).del().then((results)=>{
					console.log(results, 'results from delete')
				})

		}).catch((err)=>{
			res.status(500)
		})
})

module.exports = router
