const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/api/tickets', ticketController.create);

router.post('/api/tickets/multiple', ticketController.createMultiple);

router.delete('/api/tickets/:ticketId', ticketController.delete);

router.delete('/api/tickets/exhibition/:exhibitionId', ticketController.deleteAllByExhibition);

router.put('/api/tickets/:ticketId', ticketController.update);

router.get('/api/tickets', ticketController.findAll);

router.get('/api/tickets/exhibition/:exhibitionId', ticketController.findAllByExhibition);

router.get('/api/tickets/visitor/:nationalCode', ticketController.findAllByVisitor);

router.get('/api/tickets/exhibition/:exhibitionId/null', ticketController.findAllByExhibitionWithoutVisitor);

module.exports = router;
