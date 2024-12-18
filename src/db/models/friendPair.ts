'use strict';
import { Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, DataTypes } from 'sequelize';
import { sequelize } from '.';

class FriendPair extends Model<InferAttributes<FriendPair>, InferCreationAttributes<FriendPair>> {
  declare id: CreationOptional<number>;
  declare user_id: ForeignKey<number>;
  declare friend_id: ForeignKey<number>;
};

FriendPair.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, 
  {
    sequelize,
    validate: {
      sameUserId() {
        if (this.user_id === this.friend_id) {
          throw new Error('Same user id!');
        }
      },
    },
    modelName: 'FriendPair',
    tableName: 'FriendList',
    underscored: true,
  }
);

export default FriendPair;