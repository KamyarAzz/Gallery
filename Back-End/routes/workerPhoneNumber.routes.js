const express = require('express');
const router = express.Router();
const workerPhoneNumberController = require('../controllers/WorkerPhoneNumberController');

router.post('/api/workerPhoneNumbers', workerPhoneNumberController.create);

router.get('/api/workerPhoneNumbers', workerPhoneNumberController.findAll);

router.get('/api/workerPhoneNumbers/:id', workerPhoneNumberController.findOne);

router.put('/api/workerPhoneNumbers/:workerId/:phoneNumber', workerPhoneNumberController.update);

router.delete('/api/workerPhoneNumbers/:workerId/:phoneNumber', workerPhoneNumberController.delete);

router.delete('/api/workerPhoneNumbers/worker/:id', workerPhoneNumberController.deleteAll);

module.exports = router;
