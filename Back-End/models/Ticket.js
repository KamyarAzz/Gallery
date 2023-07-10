module.exports = (sequelize, DataTypes) => {
    class Ticket extends DataTypes.Model {}

    Ticket.init({
        ticketId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        exhibitionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nationalCode: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        purchaseDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Ticket',
        tableName: 'TicketT',
        timestamps: false,
        underscored: false
    });

    return Ticket;
};
