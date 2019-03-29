const router = require('express').Router();
const knex = require('knex');

const db = require('../data/dbConfig.js');
const Actions = require('./action-model.js')

// localhost:4545/api/actions
// GET all actions
router.get('/', async (req, res) => {
    try {
        const actions = await Actions.getActions();
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json(error);
    } 
});

// localhost:4545/api/actions/:id
// GET action by id
router.get('/:id', async (req, res) => {
    try {
        const action = await Actions.getAction(req.params.id);
        res.status(200).json(action);
    } catch (error) {
        res.status(500).json(error);
    }
});

const errors = {
    '19': 'Another record with that value exists',
};

// localhost:4545/api/actions/
// POST new action 
router.post('/', async (req, res) => {
    try {
        const action = await Actions.addAction(req.body);
        res.status(201).json(action);
    } catch (error) {
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error });
    }
});

module.exports = router;