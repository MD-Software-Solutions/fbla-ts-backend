import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import UserHistoryService from "@src/services/UserHistoryService";

export default class UserHistoryController {
  static async createUserHistory(req: Request, res: Response) {
    try {
      const history = await UserHistoryService.createUserHistory(req.body);
      res.status(201).json(history);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllUserHistory(_: Request, res: Response) {
    try {
      const history = await UserHistoryService.getAllUserHistory();
      res.status(200).json(history);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getUserHistoryById(req: Request, res: Response) {
    try {
      const history = await UserHistoryService.getUserHistoryById(
        new ObjectId(req.params.id)
      );
      if (!history)
        return res.status(404).json({ error: "User history not found" });
      res.status(200).json(history);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateUserHistory(req: Request, res: Response) {
    try {
      const history = await UserHistoryService.updateUserHistory(
        new ObjectId(req.params.id),
        req.body
      );
      if (!history)
        return res.status(404).json({ error: "User history not found" });
      res.status(200).json(history);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteUserHistory(req: Request, res: Response) {
    try {
      const deleted = await UserHistoryService.deleteUserHistory(
        new ObjectId(req.params.id)
      );
      if (!deleted)
        return res.status(404).json({ error: "User history not found" });
      res.status(200).json({ message: "User history deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
