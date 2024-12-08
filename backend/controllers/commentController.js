const Comment = require("../models/Comment");

exports.getCommentsByEvent = async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { event_id: req.params.eventId } });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comentario no encontrado" });
    await comment.destroy();
    res.json({ message: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
