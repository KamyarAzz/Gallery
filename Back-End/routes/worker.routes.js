const express = require('express');
const router = express.Router();
const workerController = require('../controllers/WorkerController');

router.post('/api/workers', workerController.create);

router.get('/api/workers', workerController.findAll);

router.get('/api/workers/:id', workerController.findOne);

router.put('/api/workers/:id', workerController.update);

router.delete('/api/workers/:id', workerController.delete);

module.exports = router;
