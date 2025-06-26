import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import JobPostingService from "src/services/JobPostingService";

export default class JobPostingController {
  static async createJobPosting(req: Request, res: Response) {
    try {
      const job = await JobPostingService.createJobPosting(req.body);
      res.status(201).json(job);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllJobPostings(_: Request, res: Response) {
    try {
      const jobs = await JobPostingService.getAllJobPostings();
      res.status(200).json(jobs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getJobPostingById(req: Request, res: Response) {
    try {
      const job = await JobPostingService.getJobPostingById(
        new ObjectId(req.params.id)
      );
      if (!job) return res.status(404).json({ error: "Job posting not found" });
      res.status(200).json(job);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateJobPosting(req: Request, res: Response) {
    try {
      const job = await JobPostingService.updateJobPosting(
        new ObjectId(req.params.id),
        req.body
      );
      if (!job) return res.status(404).json({ error: "Job posting not found" });
      res.status(200).json(job);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteJobPosting(req: Request, res: Response) {
    try {
      const deleted = await JobPostingService.deleteJobPosting(
        new ObjectId(req.params.id)
      );
      if (!deleted)
        return res.status(404).json({ error: "Job posting not found" });
      res.status(200).json({ message: "Job posting deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
