import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { messages } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // or your custom GPT ID here
      messages: messages,
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI API call failed:", err);
    res.status(500).json({ error: "OpenAI API call failed" });
  }
}
