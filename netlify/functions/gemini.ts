export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

  try {
    const apiKey = (process.env.GEMINI_API_KEY || "").trim();
    if (!apiKey) throw new Error("KEY_MISSING");

    const body = JSON.parse(event.body || "{}");
    const prompt = body.prompt || body.text || "Explain Arabic grammar in one sentence";

    // رابط مباشر وجديد كلياً
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // لو جوجل رفضت، هنعرف السبب بالظبط
      const msg = data.error?.message || "Unknown Google Error";
      throw new Error(`Google_Says: ${msg}`);
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response text";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: aiText }),
    };

  } catch (error: any) {
    console.error("DEBUG:", error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};