import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

// Initialize Gemini API client
// Ideally, handle the case where API_KEY is missing gracefully in the UI
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (!apiKey) {
    console.warn("API Key is missing. Chat functionality will not work.");
    // Return a dummy chat object or handle error appropriately in UI
  }
  
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!apiKey) {
    return "抱歉，由于未配置 API 密钥，AI 助手暂时无法使用。请联系网站管理员。";
  }

  try {
    const chat = chatSession || initializeChat();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "抱歉，我无法理解您的请求。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，服务暂时不可用，请稍后再试。";
  }
};
