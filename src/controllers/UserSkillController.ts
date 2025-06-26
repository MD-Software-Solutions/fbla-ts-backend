import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import UserSkillService from "@src/services/UserSkillService";

export default class UserSkillController {
  static async createUserSkill(req: Request, res: Response) {
    try {
      const skill = await UserSkillService.createUserSkill(req.body);
      res.status(201).json(skill);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllUserSkills(_: Request, res: Response) {
    try {
      const skills = await UserSkillService.getAllUserSkills();
      res.status(200).json(skills);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getUserSkillById(req: Request, res: Response) {
    try {
      const skill = await UserSkillService.getUserSkillById(
        new ObjectId(req.params.id)
      );
      if (!skill)
        return res.status(404).json({ error: "User skill not found" });
      res.status(200).json(skill);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateUserSkill(req: Request, res: Response) {
    try {
      const skill = await UserSkillService.updateUserSkill(
        new ObjectId(req.params.id),
        req.body
      );
      if (!skill)
        return res.status(404).json({ error: "User skill not found" });
      res.status(200).json(skill);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteUserSkill(req: Request, res: Response) {
    try {
      const deleted = await UserSkillService.deleteUserSkill(
        new ObjectId(req.params.id)
      );
      if (!deleted)
        return res.status(404).json({ error: "User skill not found" });
      res.status(200).json({ message: "User skill deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
