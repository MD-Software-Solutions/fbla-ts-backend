import OpenAI from "openai";
import { getDb } from "@src/common/util/mongo";
import { ObjectId } from "mongodb";

// Local type for OpenAI chat messages
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default class AIService {
  static async generateBio(userInput: string): Promise<string> {
    const prompt = `Write a professional, friendly, and concise bio for the following user: ${userInput}`;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });
    return completion.choices[0]?.message?.content?.trim() || "";
  }

  static async generateInterviewQuestions(
    jobDetails: any,
    applicationDetails: any
  ): Promise<string[]> {
    const prompt = `Generate 5 interview questions for a candidate applying to this job: ${JSON.stringify(
      jobDetails
    )}. Candidate's application: ${JSON.stringify(applicationDetails)}`;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });
    const text = completion.choices[0]?.message?.content || "";
    return text
      .split(/\n|\d+\./)
      .map((q) => q.trim())
      .filter((q) => q.length > 10);
  }

  static async textToSpeech(text: string): Promise<Buffer> {
    // OpenAI TTS API (text-to-speech)
    const response = await openai.audio.speech.create({
      model: "tts-1",
      input: text,
      voice: "alloy",
    });
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  static async speechToText(audioFile: any): Promise<string> {
    // Accept any type for file, as Express.Multer.File is not globally available
    const fs = await import("fs");
    const stream = fs.createReadStream(audioFile.path);
    const transcript = await openai.audio.transcriptions.create({
      file: stream as any,
      model: "whisper-1",
    });
    return transcript.text;
  }

  static async generateFeedback(
    jobDetails: any,
    responses: any[]
  ): Promise<string> {
    const prompt = `Given the job details: ${JSON.stringify(
      jobDetails
    )} and the candidate's responses: ${JSON.stringify(
      responses
    )}, provide constructive feedback.`;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    });
    return completion.choices[0]?.message?.content?.trim() || "";
  }

  static async generateJobFilter(
    jobPosts: any[],
    users: any[]
  ): Promise<string> {
    const prompt = `Given these job postings: ${JSON.stringify(
      jobPosts
    )} and these users: ${JSON.stringify(
      users
    )}, suggest the best job-user matches and explain why.`;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });
    return completion.choices[0]?.message?.content?.trim() || "";
  }

  static async aiChat(
    message: string,
    conversation_id: string,
    user_id: string,
    user_name: string
  ): Promise<any> {
    const db = await getDb();
    // Fetch previous messages for context
    const messages = await db
      .collection("messages")
      .find({ conversation_id: new ObjectId(conversation_id) })
      .sort({ sent_at: 1 })
      .toArray();
    const chatHistory: ChatMessage[] = messages.map((msg: any) => ({
      role: msg.isAI ? "assistant" : "user",
      content: msg.content,
    }));
    chatHistory.push({ role: "user", content: message });
    // Get AI response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chatHistory,
      max_tokens: 200,
    });
    const aiResponse = completion.choices[0]?.message?.content?.trim() || "";
    // Save user message
    await db.collection("messages").insertOne({
      conversation_id: new ObjectId(conversation_id),
      sender_id: new ObjectId(user_id),
      sender_name: user_name,
      content: message,
      sent_at: new Date(),
      read_by: [new ObjectId(user_id)],
      isAI: false,
    });
    // Save AI message
    await db.collection("messages").insertOne({
      conversation_id: new ObjectId(conversation_id),
      sender_id: null,
      sender_name: "AI Assistant",
      content: aiResponse,
      sent_at: new Date(),
      read_by: [],
      isAI: true,
    });
    return { response: aiResponse };
  }

  static async initializeAIConversation(user_id: string): Promise<any> {
    const db = await getDb();
    const conversation = {
      participants: [new ObjectId(user_id)],
      isAI: true,
      created_at: new Date(),
      updated_at: new Date(),
      pinned_by: [],
    };
    const result = await db.collection("conversations").insertOne(conversation);
    return { conversation_id: result.insertedId };
  }
}
