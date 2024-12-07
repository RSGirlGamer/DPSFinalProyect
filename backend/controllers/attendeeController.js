const attendeeService = require('../services/attendeeService');

const attendeeController = {
    async addAttendee(req, res) {
        try {
            const attendee = await attendeeService.addAttendee(req.body);
            res.status(201).json({ message: 'Asistente agregado con éxito', attendee });
        } catch (error) {
            console.error('Error al agregar asistente:', error);
            res.status(500).json({ error: error.message });
        }
    },

    async getAttendeesByEvent(req, res) {
        try {
            const attendees = await attendeeService.getAttendeesByEvent(req.params.eventId);
            res.json(attendees);
        } catch (error) {
            console.error('Error al obtener asistentes:', error);
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = attendeeController;
