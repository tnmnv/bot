const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'postgresql-convex-18352',
    'imkrnqhodxhflb',
    'f35751f8f4a6b7ba44ea96e8aed84d62cc20eeb2525d86b99771051a478c4816',
    {
        host:'ec2-63-32-248-14.eu-west-1.compute.amazonaws.com',
        port: '5432',
        dialect: 'postgres'
    }
)