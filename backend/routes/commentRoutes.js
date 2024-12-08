const express = require("express");
const router = express.Router();
const { getCommentsByEvent, createComment, deleteComment } = require("../controllers/commentController");

router.get("/event/:eventId", getCommentsByEvent);
router.post("/", createComment);
router.delete("/:id", deleteComment);

module.exports = router;
