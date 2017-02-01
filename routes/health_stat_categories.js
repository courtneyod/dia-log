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

	// knex('categories').where('categories_id', category_id)
	// 	.then(function(data){
	// 		var categories_id = '';
	// 		if(!data){
	// 			knex('categories').insert({'category': category_name})
	// 				.then(function(dataInput){
	// 					categories_id = dataInput.id;
	// 				});
	// 		} else {
	// 			categories_id = data.id;
	// 		}

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
			console.log(data, 'this is the jealth stat join table')
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
		console.log('data from join', data)
		res.json({data})
	}).catch((err)=> {
		console.log(err)
	})
})

module.exports = router
