import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api'
});

export const EventService = {
    async createEvent(eventData) {
        const response = await api.post('/events/', eventData);
        return response.data;
    },

    async getEvents() {
        const response = await api.get('/events/');
        return response.data;
    },

    async getEvent(id) {
        const response = await api.get(`/events/${id}`);
        return response.data;
    }
};