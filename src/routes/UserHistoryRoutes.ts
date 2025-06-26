import { Router, Request, Response, NextFunction } from "express";
import UserHistoryController from "@src/controllers/UserHistoryController";

const router = Router();

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post(
  "/user_history",
  asyncHandler(UserHistoryController.createUserHistory)
);
router.get(
  "/user_history",
  asyncHandler(UserHistoryController.getAllUserHistory)
);
router.get(
  "/user_history/:id",
  asyncHandler(UserHistoryController.getUserHistoryById)
);
router.put(
  "/user_history/:id",
  asyncHandler(UserHistoryController.updateUserHistory)
);
router.delete(
  "/user_history/:id",
  asyncHandler(UserHistoryController.deleteUserHistory)
);

export default router;
