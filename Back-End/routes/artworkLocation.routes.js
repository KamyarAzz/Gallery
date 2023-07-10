const express = require('express');
const router = express.Router();
const artworkLocationController = require('../controllers/ArtworkLocationController');

router.post('/api/artwork-locations', artworkLocationController.create);

router.get('/api/artwork-locations', artworkLocationController.findAll);

router.get('/api/artwork-locations/by-artwork/:artworkId', artworkLocationController.findAllByArtworkId);

router.get('/api/artwork-locations/:id/:date', artworkLocationController.findOne);

router.put('/api/artwork-locations/:id/:date', artworkLocationController.update);

router.delete('/api/artwork-locations/:id', artworkLocationController.deleteAllLocations);

module.exports = router;
