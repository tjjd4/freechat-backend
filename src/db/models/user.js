import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // foreign key being defined in the target model
      User.hasMany(models.FriendPair);
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      is_deleted: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      tableName: 'Users',
    }
  );

  return User;
};
