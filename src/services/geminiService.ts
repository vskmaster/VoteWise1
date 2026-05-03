import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chatWithAI(messages: ChatMessage[]) {
  try {
    // Extract last message and history
    const history = messages.slice(0, -1).map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));
    const lastMessage = messages[messages.length - 1].content;

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: history,
      config: {
        systemInstruction: `You are VoteWise AI, a smart election assistant for Indian voters. 
        Your goal is to provide accurate, non-partisan, and helpful information about the voting process, registration, candidates, and civic rights in India. 
        Keep responses professional, inclusive, and easy to understand. 
        Support English, Hindi, and Tamil where necessary, but respond primarily in the language the user uses.
        If a user asks about political opinions or who to vote for, remain strictly neutral and explain your role is to provide factual information only.`,
      }
    });

    const response = await chat.sendMessage({
      message: lastMessage,
    });

    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    throw error;
  }
}

export async function analyzeElectionText(text: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Analyze and simplify the following election-related text for a common voter. 
      Provide:
      1. A simplified summary (max 3 sentences).
      2. Key highlights (bullet points).
      3. Actionable steps for the voter.
      
      Text to analyze:
      ${text}`,
    });

    return response.text;
  } catch (error) {
    console.error("Analyze Text Error:", error);
    throw error;
  }
}
