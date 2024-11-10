const db = require('../config/db');

exports.createBooking = async (req, res) => {
    const { first_name, last_name, mobile, wheels, vehicle_type, model, vehicle_name, vehicle_id, start_date, end_date } = req.body;

    try {
        // Check for overlapping bookings
        const [overlaps] = await db.query(`
      SELECT * FROM bookings 
      WHERE vehicle_id = ? 
      AND (start_date BETWEEN ? AND ? OR end_date BETWEEN ? AND ?)
    `, [vehicle_id, start_date, end_date, start_date, end_date]);

        if (overlaps.length > 0) {
            return res.status(400).json({ message: 'This vehicle is already booked for the selected dates.' });
        }

        // Insert new booking
        await db.query(`
      INSERT INTO bookings (first_name,last_name,mobile,wheels,vehicle_type,model,vehicle_name,vehicle_id, start_date, end_date) 
      VALUES (?, ?, ?,?,?,?,?,?,?,?)
    `, [first_name, last_name, mobile, wheels, vehicle_type, model, vehicle_name, vehicle_id, start_date, end_date]);

        res.status(201).json({ message: 'Booking created successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
