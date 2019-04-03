
const express = require('express');

const projectRouter = require('./api/project-router.js');
const actionRouter = require('./api/action-router.js');

const server = express();

server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server;