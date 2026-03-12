export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const apiKey = (process.env.GEMINI_API_KEY || "").trim();
    if (!apiKey) throw new Error("GEMINI_API_KEY missing");

    const body = JSON.parse(event.body || "{}");
    const prompt = body.prompt || body.text || "Explain Arabic grammar in one sentence";

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Google API Error");
    }

    const aiText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response returned";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: aiText })
    };

  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};