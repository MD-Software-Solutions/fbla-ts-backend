import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import UserProjectService from "@src/services/UserProjectService";

export default class UserProjectController {
  static async createUserProject(req: Request, res: Response) {
    try {
      const project = await UserProjectService.createUserProject(req.body);
      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllUserProjects(_: Request, res: Response) {
    try {
      const projects = await UserProjectService.getAllUserProjects();
      res.status(200).json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getUserProjectById(req: Request, res: Response) {
    try {
      const project = await UserProjectService.getUserProjectById(
        new ObjectId(req.params.id)
      );
      if (!project)
        return res.status(404).json({ error: "User project not found" });
      res.status(200).json(project);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateUserProject(req: Request, res: Response) {
    try {
      const project = await UserProjectService.updateUserProject(
        new ObjectId(req.params.id),
        req.body
      );
      if (!project)
        return res.status(404).json({ error: "User project not found" });
      res.status(200).json(project);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteUserProject(req: Request, res: Response) {
    try {
      const deleted = await UserProjectService.deleteUserProject(
        new ObjectId(req.params.id)
      );
      if (!deleted)
        return res.status(404).json({ error: "User project not found" });
      res.status(200).json({ message: "User project deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
