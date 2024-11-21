const API_URL = 'http://localhost:5000';

export const api = {
  // Exemplo de funções de requisição
  async login(credentials) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  async getUser(id) {
    const response = await fetch(`${API_URL}/users/${id}`);
    return response.json();
  },

  // Adicione mais funções conforme necessário
};

export default api;