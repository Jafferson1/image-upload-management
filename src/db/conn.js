exports.knex = require('knex')({
    client: process.env.DBCLIENT,
    connection: {
      host : process.env.DBHOST,
      user : process.env.DBUSER,
      password : process.env.DBPASS,
      database : process.env.DBNAME,
    }
});