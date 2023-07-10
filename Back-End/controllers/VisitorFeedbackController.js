const { Op } = require('sequelize');
const db = require('../models');
const VisitorFeedback = db.VisitorFeedback;
const Ticket = db.Ticket;

exports.create = async (req, res) => {
    const newFeedback = req.body;
    try {
        const feedback = await VisitorFeedback.create(newFeedback);
        res.status(201).send(feedback);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await VisitorFeedback.destroy({ where: { feedbackId: id } });
        res.status(200).send({ message: 'Feedback was deleted successfully!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const feedback = await VisitorFeedback.findByPk(id);
        res.status(200).send(feedback);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const feedbacks = await VisitorFeedback.findAll();
        res.status(200).send(feedbacks);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.findAllByTicket = async (req, res) => {
    const ticketId = req.params.ticketId;
    try {
        const feedbacks = await VisitorFeedback.findAll({ where: { ticketId } });
        res.status(200).send(feedbacks);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.averageScoreByExhibition = async (req, res) => {
    const exhibitionId = req.params.exhibitionId;
    try {
        const feedbacks = await VisitorFeedback.findAll({
            include: [{
                model: Ticket,
                where: { exhibitionId },
                attributes: []
            }],
            attributes: [[db.sequelize.fn('AVG', db.sequelize.col('score')), 'averageScore']]
        });
        res.status(200).send(feedbacks);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = exports;