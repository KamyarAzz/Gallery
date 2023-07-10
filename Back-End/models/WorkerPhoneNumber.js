module.exports = (sequelize, DataTypes) => {
    class WorkerPhoneNumber extends DataTypes.Model {}
  
    WorkerPhoneNumber.init({
      workerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'WorkerT', 
          key: 'workerId'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      phoneNumber: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'WorkerPhoneNumber',
      tableName: 'WorkerPhoneNumberT',
      timestamps: false,
      underscored: false
    });
  
    return WorkerPhoneNumber;
  };
  