const express = require('express');
const router = express.Router();
const workerEmergencyPhoneNumberController = require('../controllers/WorkerEmergencyPhoneNumberController');

router.post('/api/workerEmergencyPhoneNumbers', workerEmergencyPhoneNumberController.create);

router.get('/api/workerEmergencyPhoneNumbers', workerEmergencyPhoneNumberController.findAll);

router.get('/api/workerEmergencyPhoneNumbers/:workerId', workerEmergencyPhoneNumberController.findOne);

router.put('/api/workerEmergencyPhoneNumbers/:workerId/:phoneNumber', workerEmergencyPhoneNumberController.update);

router.delete('/api/workerEmergencyPhoneNumbers/:workerId/:phoneNumber', workerEmergencyPhoneNumberController.delete);

router.delete('/api/workerEmergencyPhoneNumbers/deleteAll/:workerId', workerEmergencyPhoneNumberController.deleteAllForWorker);

module.exports = router;
