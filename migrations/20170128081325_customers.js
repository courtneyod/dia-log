
exports.up = function(knex, Promise) {
  return knex.schema.createTable('customers', (table)=>{
      table.increments('id').primary;
      table.string('email').notNullable().unique();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.integer('bdgs_low_range').notNullable().defaultTo('80');
      table.integer('bdgs_high_range').notNullable().defaultTo('180');
      table.specificType('hashed_password', 'char(60)');
      table.text('photo', 'medium').defaultTo('');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('customers')
};
