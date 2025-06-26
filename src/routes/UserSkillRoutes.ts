import { Router, Request, Response, NextFunction } from "express";
import UserSkillController from "@src/controllers/UserSkillController";
import { authenticateJWT } from "@src/controllers/auth";

const router = Router();

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post(
  "/user_skills",
  authenticateJWT,
  asyncHandler(UserSkillController.createUserSkill)
);
router.get(
  "/user_skills",
  authenticateJWT,
  asyncHandler(UserSkillController.getAllUserSkills)
);
router.get(
  "/user_skills/:id",
  authenticateJWT,
  asyncHandler(UserSkillController.getUserSkillById)
);
router.put(
  "/user_skills/:id",
  authenticateJWT,
  asyncHandler(UserSkillController.updateUserSkill)
);
router.delete(
  "/user_skills/:id",
  authenticateJWT,
  asyncHandler(UserSkillController.deleteUserSkill)
);

export default router;
