import { Router, Request, Response, NextFunction } from "express";
import JobPostingController from "@src/controllers/JobPostingController";

const router = Router();

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post(
  "/job_postings",
  asyncHandler(JobPostingController.createJobPosting)
);
router.get(
  "/job_postings",
  asyncHandler(JobPostingController.getAllJobPostings)
);
router.get(
  "/job_postings/:id",
  asyncHandler(JobPostingController.getJobPostingById)
);
router.put(
  "/job_postings/:id",
  asyncHandler(JobPostingController.updateJobPosting)
);
router.delete(
  "/job_postings/:id",
  asyncHandler(JobPostingController.deleteJobPosting)
);

export default router;
