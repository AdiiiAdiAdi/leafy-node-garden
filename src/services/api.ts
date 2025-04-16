
const API_BASE_URL = 'http://localhost/api';

export const apiService = {
  async getPlants() {
    try {
      const response = await fetch(`${API_BASE_URL}/plants.php`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching plants:', error);
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async createOrder(orderData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/create.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error('Order creation failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  }
};
