import { Router, Request, Response, NextFunction } from "express";
import JobPostingTagController from "@src/controllers/JobPostingTagController";

const router = Router();

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post(
  "/job_posting_tags",
  asyncHandler(JobPostingTagController.createJobPostingTag)
);
router.get(
  "/job_posting_tags",
  asyncHandler(JobPostingTagController.getAllJobPostingTags)
);
router.get(
  "/job_posting_tags/:id",
  asyncHandler(JobPostingTagController.getJobPostingTagById)
);
router.put(
  "/job_posting_tags/:id",
  asyncHandler(JobPostingTagController.updateJobPostingTag)
);
router.delete(
  "/job_posting_tags/:id",
  asyncHandler(JobPostingTagController.deleteJobPostingTag)
);

export default router;
