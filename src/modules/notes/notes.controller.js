import { Router } from "express";
import * as noteService from "./notes.service.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/", auth, async (req, res, next) => {
  try {
    const result = await noteService.createNoteService(
      req.user.userId,
      req.body,
    );
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

router.get("/", auth, async (req, res, next) => {
  try {
    const result = await noteService.getAllNotesService(
      req.user.userId,
      req.query,
    );
    return res.status(result.status).json(result.notes);
  } catch (error) {
    next(error);
  }
});

router.patch("/all", auth, async (req, res, next) => {
  try {
    const result = await noteService.updateAllNotesTitleService(
      req.user.userId,
      req.body.title,
    );
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

router.patch("/:noteId", auth, async (req, res, next) => {
  try {
    const result = await noteService.updateNoteService(
      req.params.noteId,
      req.user.userId,
      req.body,
    );
    return res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/replace/:noteId", auth, async (req, res, next) => {
  try {
    const result = await noteService.replaceNoteService(
      req.params.noteId,
      req.user.userId,
      req.body,
    );
    return res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:noteId", auth, async (req, res, next) => {
  try {
    const result = await noteService.deleteNoteService(
      req.params.noteId,
      req.user.userId,
    );
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

router.delete("/:noteId", auth, async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const result = await noteService.deleteNoteService(noteId, req.user.userId);

    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

// URL: GET /notes?page=1&size=2&searchKey=meeting
router.get("/", auth, async (req, res, next) => {
  try {
    const result = await noteService.getAllNotesService(
      req.user.userId,
      req.query,
    );
    return res.status(result.status).json(result.notes);
  } catch (error) {
    next(error);
  }
});

router.get("/note-by-content", auth, async (req, res, next) => {
  try {
    const result = await noteService.getNoteByContentService(
      req.user.userId,
      req.query.content,
    );
    return res
      .status(result.status)
      .json(result.note || { message: result.message });
  } catch (error) {
    next(error);
  }
});

router.get("/note-with-user", auth, async (req, res, next) => {
  try {
    const result = await noteService.getNotesWithUserService(req.user.userId);
    return res.status(result.status).json(result.notes);
  } catch (error) {
    next(error);
  }
});

router.get("/aggregate", auth, async (req, res, next) => {
  try {
    const result = await noteService.aggregateNotesService(
      req.user.userId,
      req.query.title,
    );
    return res.status(result.status).json(result.notes);
  } catch (error) {
    next(error);
  }
});

router.delete("/", auth, async (req, res, next) => {
  try {
    const result = await noteService.deleteAllNotesService(req.user.userId);
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    const result = await noteService.getNoteByIdService(
      req.params.id,
      req.user.userId,
    );
    return res
      .status(result.status)
      .json(result.note || { message: result.message });
  } catch (error) {
    next(error);
  }
});

export default router;
