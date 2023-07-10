module.exports = (sequelize, DataTypes) => {
    class Worker extends DataTypes.Model {}
  
    Worker.init({
      workerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      firstname: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      address: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      position: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      employmentStatus: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      employmentDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      education: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      nationalId: {
        type: DataTypes.CHAR(10),
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'Worker',
      tableName: 'WorkerT',
      timestamps: false,
      underscored: false
    });
  
    return Worker;
  };
  