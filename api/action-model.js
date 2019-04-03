
const db = require('../data/dbConfig.js');

module.exports = {
    getActions,
    getAction,
    addAction
};

function getActions() {
    return db('actions')
};

function getAction(id) {
    return db('actions')
    .where({ id })
    .first();
};

function addAction(action) {
    return db('actions')
      .insert(action)
      .then(ids => ({ id: ids[0] }));
};