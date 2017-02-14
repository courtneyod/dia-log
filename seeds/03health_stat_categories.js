
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('health_stat_categories').del(),

        knex('health_stat_categories').insert([{
            categories_id: '1',
            health_stat_id: '1',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            categories_id: '11',
            health_stat_id: '4',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            categories_id: '3',
            health_stat_id: '3',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            categories_id: '2',
            health_stat_id: '2',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            categories_id: '5',
            health_stat_id: '1',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            categories_id: '6',
            health_stat_id: '4',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            categories_id: '7',
            health_stat_id: '3',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            categories_id: '8',
            health_stat_id: '3',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            categories_id: '10',
            health_stat_id: '1',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            categories_id: '7',
            health_stat_id: '2',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            categories_id: '10',
            health_stat_id: '2',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            categories_id: '9',
            health_stat_id: '1',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            categories_id: '1',
            health_stat_id: '1',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        }])
    ).then(() => {
       return knex.raw("SELECT setval('health_stat_categories_id_seq', (SELECT MAX(id) FROM health_stat_categories));");
   });
};
