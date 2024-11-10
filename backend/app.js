const express = require('express');
const app = express();
const cors= require('cors');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', vehicleRoutes);
app.use('/api', bookingRoutes);

module.exports = app;
