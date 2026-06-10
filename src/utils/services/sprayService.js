// src/services/sprayService.js
import api from '../apis';

const sprayService = {
    // Get all sprays (with optional filters)
    getSprays: async (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        const response = await api.get(`/dronespray/sprays/${params ? `?${params}` : ''}`);
        return response.data;
    },
    
    // Get single spray by ID
    getSpray: async (id) => {
        const response = await api.get(`/dronespray/sprays/${id}/`);
        return response.data;
    },
    
    // Create new spray
    createSpray: async (sprayData) => {
        const response = await api.post('/dronespray/sprays/', sprayData);
        return response.data;
    },
    
    // Update spray
    updateSpray: async (id, sprayData) => {
        const response = await api.put(`/dronespray/sprays/${id}/`, sprayData);
        return response.data;
    },
    
    // Delete spray
    deleteSpray: async (id) => {
        const response = await api.delete(`/dronespray/sprays/${id}/`);
        return response.data;
    },
    
    // Mark spray as complete
    completeSpray: async (id, completionData = {}) => {
        const response = await api.post(`/dronespray/sprays/${id}/complete/`, completionData);
        return response.data;
    },
    
    // Get calendar events
    getCalendarEvents: async (startDate, endDate) => {
        const response = await api.get(`/dronespray/sprays/calendar/?start=${startDate}&end=${endDate}`);
        return response.data;
    },
    
    // Get upcoming sprays
    getUpcomingSprays: async (days = 7) => {
        const response = await api.get(`/dronespray/sprays/upcoming/?days=${days}`);
        return response.data;
    }
};

export default sprayService;