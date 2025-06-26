import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import UserAchievementService from "@src/services/UserAchievementService";

export default class UserAchievementController {
  static async createUserAchievement(req: Request, res: Response) {
    try {
      const achievement = await UserAchievementService.createUserAchievement(
        req.body
      );
      res.status(201).json(achievement);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllUserAchievements(_: Request, res: Response) {
    try {
      const achievements =
        await UserAchievementService.getAllUserAchievements();
      res.status(200).json(achievements);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getUserAchievementById(req: Request, res: Response) {
    try {
      const achievement = await UserAchievementService.getUserAchievementById(
        new ObjectId(req.params.id)
      );
      if (!achievement)
        return res.status(404).json({ error: "User achievement not found" });
      res.status(200).json(achievement);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateUserAchievement(req: Request, res: Response) {
    try {
      const achievement = await UserAchievementService.updateUserAchievement(
        new ObjectId(req.params.id),
        req.body
      );
      if (!achievement)
        return res.status(404).json({ error: "User achievement not found" });
      res.status(200).json(achievement);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteUserAchievement(req: Request, res: Response) {
    try {
      const deleted = await UserAchievementService.deleteUserAchievement(
        new ObjectId(req.params.id)
      );
      if (!deleted)
        return res.status(404).json({ error: "User achievement not found" });
      res
        .status(200)
        .json({ message: "User achievement deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
