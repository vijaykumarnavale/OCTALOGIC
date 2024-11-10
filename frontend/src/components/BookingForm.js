import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchVehicleTypes, submitBooking } from '../api';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro';

const BookingForm = () => {
  const [value, setValue] = useState([null, null]); // To hold the selected date range
  const [step, setStep] = useState(0);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [wheels, setWheels] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({ model: '', vehicle_id: '', vehicle_name: '' });

  const handleNext = () => {
    if (step === 0 && (!first_name || !last_name || !mobile)) {
      alert('Please enter your full name and mobile number');
      return;
    }
    if (step === 1 && !wheels) {
      alert('Please select the number of wheels');
      return;
    }
    if (step === 2 && !vehicleType) {
      alert('Please select a vehicle type');
      return;
    }
    if (step === 3 && !selectedVehicle.vehicle_id) {
      alert('Please select a vehicle model');
      return;
    }
    if (step === 4 && (!value[0] || !value[1])) { // Checking if both start and end date are selected
      alert('Please select a date range');
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async () => {
    // Ensure the dates are properly formatted before sending them in the payload
    const startDate = dayjs(value[0]).format('YYYY-MM-DD'); // or any format your backend expects
    const endDate = dayjs(value[1]).format('YYYY-MM-DD');

    // Creating the payload
    const bookingData = {
      first_name,
      last_name,
      mobile,
      vehicle_id: selectedVehicle.vehicle_id,
      vehicle_name: selectedVehicle.vehicle_name,
      wheels,
      vehicle_type: vehicleType,
      model: selectedVehicle.model,
      start_date: startDate, // The start date formatted
      end_date: endDate,   // The end date formatted
    };

    console.log("Booking data to be submitted:", bookingData);
    await submitBooking(bookingData);
    alert('Booking submitted successfully!');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (wheels) {
        const data = await fetchVehicleTypes(wheels);
        setVehicleTypes(data.map((item) => item.vehicle_type));
        setModels(data.map((item) => ({ model: item.model, vehicle_id: item.vehicle_id, vehicle_name: item.vehicle_name })));
      }
    };
    fetchData();
  }, [wheels]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField label="First Name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
            <TextField label="Last Name" value={last_name} onChange={(e) => setLastName(e.target.value)} />
            <TextField label="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </>
        );
      case 1:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Number of Wheels</FormLabel>
            <RadioGroup row value={wheels} onChange={(e) => setWheels(e.target.value)}>
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
            </RadioGroup>
          </FormControl>
        );
      case 2:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Vehicle Type</FormLabel>
            <RadioGroup row value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
              {vehicleTypes.map((type, index) => (
                <FormControlLabel key={index} value={type} control={<Radio />} label={type} />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 3:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Specific Model</FormLabel>
            <RadioGroup
              row
              value={selectedVehicle.model}
              onChange={(e) => {
                const selected = models.find((model) => model.model === e.target.value);
                setSelectedVehicle(selected || { model: '', vehicle_id: '', vehicle_name: '' });
              }}
            >
              {models.map((modelObj, index) => (
                <FormControlLabel
                  key={index}
                  value={modelObj.model}
                  control={<Radio />}
                  label={modelObj.model}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 4:
        const handleChange = (newValue) => {
          setValue(newValue);
        };
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={value}
              onChange={handleChange}
              renderInput={(startDate, endDate) => (
                <>
                  <TextField {...startDate} />
                  <TextField {...endDate} />
                </>
              )}
            />
          </LocalizationProvider>
        );
      default:
        return null;
    }
  };

  return (
    <div className="booking-form">
      {renderStep()}
      {step < 4 ? (
        <Button variant="contained" onClick={handleNext}>Next</Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      )}
    </div>
  );
};

export default BookingForm;
