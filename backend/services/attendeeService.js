const Asistente = require('../models/Asistente');

const attendeeService = {
    async addAttendee(data) {
        return await Asistente.create(data);
    },

    async getAttendeesByEvent(eventId) {
        return await Asistente.findAll({
            where: { id_evento: eventId },
        });
    },
};

module.exports = attendeeService;
