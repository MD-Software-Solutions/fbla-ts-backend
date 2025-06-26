import { Router, Request, Response, NextFunction } from "express";
import JobTagController from "@src/controllers/JobTagController";

const router = Router();

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post("/job_tags", asyncHandler(JobTagController.createJobTag));
// Advanced filtering supported via query params
router.get("/job_tags", asyncHandler(JobTagController.getAllJobTags));
router.get("/job_tags/:id", asyncHandler(JobTagController.getJobTagById));
router.put("/job_tags/:id", asyncHandler(JobTagController.updateJobTag));
router.delete("/job_tags/:id", asyncHandler(JobTagController.deleteJobTag));

export default router;
