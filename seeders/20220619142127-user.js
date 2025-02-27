'use strict';

const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync("Developer@123", 10);

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'developer1',
      email: 'developer1@yopmail.com',
      password: hash,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
