
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('categories').insert({
            id: 1,
            category: 'tacos',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 2,
            category: 'pastrie',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 3,
            category: 'burger',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 4,
            category: 'buritto',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 5,
            category: 'tamales',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 6,
            category: 'sandwhich',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 7,
            category: 'salad',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 8,
            category: 'fruit',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 9,
            category: 'soup',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 10,
            category: 'chips',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 11,
            category: 'eggs',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },{
            id: 12,
            category: 'fries',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        })
      ]);
    });
};
