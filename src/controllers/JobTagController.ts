import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import JobTagService from "@src/services/JobTagService";

export default class JobTagController {
  static async createJobTag(req: Request, res: Response) {
    try {
      const tag = await JobTagService.createJobTag(req.body);
      res.status(201).json(tag);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllJobTags(req: Request, res: Response) {
    try {
      // Advanced filtering: allow ?tag_name=...&tag_type=...
      const { tag_name, tag_type } = req.query;
      const tags = await JobTagService.getAllJobTags({
        tag_name: tag_name as string,
        tag_type: tag_type as string,
      });
      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getJobTagById(req: Request, res: Response) {
    try {
      const tag = await JobTagService.getJobTagById(
        new ObjectId(req.params.id)
      );
      if (!tag) return res.status(404).json({ error: "Job tag not found" });
      res.status(200).json(tag);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateJobTag(req: Request, res: Response) {
    try {
      const tag = await JobTagService.updateJobTag(
        new ObjectId(req.params.id),
        req.body
      );
      if (!tag) return res.status(404).json({ error: "Job tag not found" });
      res.status(200).json(tag);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteJobTag(req: Request, res: Response) {
    try {
      const deleted = await JobTagService.deleteJobTag(
        new ObjectId(req.params.id)
      );
      if (!deleted) return res.status(404).json({ error: "Job tag not found" });
      res.status(200).json({ message: "Job tag deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
