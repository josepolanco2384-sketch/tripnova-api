import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());

app.get("/api/automation", async (req, res) => {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1"
    });

    const ai = await client.chat.completions.create({
      model: "meta-llama/llama-3-70b-instruct",
      messages: [
        {
          role: "system",
          content: "Genera un JSON limpio para TripNova."
        }
      ]
    });

    const text = ai.choices[0].message.content;
    res.json(JSON.parse(text));

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("TripNova API running on port 3000");
});
