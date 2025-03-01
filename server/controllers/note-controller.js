const NoteDB = require("../models/note-model");
const { resMsg, Encoder, Token } = require("../utils/core");

const getPaginatedNote = async (req, res, next) => {
  try {
    const pageNum = Number(req.params.pageNum);
    if (!pageNum) {
      const error = new Error(`Page no. must be number!`);
      error.status = 400;
      return next(error);
    }
    if (pageNum <= 0) {
      const error = new Error(`Page Number must be greater than 0!`);
      error.status = 400;
      return next(error);
    }
    const limit = Number(process.env.PAGINATE_LIMIT);
    const reqPage = pageNum == 1 ? 0 : pageNum - 1;

    const skipCount = limit * reqPage;
    const totalUser = await NoteDB.countDocuments();
    const users = await NoteDB.find()
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(limit)
      .select("-password");
    resMsg(
      res,
      `${users.length} notes paginated of total ${totalUser} notes, max ${limit} notes per page`,
      users
    );
  } catch (err) {
    const error = new Error(err.message);
    error.status = 404;
    return next(error);
  }
};

const searchNote = async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { text: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const notes = await NoteDB.find(keyword)
    .find({ user: { $eq: req.user._id } })
    .select("-password");
  resMsg(res, "Search notes with keyword", notes);
};

const getAllnotes = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    const error = new Error("Need to login!");
    error.status = 401;
    return next(error);
  }
  const notes = await NoteDB.find({ user: { $eq: user._id } }).populate(
    "user",
    "-password"
  );
  resMsg(res, `${user.name}'s all notes`, notes);
};

const addNewNote = async (req, res, next) => {
  try {
    const { title, text } = req.body;
    const user = req.user;
    if (!user) {
      const error = new Error("Need to login!");
      error.status = 401;
      return next(error);
    }

    const note = await NoteDB.create({ title: title, text: text, user: user });
    resMsg(res, "New note added", note);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 404;
    return next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await NoteDB.findById(noteId).populate("user", "-password");

    if (!note) {
      const error = new Error("No found note with that id!");
      error.status = 404;
      return next(error);
    }

    resMsg(res, "Single note", note);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 404;
    return next(error);
  }
};

const editNote = async (req, res, next) => {
  try {
    const { noteId, title, text } = req.body;
    const dbNote = await NoteDB.findById(noteId);

    if (!dbNote) {
      const error = new Error("No found note with that id!");
      error.status = 404;
      return next(error);
    }

    const note = await NoteDB.findByIdAndUpdate(noteId);
    resMsg(res, "Edited note", note);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 404;
    return next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await NoteDB.findById(noteId);

    if (!note) {
      const error = new Error("No found note with that id!");
      error.status = 404;
      return next(error);
    }

    await NoteDB.findByIdAndDelete(noteId);
    resMsg(res, "Note Deleted");
  } catch (err) {
    const error = new Error(err.message);
    error.status = 404;
    return next(error);
  }
};

module.exports = {
  getPaginatedNote,
  searchNote,
  getAllnotes,
  getNote,
  addNewNote,
  deleteNote,
  editNote
};
