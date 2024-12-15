'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'sss',
        name: 'terry',
        password: 'sss',
        role_id: 1,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'aaa',
        name: 'apple',
        password: 'aaa',
        role_id: 1,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'bbb',
        name: 'terry',
        password: 'bbb',
        role_id: 1,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'ccc',
        name: 'apple',
        password: 'ccc',
        role_id: 1,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
