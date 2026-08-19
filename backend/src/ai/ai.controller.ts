import type { Request, Response } from "express";
import { askAI } from "./ai.service.js";

export const chat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        message: "Message is required.",
      });
    }

    const answer = await askAI(message);

    return res.json({
      answer,
    });
  } catch (error) {
    console.error("AI error:", error);

    return res.status(500).json({
      message: "AI service failed.",
    });
  }
};
