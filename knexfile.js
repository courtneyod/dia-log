'use strict';

module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/dialog_dev',
    pool: {
      min: 1,
      max: 1
    }
  },

  test: {
    client: 'postgresql',
    connection: 'postgres://localhost/dialog-test',
    pool: {
      min: 1,
      max: 1
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 1,
      max: 1
    }
  }
};
