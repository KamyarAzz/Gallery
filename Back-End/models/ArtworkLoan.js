module.exports = (sequelize, DataTypes) => {
    class ArtworkLoan extends DataTypes.Model {}
  
    ArtworkLoan.init({
      artworkId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      partnershipId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      workerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      conditions: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'ArtworkLoan',
      tableName: 'ArtworkLoanT',
      timestamps: false,
      underscored: false
    });
  
    return ArtworkLoan;
  };
  