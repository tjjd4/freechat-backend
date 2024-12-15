'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FriendList', [
      {
        user_id: 1,
        friend_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        friend_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        friend_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        friend_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FriendList', null, {});
  }
};
