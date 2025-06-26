import { Router, Request, Response, NextFunction } from "express";
import UserProjectController from "@src/controllers/UserProjectController";

const router = Router();

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post(
  "/user_projects",
  asyncHandler(UserProjectController.createUserProject)
);
router.get(
  "/user_projects",
  asyncHandler(UserProjectController.getAllUserProjects)
);
router.get(
  "/user_projects/:id",
  asyncHandler(UserProjectController.getUserProjectById)
);
router.put(
  "/user_projects/:id",
  asyncHandler(UserProjectController.updateUserProject)
);
router.delete(
  "/user_projects/:id",
  asyncHandler(UserProjectController.deleteUserProject)
);

export default router;
