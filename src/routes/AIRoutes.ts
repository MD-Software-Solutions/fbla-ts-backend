import { Router, Request, Response, NextFunction } from "express";
import AIController from "@src/controllers/AIController";
import { authenticateJWT } from "@src/controllers/auth";
import multer from "multer";

const router = Router();
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 },
});

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post(
  "/generate-bio",
  authenticateJWT,
  asyncHandler(AIController.generateBio)
);
router.post(
  "/interview/generate-questions",
  authenticateJWT,
  asyncHandler(AIController.generateInterviewQuestions)
);
router.post(
  "/interview/text-to-speech",
  authenticateJWT,
  asyncHandler(AIController.textToSpeech)
);
router.post(
  "/interview/speech-to-text",
  authenticateJWT,
  upload.single("audio"),
  asyncHandler(AIController.speechToText)
);
router.post(
  "/interview/generate-feedback",
  authenticateJWT,
  asyncHandler(AIController.generateFeedback)
);
router.post(
  "/generate-filter",
  authenticateJWT,
  asyncHandler(AIController.generateJobFilter)
);
router.post("/ai/chat", authenticateJWT, asyncHandler(AIController.aiChat));
router.post(
  "/conversations/ai/initialize",
  authenticateJWT,
  asyncHandler(AIController.initializeAIConversation)
);

export default router;
