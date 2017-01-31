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

			res.json({data});

		}).catch((err)=>{
			res.status(500)
		})
})

module.exports = router
