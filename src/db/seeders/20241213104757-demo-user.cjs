'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'sss',
        name: 'terry',
        password: 'sss',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'aaa',
        name: 'apple',
        password: 'aaa',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'bbb',
        name: 'terry',
        password: 'bbb',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'ccc',
        name: 'apple',
        password: 'ccc',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
