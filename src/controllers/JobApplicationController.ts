import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import JobApplicationService from "@src/services/JobApplicationService";

export default class JobApplicationController {
  static async createJobApplication(req: Request, res: Response) {
    try {
      const application = await JobApplicationService.createJobApplication(
        req.body
      );
      res.status(201).json(application);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllJobApplications(_: Request, res: Response) {
    try {
      const applications = await JobApplicationService.getAllJobApplications();
      res.status(200).json(applications);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getJobApplicationById(req: Request, res: Response) {
    try {
      const application = await JobApplicationService.getJobApplicationById(
        new ObjectId(req.params.id)
      );
      if (!application)
        return res.status(404).json({ error: "Job application not found" });
      res.status(200).json(application);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateJobApplication(req: Request, res: Response) {
    try {
      const application = await JobApplicationService.updateJobApplication(
        new ObjectId(req.params.id),
        req.body
      );
      if (!application)
        return res.status(404).json({ error: "Job application not found" });
      res.status(200).json(application);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteJobApplication(req: Request, res: Response) {
    try {
      const deleted = await JobApplicationService.deleteJobApplication(
        new ObjectId(req.params.id)
      );
      if (!deleted)
        return res.status(404).json({ error: "Job application not found" });
      res.status(200).json({ message: "Job application deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
