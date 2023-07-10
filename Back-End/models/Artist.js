module.exports = (sequelize, DataTypes) => {
    class Artist extends DataTypes.Model {}
  
    Artist.init({
      artistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      firstname: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      biography: {
        type: DataTypes.STRING(1500),
        allowNull: true
      },
      commisionPercentage: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: true
      },
      artsSold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      country: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      city: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      address: {
        type: DataTypes.STRING(200),
        allowNull: true
      }
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: false,
      modelName: 'ArtistT'
    });
  
    return Artist;
};
