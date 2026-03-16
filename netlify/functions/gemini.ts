import { Context } from "@netlify/functions";

export default async (request: Request, context: Context) => {
  // إعدادات الـ Headers للتعامل مع الـ CORS
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  });

  // 1. التعامل مع طلبات الـ OPTIONS (عشان المتصفح يتأكد من التصاريح)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  // 2. السماح فقط بطلبات الـ POST
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { 
      status: 405, 
      headers 
    });
  }

  try {
    // 3. جلب المفتاح السري (تأكد إنه اسمه GEMINI_API_KEY في نيتليفاي)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY missing");

    // 4. قراءة البيانات المرسلة من الموقع (Frontend)
    const body = await request.json().catch(() => ({}));
    const prompt = body.prompt || body.text || "Explain Arabic grammar in one sentence.";

    // 5. استدعاء Gemini API باستخدام Fetch
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Gemini API error");
    }

    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

    // 6. إرجاع النتيجة بنظام Response الحديث
    return new Response(JSON.stringify({ text: result }), {
      status: 200,
      headers
    });

  } catch (error: any) {
    console.error("Gemini Function Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Server error" }), {
      status: 500,
      headers
    });
  }
};