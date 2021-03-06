
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('health_stats').del(),

        knex('health_stats').insert([{
            id: 1,
            pre_meal_bdgs: '110',
            post_meal_bdgs: '180',
            aws_name: '',
            aws_type: '',
            insulin_units: '4',
            customer_id: '2',
            photo_url:'https://img.buzzfeed.com/buzzfeed-static/static/2013-12/enhanced/webdr06/8/11/grid-cell-18370-1386520382-7.jpg',
            pre_meal_bdgs_time_stamp: new Date('2017-01-29 14:26:16 UTC'),
            post_meal_bdgs_time_stamp: new Date('2017-01-30 14:26:16 UTC'),
            created_at: new Date('2017-01-29 14:26:16 UTC'),
  	        updated_at: new Date('2017-01-30 14:26:16 UTC')
        },
        {
            id: 2,
            pre_meal_bdgs: '190',
            post_meal_bdgs: '250',
            aws_name: '',
            aws_type: '',
            insulin_units: '2',
            customer_id: '1',
            photo_url:'https://img.buzzfeed.com/buzzfeed-static/static/2013-12/enhanced/webdr03/10/11/grid-cell-6757-1386691622-7.jpg',
            pre_meal_bdgs_time_stamp: new Date('2017-01-30 14:26:16 UTC'),
            post_meal_bdgs_time_stamp: new Date('2017-01-31 14:26:16 UTC'),
            created_at: new Date('2017-01-30 14:26:16 UTC'),
            updated_at: new Date('2017-01-31 14:26:16 UTC')
        },
        {
            id: 3,
            pre_meal_bdgs: '400',
            post_meal_bdgs: '100',
            aws_name: '',
            aws_type: '',
            insulin_units: '9',
            customer_id: '3',
            photo_url:'https://img.buzzfeed.com/buzzfeed-static/static/2013-12/enhanced/webdr02/12/12/grid-cell-16749-1386868939-26.jpg',
            pre_meal_bdgs_time_stamp: new Date('2017-02-05 14:26:16 UTC'),
            post_meal_bdgs_time_stamp: new Date('2017-02-05 19:26:16 UTC'),
            created_at: new Date('2017-02-05 14:26:16 UTC'),
            updated_at: new Date('2017-02-05 19:26:16 UTC')
        },
        {
            id: 4,
            pre_meal_bdgs: '100',
            post_meal_bdgs: '500',
            insulin_units: '2',
            aws_name: '',
            aws_type: '',
            customer_id: '1',
            photo_url:'https://img.buzzfeed.com/buzzfeed-static/static/2013-12/enhanced/webdr05/7/19/grid-cell-8311-1386462676-7.jpg',
            pre_meal_bdgs_time_stamp: new Date('2017-02-05 14:26:16 UTC'),
            post_meal_bdgs_time_stamp: new Date('2017-02-06 19:26:16 UTC'),
            created_at: new Date('2017-02-06 14:26:16 UTC'),
            updated_at: new Date('2017-02-06 19:26:16 UTC')
        },{
            id: 5,
            pre_meal_bdgs: '400',
            post_meal_bdgs: '100',
            aws_name: 'G0090523.JPG',
            aws_type: 'image/jpeg',
            insulin_units: '9',
            customer_id: '1',
            photo_url:'http://s6.favim.com/orig/65/coke-food-instagram-pizza-Favim.com-597855.jpg',
            pre_meal_bdgs_time_stamp: new Date('2017-02-05 13:26:16 UTC'),
            post_meal_bdgs_time_stamp: new Date('2017-02-05 19:26:16 UTC'),
            created_at: new Date('2017-02-05 14:26:16 UTC'),
            updated_at: new Date('2017-02-05 19:26:16 UTC')
        }])
    ).then(() => {
       return knex.raw("SELECT setval('health_stats_id_seq', (SELECT MAX(id) FROM health_stats));");
   });
};
