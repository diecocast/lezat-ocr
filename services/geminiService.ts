import { GoogleGenAI, Chat } from "@google/genai";

// Ensure API key is available, but do not expose UI for it.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // result is "data:mime/type;base64,..."
      // we only want the part after the comma
      const base64String = result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const processFileWithGemini = async (file: File, prompt: string): Promise<string> => {
  try {
    const base64Data = await fileToBase64(file);
    const filePart = {
      inlineData: {
        mimeType: file.type,
        data: base64Data,
      },
    };

    const textPart = {
      text: prompt,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [textPart, filePart] },
    });
    
    return response.text;

  } catch (error) {
    console.error("Error processing file with Gemini:", error);
    if (error instanceof Error) {
        return `Ocurrió un error: ${error.message}`;
    }
    return "Ocurrió un error desconocido mientras se procesaba el archivo.";
  }
};

// New Chat Service
export class GeminiChatService {
  private chat: Chat;

  constructor(contextText: string) {
    this.chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `Eres un asistente experto. Tu tarea es responder preguntas basándote ÚNICAMENTE en el siguiente contexto de texto. No uses ningún conocimiento externo. Si la respuesta no se encuentra en el texto, indícalo.

        CONTEXTO:
        ---
        ${contextText}
        ---
        `,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await this.chat.sendMessage({ message });
      return response.text;
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      if (error instanceof Error) {
          return `Ocurrió un error: ${error.message}`;
      }
      return "Ocurrió un error desconocido durante el chat.";
    }
  }
}