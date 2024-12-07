const Evento = require('../models/Evento');

const eventService = {
    async createEvent(data) {
        return await Evento.create(data);
    },

    async getAllEvents() {
        return await Evento.findAll();
    },

    async getEventById(id) {
        return await Evento.findByPk(id);
    },

    async updateEvent(id, data) {
        const event = await Evento.findByPk(id);
        if (!event) throw new Error('Evento no encontrado');
        return await event.update(data);
    },

    async deleteEvent(id) {
        const event = await Evento.findByPk(id);
        if (!event) throw new Error('Evento no encontrado');
        return await event.destroy();
    },
};

module.exports = eventService;
