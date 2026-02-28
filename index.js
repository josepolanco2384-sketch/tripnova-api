import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());

// Endpoint principal de TripNova
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
          content: `
Eres el motor de automatización de TripNova.
Genera un JSON limpio con:

{
  "hero": {
    "title": "",
    "subtitle": "",
    "image": "",
    "button_text": "",
    "button_link": ""
  },
  "destinations": [
    { "title": "", "image": "", "description": "", "link": "" }
  ],
  "regions": [
    { "title": "", "link": "" }
  ],
  "inspiration": [
    { "title": "", "image": "", "description": "" }
  ],
  "menu": [
    { "title": "", "link": "" }
  ],
  "footer": {
    "about": "",
    "links": [
      { "title": "", "link": "" }
    ]
  },
  "blog": [
    { "title": "", "image": "", "excerpt": "", "link": "" }
  ],
  "pages": [
    { "title": "", "content": "" }
  ]
}

Usa tendencias globales, temporada, clima y país del visitante.
Usa imágenes reales de Unsplash.
Devuelve SOLO el JSON, sin texto adicional.
`
        }
      ]
    });

    const text = ai.choices[0].message.content;
    res.json(JSON.parse(text));

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Servidor
app.listen(3000, () => {
  console.log("TripNova API running on port 3000");
});
