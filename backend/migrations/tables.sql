-- Create vehicle types table
CREATE TABLE IF NOT EXISTS VehicleTypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    wheels INT NOT NULL
);

-- Create vehicles table
CREATE TABLE IF NOT EXISTS Vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_id INT,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (type_id) REFERENCES VehicleTypes(id)
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS Bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
cust_name VARCHAR(255) NOT NULL,
mobile INT NOT NULL,
wheels INT NOT NULL,
vehicle_type VARCHAR(255) NOT NULL,
model VARCHAR(255) NOT NULL,
vehicle_name VARCHAR(255) NOT NULL,
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `mobile` int(11) DEFAULT NULL,
  `wheels` int(11) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `vehicle_name` varchar(255) DEFAULT NULL,
  `start_date` varchar(256) DEFAULT NULL,
  `end_date` varchar(256) DEFAULT NULL
);



INSERT INTO `bookings` (`id`, `vehicle_id`, `first_name`, `last_name`, `mobile`, `wheels`, `vehicle_type`, `model`, `vehicle_name`, `start_date`, `end_date`) VALUES
(41, 33, 'rohit', 'bodhak', 8685685, 4, 'Sedan', '2024', 'Ford F-150', '2024-11-11', '2024-11-12');


CREATE TABLE `vehicle` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `vehicle_type` varchar(150) NOT NULL,
  `vehicle_name` varchar(150) NOT NULL,
  `wheels` int(11) NOT NULL,
  `model` varchar(150) NOT NULL
);



INSERT INTO `vehicle` (`id`, `vehicle_id`, `vehicle_type`, `vehicle_name`, `wheels`, `model`) VALUES
(1, 11, 'Hatchback', 'Tesla Model 3', 4, '2023'),
(2, 22, 'SUV', 'Harley Davidson Sportster', 4, '2022'),
(3, 33, 'Sedan', 'Ford F-150', 4, '2024'),
(4, 44, 'Cruiser', 'FZS', 2, '2024'),
(5, 55, 'Sports', 'R15', 2, '2024');


ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`);



ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;


ALTER TABLE `vehicle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;



    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id)
);
