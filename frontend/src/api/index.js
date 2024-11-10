import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchVehicleTypes = async (wheels) => {
  const response = await axios.get(`${API_BASE_URL}/vehicles?wheels=${wheels}`);
  return response.data;
};

export const submitBooking = async (bookingData) => {
  const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
  return response.data;
};
