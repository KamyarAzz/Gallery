module.exports = (sequelize, DataTypes) => {
  class ArtistPhoneNumber extends DataTypes.Model {}

  ArtistPhoneNumber.init({
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ArtistT',
        key: 'artistId'
      }
    },
    phoneNumber: {
      type: DataTypes.STRING(12),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'ArtistPhoneNumberT',
    timestamps: false,
    freezeTableName: true,
    underscored: false,
  });

  return ArtistPhoneNumber;
};
