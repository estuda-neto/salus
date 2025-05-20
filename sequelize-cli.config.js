require('ts-node').register();

module.exports = {
  development: {
    dialect: 'mysql', // ou mysql, sqlite, etc
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'test_db',
    migrationStorageTableName: 'migrations',
  },
  // adicione outros ambientes (test, production) conforme necessário
};

