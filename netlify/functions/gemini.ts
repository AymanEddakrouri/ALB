import { GoogleGenerativeAI } from "@google/generative-ai";

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // فك شفرة البيانات مهما كان شكلها
    let prompt = "";
    try {
      const body = JSON.parse(event.body || "{}");
      // بيحاول يدور على النص سواء مبعوث باسم prompt أو text أو حتى لو مبعوث نص مباشر
      prompt = body.prompt || body.text || (typeof body === 'string' ? body : "");
    } catch (e) {
      prompt = event.body || ""; // لو مش JSON، خد النص زي ما هو
    }

    if (!prompt || prompt.trim() === "") {
      console.error("Empty prompt received");
      return { 
        statusCode: 400, 
        headers, 
        body: JSON.stringify({ error: "الرجاء إدخال نص للتحليل" }) 
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { 
      statusCode: 200, 
      headers, 
      body: JSON.stringify({ text }) 
    };

  } catch (error: any) {
    console.error("Gemini Error:", error.message);
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ error: "حدث خطأ في معالجة الطلب" }) 
    };
  }
};