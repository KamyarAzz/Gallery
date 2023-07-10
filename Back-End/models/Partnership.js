module.exports = (sequelize, Sequelize) => {
    const Partnership = sequelize.define('partnership', {
        partnershipId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        type: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        contactPerson: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        phoneNumber: {
            type: Sequelize.CHAR(12),
            allowNull: true
        },
        address: {
            type: Sequelize.STRING(100),
            allowNull: true
        }
    }, {
        tableName: 'PartnershipT',
        timestamps: false
    });

    return Partnership;
};
