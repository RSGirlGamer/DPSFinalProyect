const eventService = require('../services/eventService');

const eventController = {
    async createEvent(req, res) {
        try {
            const event = await eventService.createEvent(req.body);
            res.status(201).json({ message: 'Evento creado con éxito', event });
        } catch (error) {
            console.error('Error al crear evento:', error);
            res.status(500).json({ error: error.message });
        }
    },

    async getAllEvents(req, res) {
        try {
            const events = await eventService.getAllEvents();
            res.json(events);
        } catch (error) {
            console.error('Error al obtener eventos:', error);
            res.status(500).json({ error: error.message });
        }
    },

    async getEventById(req, res) {
        try {
            const event = await eventService.getEventById(req.params.id);
            if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
            res.json(event);
        } catch (error) {
            console.error('Error al obtener evento:', error);
            res.status(500).json({ error: error.message });
        }
    },

    async updateEvent(req, res) {
        try {
            const event = await eventService.updateEvent(req.params.id, req.body);
            res.json({ message: 'Evento actualizado con éxito', event });
        } catch (error) {
            console.error('Error al actualizar evento:', error);
            res.status(500).json({ error: error.message });
        }
    },

    async deleteEvent(req, res) {
        try {
            await eventService.deleteEvent(req.params.id);
            res.json({ message: 'Evento eliminado con éxito' });
        } catch (error) {
            console.error('Error al eliminar evento:', error);
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = eventController;
