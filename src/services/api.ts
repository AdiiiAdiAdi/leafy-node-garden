
import axios from 'axios';

const API_BASE_URL = 'http://localhost/api';

export const apiService = {
  async getPlants() {
    try {
      const response = await axios.get(`${API_BASE_URL}/plants.php`);
      return response.data;
    } catch (error) {
      console.error('Error fetching plants:', error);
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login.php`, {
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async createOrder(orderData: any) {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders/create.php`, orderData);
      return response.data;
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  }
};
