const express = require('express');
const router = express.Router();
const artworkPriceController = require('../controllers/ArtworkPriceController');

router.post('/api/artwork-prices', artworkPriceController.create);

router.get('/api/artwork-prices', artworkPriceController.findAll);

router.get('/api/artwork-prices/:id', artworkPriceController.findAllByArtworkId);

router.put('/api/artwork-prices/:id/:date', artworkPriceController.update);

router.delete('/api/artwork-prices/:id', artworkPriceController.deleteAllPrices);

module.exports = router;
