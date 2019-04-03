
exports.seed = function(knex) {
  return knex('actions').insert([
    { project_id: 1, description: 'action description', notes: 'the action notes', completed: false }, // 1
    { project_id: 1, description: 'another action description', notes: 'the other action notes', completed: false }, // 2
  ]);
};
