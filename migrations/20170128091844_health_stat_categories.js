
exports.up = function(knex, Promise) {
  return knex.schema.createTable('health_stat_categories', (table)=>{
      table.increments('id').primary;
      table.integer('health_stat_id').notNullable().references('id').inTable('health_stats').onDelete('cascade')
      table.integer('categories_id').notNullable().references('id').inTable('categories').onDelete('cascade')
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('health_stat_categories')
};
