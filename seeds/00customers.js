
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('customers').del(),
        // Inserts seed entries
        knex('customers').insert([{
            id: 1,
            email: 'courtney.od@gmail.com',
            first_name: 'courtney',
            last_name: 'odonnell',
            bdgs_low_range: 80,
            bdgs_high_range: 180,
            photo: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/1877355/565714/2/large.jpg',
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',  // youreawizard
  	        created_at: new Date('2016-06-29 14:26:16 UTC'),
  	        updated_at: new Date('2016-06-29 14:26:16 UTC')
        },
        {
            id: 2,
            email: 'dan@lendevour.com',
            first_name: 'dan',
            last_name: 'titcomb',
            bdgs_low_range: 80,
            bdgs_high_range: 180,
            photo: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/1877355/565714/2/large.jpg',
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbT',  // youreawizard
            created_at: new Date('2016-06-29 14:29:16 UTC'),
            updated_at: new Date('2016-06-29 14:40:16 UTC')
        },
        {
            id: 3,
            email: 'aj@adriennes.com',
            first_name: 'adrienne',
            last_name: 'odonnell',
            bdgs_low_range: 80,
            bdgs_high_range: 180,
            photo: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/1877355/565714/2/large.jpg',
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbz',  // youreawizard
            created_at: new Date('2016-06-29 15:29:16 UTC'),
            updated_at: new Date('2016-06-29 15:40:16 UTC')
        }])
    ).then(() => {
       return knex.raw("SELECT setval('customers_id_seq', (SELECT MAX(id) FROM customers));");
   });
};
