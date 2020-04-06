const Sequelize = require('sequelize');
const { Model } = require('sequelize');

const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        // in the first parameter of the hash I put what I will encrypt
        // in the second, the strength of the encryption
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    // compares the password passed by the user with the password_hash
    // return true or false
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;
