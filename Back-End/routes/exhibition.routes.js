const express = require('express');
const router = express.Router();
const exhibitionController = require('../controllers/ExhibitionController');

router.post('/api/exhibitions', exhibitionController.create);

router.get('/api/exhibitions', exhibitionController.findAll);

router.get('/api/exhibitions/worker/:workerId', exhibitionController.findByWorker);

router.post('/api/exhibitions/:exhibitionId/price', exhibitionController.setPriceForUnsoldTickets);

router.get('/api/exhibitions/:id', exhibitionController.findOne);

router.put('/api/exhibitions/:id', exhibitionController.update);

router.delete('/api/exhibitions/:id', exhibitionController.delete);

module.exports = router;
