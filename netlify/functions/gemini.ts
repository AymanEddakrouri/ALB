import { GoogleGenerativeAI } from "@google/generative-ai";

export const handler = async (event) => {
  // تجميع الـ Headers في مكان واحد لضمان ثباتها في النجاح والفشل
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  // معالجة طلب الـ Preflight (OPTIONS)
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Critical: GEMINI_API_KEY is missing");
      return { 
        statusCode: 500, 
        headers, 
        body: JSON.stringify({ error: "API Key is missing on server" }) 
      };
    }

    // تأكد من وجود body
    if (!event.body) {
      return { 
        statusCode: 400, 
        headers, 
        body: JSON.stringify({ error: "Empty request body" }) 
      };
    }

    // تحليل البيانات المبعوثة
    const data = JSON.parse(event.body);
    const prompt = data.prompt;

    if (!prompt) {
      return { 
        statusCode: 400, 
        headers, 
        body: JSON.stringify({ error: "Prompt is required in JSON body" }) 
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text }),
    };

  } catch (error) {
    console.error("Function Execution Error:", error);
    return {
      statusCode: 500,
      headers, // مهم جداً نبعت الـ headers هنا كمان عشان الـ CORS Error يختفي
      body: JSON.stringify({ error: error.message }),
    };
  }
};