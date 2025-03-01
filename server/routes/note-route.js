const {
  getAllnotes,
  getNote,
  getPaginatedNote,
  searchNote,
  addNewNote,
  deleteNote,
  editNote,
} = require("../controllers/note-controller");
const { NoteSchema } = require("../utils/schema");
const { validateBody, validateParam } = require("../utils/validator");

const router = require("express").Router();

router.route("/").get(getAllnotes);
router.route("/search").get(searchNote);
router.route("/paginate/:pageNum").get(getPaginatedNote);

router.route("/add").post(validateBody(NoteSchema.addNewNote), addNewNote);
router.route("/edit").patch(validateBody(NoteSchema.editNote), editNote);

router
  .route("/:noteId")
  .get(validateParam(NoteSchema.params.noteId, "noteId"), getNote)
  .delete(validateParam(NoteSchema.params.noteId, "noteId"), deleteNote);
const noteRoute = router;

module.exports = {
  noteRoute,
};
