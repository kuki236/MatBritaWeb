import axios from 'axios';

// Configuración base para conectarse al backend
const api = axios.create({
  // Cambia el puerto si tu backend corre en uno distinto (ej. 8080, 3000)
  baseURL: 'http://127.0.0.1:8000/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

// Opcional: Interceptor para agregar el token JWT en futuras peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;