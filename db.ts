import { Sequelize } from 'sequelize';

module.exports = new Sequelize(
    process.env.DB_NAME!, // database name
    process.env.DB_USER!, // database user
    process.env.DB_PASSWORD!, // database password
    {
        host: process.env.DB_HOST!, // database host
        port: parseInt(process.env.DB_PORT!), // database port
        dialect: 'postgres'
    }    
)