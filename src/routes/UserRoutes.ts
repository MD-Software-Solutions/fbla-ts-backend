import { Router, Request, Response, NextFunction } from "express";
import UserController from "@src/controllers/UserController";

const router = Router();

// Helper to wrap async controller methods and forward errors
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post("/users", asyncHandler(UserController.createUser));
router.get("/users", asyncHandler(UserController.getAllUsers));
router.get("/users/:id", asyncHandler(UserController.getUserById));
router.put("/users/:id", asyncHandler(UserController.updateUser));
router.delete("/users/:id", asyncHandler(UserController.deleteUser));

export default router;
