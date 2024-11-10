const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.get('/vehicles', vehicleController.getVehiclesByWheels);

module.exports = router;
