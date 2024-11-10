const db = require('../config/db');

exports.getVehiclesByWheels = async (req, res) => {
    const { wheels } = req.query;

    try {
        const [rows] = await db.query(`
      SELECT *
      FROM vehicle
      WHERE wheels = ?
    `, [wheels]);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
