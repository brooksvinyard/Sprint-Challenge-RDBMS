exports.up = function(knex) {

    return knex.schema
      .createTable('projects', tbl => {
        tbl.increments();

        tbl
          .string('name', 128)
          .notNullable()
          .unique();
        
        tbl.string('description', 256).notNullable();

        tbl.boolean('completed').notNullable();
      })

      .createTable('actions', tbl => {
        tbl.increments();

        tbl
          .integer('project_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('projects')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');

        tbl.string('description', 128).notNullable();

        tbl.string('notes', 1024);

        tbl.boolean('completed').notNullable();
      })
  };

  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('projects')
      .dropTableIfExists('actions');
  };