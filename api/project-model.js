
const db = require('../data/dbConfig.js');

module.exports = {
    getProjects,
    getProject,
    addProject
};

function getProjects() {
    return db('projects')
};

function getProject(id) {
    return db('projects')
    // .where({ id })
    .where('projects.id', id)
    .first()
    // .leftJoin('actions', 'actions.project_id', 'projects.id');
    .then(action => {
        const project = project[0];
        project.actions = action;
        res.status(200).json(project);
      });
};

function addProject(project) {
    return db('projects')
      .insert(project)
      .then(ids => ({ id: ids[0] }));
};
