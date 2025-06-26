import { Request, Response } from "express";
import AIService from "../services/AIService";

export default class AIController {
  static async generateBio(req: Request, res: Response) {
    try {
      const { userInput } = req.body;
      const bio = await AIService.generateBio(userInput);
      res.json({ bio });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async generateInterviewQuestions(req: Request, res: Response) {
    try {
      const { jobDetails, applicationDetails } = req.body;
      const questions = await AIService.generateInterviewQuestions(
        jobDetails,
        applicationDetails
      );
      res.json({ questions });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async textToSpeech(req: Request, res: Response) {
    try {
      const { text } = req.body;
      const audioBuffer = await AIService.textToSpeech(text);
      res.set({
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length,
      });
      res.send(audioBuffer);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async speechToText(req: Request, res: Response) {
    try {
      const audioFile = (req as any).file;
      const text = await AIService.speechToText(audioFile);
      res.json({ text });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async generateFeedback(req: Request, res: Response) {
    try {
      const { jobDetails, responses } = req.body;
      const feedback = await AIService.generateFeedback(jobDetails, responses);
      res.json({ feedback });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async generateJobFilter(req: Request, res: Response) {
    try {
      const { jobPosts, users } = req.body;
      const filteredJobs = await AIService.generateJobFilter(jobPosts, users);
      res.json({ filteredJobs });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async aiChat(req: Request, res: Response) {
    try {
      const { message, conversation_id, user_id, user_name } = req.body;
      const response = await AIService.aiChat(
        message,
        conversation_id,
        user_id,
        user_name
      );
      res.json(response);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async initializeAIConversation(req: Request, res: Response) {
    try {
      const { user_id } = req.body;
      const result = await AIService.initializeAIConversation(user_id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
