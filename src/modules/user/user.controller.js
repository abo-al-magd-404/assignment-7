import { Router } from "express";
import * as userService from "./user.service.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", async (req, res, next) => {
  try {
    const result = await userService.signupService(req.body);
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await userService.loginService(req.body);
    if (result.token) {
      return res
        .status(result.status)
        .json({ message: result.message, token: result.token });
    }
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

router.patch("/", auth, async (req, res, next) => {
  try {
    const result = await userService.updateUserService(
      req.user.userId,
      req.body,
    );
    return res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/", auth, async (req, res, next) => {
  try {
    const result = await userService.deleteUserService(req.user.userId);
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

router.get("/", auth, async (req, res, next) => {
  try {
    const result = await userService.getUserDataService(req.user.userId);
    if (result.user) {
      return res.status(result.status).json(result.user);
    }
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

export default router;
