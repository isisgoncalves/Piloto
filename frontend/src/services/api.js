import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const EventService = {
    async createEvent(eventData) {
        const response = await api.post('/events/', eventData);
        return response.data;
    },

    async getEvents(filters = {}) {
        try {
            const { title, startDate, endDate, location } = filters;
            const params = new URLSearchParams();
            
            if (title) params.append('title', title);
            if (startDate) params.append('start_date', startDate);
            if (endDate) params.append('end_date', endDate);
            if (location) params.append('location', location);
            
            console.log('Fazendo requisição para:', '/events/', { params: params.toString() });
            const response = await api.get('/events/', { params });
            console.log('Resposta recebida:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar eventos:', error.response || error);
            throw error;
        }
    },

    async getEvent(id) {
        const response = await api.get(`/events/${id}`);
        return response.data;
    }
};