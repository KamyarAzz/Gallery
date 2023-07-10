const express = require('express');
const router = express.Router();
const artworkMaterialController = require('../controllers/ArtworkMaterialController');

router.post('/api/artwork-materials', artworkMaterialController.create);

router.get('/api/artwork-materials', artworkMaterialController.findAll);

router.get('/api/artwork-materials/by-artwork/:id', artworkMaterialController.findAllByArtworkId);

router.put('/api/artwork-materials/:id/:material', artworkMaterialController.update);

router.delete('/api/artwork-materials/:id', artworkMaterialController.deleteAllMaterials);

module.exports = router;
