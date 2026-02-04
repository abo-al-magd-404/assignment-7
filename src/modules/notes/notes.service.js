import mongoose from "mongoose";
import { NoteModel } from "../../DB/model/note.model.js";

export const createNoteService = async (userId, data) => {
  const { title, content } = data;

  const note = new NoteModel({
    title,
    content,
    userId,
  });

  await note.save();
  return { status: 201, message: "Note created" };
};

export const updateNoteService = async (noteId, userId, data) => {
  const { title, content } = data;

  const note = await NoteModel.findById(noteId);
  if (!note) return { status: 404, message: "Note not found" };

  if (note.userId.toString() !== userId) {
    return { status: 403, message: "You are not the owner" };
  }

  const updatedNote = await NoteModel.findByIdAndUpdate(
    noteId,
    { title, content },
    { new: true, runValidators: true },
  );

  return { status: 200, message: "updated", note: updatedNote };
};

export const replaceNoteService = async (noteId, userId, data) => {
  const { title, content } = data;

  const note = await NoteModel.findById(noteId);
  if (!note) return { status: 404, message: "Note not found" };

  if (note.userId.toString() !== userId) {
    return { status: 403, message: "You are not the owner" };
  }

  const replacedNote = await NoteModel.findOneAndReplace(
    { _id: noteId },
    { title, content, userId },
    { new: true, runValidators: true },
  );

  return { status: 200, note: replacedNote };
};

export const updateAllNotesTitleService = async (userId, title) => {
  const result = await NoteModel.updateMany(
    { userId },
    { title },
    { runValidators: true },
  );

  if (result.matchedCount === 0) {
    return { status: 404, message: "No note found" };
  }

  return { status: 200, message: "All notes updated" };
};

// 5. Delete Note Service
export const deleteNoteService = async (noteId, userId) => {
  const note = await NoteModel.findOneAndDelete({ _id: noteId, userId });

  if (!note) {
    return {
      status: 404,
      message: "Note not found or you are not authorized to delete this note",
    };
  }

  return { status: 200, message: "Note deleted successfully" };
};

export const getAllNotesService = async (userId, query) => {
  let { page, size, searchKey } = query;

  page = parseInt(page) || 1;
  size = parseInt(size) || 5;
  const skip = (page - 1) * size;

  const filter = { userId };
  if (searchKey) {
    filter.title = { $regex: searchKey, $options: "i" };
  }

  const notes = await NoteModel.find(filter).limit(size).skip(skip);

  return { status: 200, notes };
};

export const getNoteByIdService = async (noteId, userId) => {
  const note = await NoteModel.findOne({ _id: noteId, userId });
  if (!note)
    return { status: 404, message: "Note not found or you are not the owner" };
  return { status: 200, note };
};

export const getNoteByContentService = async (userId, content) => {
  const note = await NoteModel.findOne({
    userId,
    content: { $regex: content, $options: "i" },
  });
  if (!note) return { status: 404, message: "No note found" };
  return { status: 200, note };
};

export const getNotesWithUserService = async (userId) => {
  const notes = await NoteModel.find({ userId })
    .populate("userId", "email -_id")
    .select("title userId createdAt");
  return { status: 200, notes };
};

export const aggregateNotesService = async (userId, title) => {
  const pipeline = [
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
  ];

  if (title) {
    pipeline.push({ $match: { title: { $regex: title, $options: "i" } } });
  }

  pipeline.push(
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        title: 1,
        userId: 1,
        createdAt: 1,
        "user.name": 1,
        "user.email": 1,
      },
    },
  );

  const notes = await NoteModel.aggregate(pipeline);
  return { status: 200, notes };
};

export const deleteAllNotesService = async (userId) => {
  await NoteModel.deleteMany({ userId });
  return { status: 200, message: "Deleted" };
};
