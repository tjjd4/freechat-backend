'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class FriendPair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FriendPair.belongsTo(models.User);
    }
  }
  FriendPair.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // table name
        key: 'id', // column name
     }
    },
    friend_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    validate: {
      sameUserId() {
        if (this.user_id === this.friend_id) {
          throw new Error('Same user id!');
        }
      },
    },
    modelName: 'FriendPair',
    underscored: true,
    tableName: 'FriendList',
  });
  return FriendPair;
};