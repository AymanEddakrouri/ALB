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
    
    let prompt = "";
    try {
      const body = JSON.parse(event.body || "{}");
      prompt = body.prompt || body.text || (typeof body === 'string' ? body : "");
    } catch (e) {
      prompt = event.body || "";
    }

    if (!prompt) return { statusCode: 400, headers, body: JSON.stringify({ error: "Empty prompt" }) };

    // التغيير السحري هنا: استخدمنا gemini-pro بدل gemini-1.5-flash
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // لو لسه فيه خطأ، هيطبع لنا الرسالة اللي جاية من جوجل بالظبط
      throw new Error(data.error?.message || "Google API Error");
    }

    const aiText = data.candidates[0].content.parts[0].text;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: aiText }),
    };

  } catch (error: any) {
    console.error("FINAL ATTEMPT ERROR:", error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};