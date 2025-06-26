import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import JobPostingTagService from "@src/services/JobPostingTagService";

export default class JobPostingTagController {
  static async createJobPostingTag(req: Request, res: Response) {
    try {
      const tag = await JobPostingTagService.createJobPostingTag(req.body);
      res.status(201).json(tag);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllJobPostingTags(_: Request, res: Response) {
    try {
      const tags = await JobPostingTagService.getAllJobPostingTags();
      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getJobPostingTagById(req: Request, res: Response) {
    try {
      const tag = await JobPostingTagService.getJobPostingTagById(
        new ObjectId(req.params.id)
      );
      if (!tag)
        return res.status(404).json({ error: "Job posting tag not found" });
      res.status(200).json(tag);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateJobPostingTag(req: Request, res: Response) {
    try {
      const tag = await JobPostingTagService.updateJobPostingTag(
        new ObjectId(req.params.id),
        req.body
      );
      if (!tag)
        return res.status(404).json({ error: "Job posting tag not found" });
      res.status(200).json(tag);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteJobPostingTag(req: Request, res: Response) {
    try {
      const deleted = await JobPostingTagService.deleteJobPostingTag(
        new ObjectId(req.params.id)
      );
      if (!deleted)
        return res.status(404).json({ error: "Job posting tag not found" });
      res.status(200).json({ message: "Job posting tag deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
