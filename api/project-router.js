const router = require('express').Router();
const knex = require('knex');

const db = require('../data/dbConfig.js');
const Projects = require('./project-model.js')

// localhost:4545/api/projects
// GET all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Projects.getProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json(error);
    } 
});

// localhost:4545/api/projects/:id
// GET project and it's actions by id
router.get('/:id', (req, res) => {
    db('projects')
        .where('projects.id', req.params.id)
        .then(project => {
            if (project.length < 1) {
                res.status(404).json({ errorMessage: `The project with the specified id: '${req.params.id}' does not exist.`, });
            } else {
                db('actions')
                    .select('id', 'description', 'notes', 'completed')
                    .where('project_id', req.params.id)
                    .then(action => {
                        project = project[0];
                        project.actions = action;
                        res.status(200).json(project);
                    })
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

const errors = {
    '19': 'Another record with that value exists',
};

// localhost:4545/api/projects/
// POST new project 
router.post('/', async (req, res) => {
    try {
        const project = await Projects.addProject(req.body);
        res.status(201).json(project);
    } catch (error) {
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error });
    }
});

module.exports = router;