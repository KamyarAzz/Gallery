module.exports = (sequelize, DataTypes) => {
    class WorkerEmergencyPhoneNumber extends DataTypes.Model {}
  
    WorkerEmergencyPhoneNumber.init({
      workerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'WorkerT',
          key: 'workerId',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      phoneNumber: {
        type: DataTypes.STRING(12),
        primaryKey: true,
        allowNull: false,
      },relation: {
        type: DataTypes.STRING(45),
        allowNull: true,
      }
    }, {
      sequelize,
      modelName: 'WorkerEmergencyPhoneNumber',
      tableName: 'WorkerEmergencyPhoneNumberT',
      timestamps: false,
      underscored: false
    });
  
    return WorkerEmergencyPhoneNumber;
  };
  