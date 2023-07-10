const express = require('express');
const router = express.Router();
const artistPhoneNumberController = require('../controllers/ArtistPhoneNumberController');

router.post('/api/artist-phone-numbers', artistPhoneNumberController.create);

router.get('/api/artist-phone-numbers', artistPhoneNumberController.findAll);

router.get('/api/artist-phone-numbers/:artistId/:phoneNumber?', artistPhoneNumberController.find);

router.put('/api/artist-phone-numbers/:artistId/:oldPhoneNumber', artistPhoneNumberController.update);

router.delete('/api/artist-phone-numbers/delete/:artistId/:phoneNumber', artistPhoneNumberController.delete);

router.delete('/api/artist-phone-numbers/delete/:artistId', artistPhoneNumberController.deleteAllWithId);

module.exports = router;
