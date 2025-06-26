import { Router, Request, Response, NextFunction } from "express";
import UserAchievementController from "@src/controllers/UserAchievementController";

const router = Router();

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post(
  "/user_achievements",
  asyncHandler(UserAchievementController.createUserAchievement)
);
router.get(
  "/user_achievements",
  asyncHandler(UserAchievementController.getAllUserAchievements)
);
router.get(
  "/user_achievements/:id",
  asyncHandler(UserAchievementController.getUserAchievementById)
);
router.put(
  "/user_achievements/:id",
  asyncHandler(UserAchievementController.updateUserAchievement)
);
router.delete(
  "/user_achievements/:id",
  asyncHandler(UserAchievementController.deleteUserAchievement)
);

export default router;
