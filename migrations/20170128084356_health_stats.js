
exports.up = function(knex, Promise) {
  return knex.schema.createTable('health_stats', (table)=>{
      table.increments('id').primary;
      table.integer('pre_meal_bdgs')
      table.integer('post_meal_bdgs')
      table.integer('insulin_units')
      table.integer('customer_id').notNullable().references('id').inTable('customers').onDelete('cascade')
      table.text('photo_url', 'medium').defaultTo('')
      table.timestamp('pre_meal_bdgs_time_stamp').notNullable().defaultTo(knex.fn.now());
      table.timestamp('post_meal_bdgs_time_stamp');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('health_stats')
};
