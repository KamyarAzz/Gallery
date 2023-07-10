module.exports = (sequelize, DataTypes) => {
    class Visitor extends DataTypes.Model {}

    Visitor.init({
        nationalCode: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING(12),
            allowNull: false
        },
        newsLetterStatus: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        newsLetterExpirationDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Visitor',
        tableName: 'VisitorT',
        timestamps: false,
        underscored: false
    });

    return Visitor;
};
