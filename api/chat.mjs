import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt in request body" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-4" if you're approved for it
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion?.choices?.[0]?.message?.content;

    console.log("OpenAI reply:", reply);

    if (!reply) {
      return res.status(500).json({ error: "No reply from OpenAI." });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI API call failed:", error);
    return res.status(500).json({ error: "OpenAI API call failed." });
  }
}
