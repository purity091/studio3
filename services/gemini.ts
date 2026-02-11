
import { GoogleGenAI, Type } from "@google/genai";
import { StoryType, StoryData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateStoryContent = async (userInput: string): Promise<Partial<StoryData>> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `أنت محرر صحفي مخضرم في قسم الاقتصاد. صغ الخبر التالي بأسلوب 'قناة الجزيرة' القوي والاحترافي.
    المدخل: ${userInput}
    
    المطلوب في النتيجة (JSON):
    1. title: عنوان خبري عاجل، قوي، ومختصر (مثل: "انهيار مفاجئ للأسهم الأوروبية").
    2. subtitle: شرح للخبر بأسلوب رصين (مثل: "تراجعت المؤشرات الرئيسية بنسبة 3% وسط مخاوف من ركود تضخمي").
    3. type: نوع الخبر (عاجل، تحليل، سوق).
    4. indicatorLabel: اسم مؤشر اقتصادي مرتبط (مثال: برنت، داو جونز، الذهب).
    5. indicatorValue: قيمة واقعية مرتبطة (مثال: +1.2% أو 1900$).
    6. indicatorTrend: اتجاه المؤشر (up أو down).
    
    اجعل الصياغة باللغة العربية الفصحى التحريرية.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          subtitle: { type: Type.STRING },
          type: { type: Type.STRING },
          indicatorLabel: { type: Type.STRING },
          indicatorValue: { type: Type.STRING },
          indicatorTrend: { type: Type.STRING, enum: ['up', 'down', 'neutral'] }
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return {};
  }
};

export const generateStoryImage = async (prompt: string): Promise<string> => {
  const finalPrompt = `Professional news broadcast background, cinematic business photography, high contrast, editorial style, 4k, no text, subject: ${prompt}`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: finalPrompt }],
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  return `https://picsum.photos/1200/1600?random=${Math.random()}`;
};
