const express = require('express');
const router = express.Router();
const visitorFeedbackController = require('../controllers/VisitorFeedbackController');

router.post('/api/visitorFeedbacks', visitorFeedbackController.create);

router.get('/api/visitorFeedbacks', visitorFeedbackController.findAll);

router.get('/api/visitorFeedbacks/:id', visitorFeedbackController.findOne);

router.delete('/api/visitorFeedbacks/:id', visitorFeedbackController.delete);

router.get('/api/visitorFeedbacks/tickets/:ticketId', visitorFeedbackController.findAllByTicket);

router.get('/api/visitorFeedbacks/exhibitions/:exhibitionId/averageScore', visitorFeedbackController.averageScoreByExhibition);

module.exports = router;
