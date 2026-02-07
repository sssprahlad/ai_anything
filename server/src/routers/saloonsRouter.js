const express = require('express');
const router = express.Router();
const saloonController = require('../controller/saloonController');

router.get("/saloons", saloonController.getAllSaloons);
router.get("/saloons/:id", saloonController.getSaloonsById);
router.post("/saloons", saloonController.createSaloon);
router.put("/saloons/:id", saloonController.updateSaloon);
router.delete("/saloons/:id", saloonController.deleteSaloon);

module.exports = router;