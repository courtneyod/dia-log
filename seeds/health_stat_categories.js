
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('health_stat_categories').insert({
            id: 1,
            categories_id: '1',
            health_stat_id: '1',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 2,
            categories_id: '11',
            health_stat_id: '4',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 3,
            categories_id: '3',
            health_stat_id: '3',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 4,
            categories_id: '2',
            health_stat_id: '2',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 5,
            categories_id: '5',
            health_stat_id: '1',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 6,
            categories_id: '6',
            health_stat_id: '4',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 7,
            categories_id: '7',
            health_stat_id: '3',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 8,
            categories_id: '8',
            health_stat_id: '3',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 9,
            categories_id: '10',
            health_stat_id: '1',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 10,
            categories_id: '7',
            health_stat_id: '2',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 11,
            categories_id: '10',
            health_stat_id: '2',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 12,
            categories_id: '9',
            health_stat_id: '1',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 13,
            categories_id: '1',
            health_stat_id: '1',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        })
      ]);
    });
};
