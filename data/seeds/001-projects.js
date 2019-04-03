
exports.seed = function(knex) {
  return knex('projects').insert([
    { name: 'project name here', description: 'the project description', completed: false }, // 1
  ]);
};
