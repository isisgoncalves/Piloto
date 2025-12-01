import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptador para adicionar token automaticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptador para tratar respostas e erros de autenticação
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Não redirecionar automaticamente, deixar que cada componente trate o erro
        // de acordo com seu contexto específico
        return Promise.reject(error);
    }
);

export default api;

export const EventService = {
    async createEvent(eventData) {
        // Formatar dados para o backend
        const formattedData = {
            title: eventData.title.trim(),
            description: eventData.description.trim(),
            start_date: new Date(eventData.start_date).toISOString(),
            end_date: new Date(eventData.end_date).toISOString(),
            location: eventData.location.trim()
        };
        console.log('Enviando dados para o backend:', formattedData);
        const response = await api.post('/events/', formattedData);
        return response.data;
    },

    async getEvents(filters = {}) {
        try {
            const { title, startDate, endDate, location } = filters;
            const params = {};
            
            if (title && title.trim()) params.title = title.trim();
            if (startDate) params.start_date = startDate;
            if (endDate) params.end_date = endDate;
            if (location && location.trim()) params.location = location.trim();
            
            console.log('Fazendo requisição para eventos com filtros:', params);
            const response = await api.get('/events/', { params });
            console.log('Resposta recebida:', response.data);
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error('Erro ao buscar eventos:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                url: error.config?.url
            });
            throw error; // Propagar erro para tratamento no componente
        }
    },

    async getEvent(id) {
        const response = await api.get(`/events/${id}`);
        return response.data;
    },

    async updateEvent(id, eventData) {
        const formattedData = {
            title: eventData.title.trim(),
            description: eventData.description.trim(),
            start_date: eventData.start_date,
            end_date: eventData.end_date,
            location: eventData.location.trim()
        };
        const response = await api.put(`/events/${id}`, formattedData);
        return response.data;
    },

    async deleteEvent(id) {
        const response = await api.delete(`/events/${id}`);
        return response.data;
    }
};

export const AuthService = {
    async login(credentials) {
        try {
            console.log('Tentando login com:', credentials);
            
            // FastAPI OAuth2PasswordRequestForm expects form data
            const formData = new URLSearchParams();
            formData.append('username', credentials.email); // OAuth2 usa 'username' mas enviamos o email
            formData.append('password', credentials.password);
            
            const response = await api.post('/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log('Login bem-sucedido:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro no login:', error.response || error);
            throw error;
        }
    },

    async register(userData) {
        try {
            console.log('Tentando registrar:', userData);
            const response = await api.post('/auth/register', userData);
            console.log('Registro bem-sucedido:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro no registro:', error.response || error);
            throw error;
        }
    }
};