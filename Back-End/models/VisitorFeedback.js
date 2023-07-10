module.exports = (sequelize, DataTypes) => {
    class VisitorFeedback extends DataTypes.Model {}

    VisitorFeedback.init({
        feedbackId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ticketId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Ticket',
                key: 'ticketId'
            }
        },
        text: {
            type: DataTypes.STRING(2048),
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        score: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'VisitorFeedback',
        tableName: 'VisitorFeedbackT',
        timestamps: false,
        underscored: false
    });

    return VisitorFeedback;
};
