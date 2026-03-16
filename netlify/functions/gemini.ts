import { Context } from "@netlify/functions";

export default async (request: Request, context: Context) => {
  // إعدادات الـ Headers للتعامل مع الـ CORS
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  });

  // 1. التعامل مع طلبات الـ OPTIONS
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
    // 3. جلب المفتاح السري
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY missing");

    // 4. قراءة البيانات المرسلة
    const body = await request.json().catch(() => ({}));
    const prompt = body.prompt || body.text || "مرحباً، هل يمكنك مساعدتي؟";

    // 5. استدعاء Gemini API باستخدام v1beta (الإصدار الأضمن للموديلات الحديثة)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
      throw new Error(data.error?.message || `Google API Error: ${response.status}`);
    }

    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || "لم يتم إنتاج استجابة.";

    // 6. إرجاع النتيجة
    return new Response(JSON.stringify({ text: result }), {
      status: 200,
      headers
    });

  } catch (error: any) {
    console.error("Gemini Function Error:", error);
    return new Response(JSON.stringify({ error: error.message || "خطأ في السيرفر الداخلي" }), {
      status: 500,
      headers
    });
  }
};