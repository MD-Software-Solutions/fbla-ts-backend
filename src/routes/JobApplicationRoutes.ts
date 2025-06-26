import { Router, Request, Response, NextFunction } from "express";
import JobApplicationController from "@src/controllers/JobApplicationController";

const router = Router();

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post(
  "/job_applications",
  asyncHandler(JobApplicationController.createJobApplication)
);
router.get(
  "/job_applications",
  asyncHandler(JobApplicationController.getAllJobApplications)
);
router.get(
  "/job_applications/:id",
  asyncHandler(JobApplicationController.getJobApplicationById)
);
router.put(
  "/job_applications/:id",
  asyncHandler(JobApplicationController.updateJobApplication)
);
router.delete(
  "/job_applications/:id",
  asyncHandler(JobApplicationController.deleteJobApplication)
);

export default router;
