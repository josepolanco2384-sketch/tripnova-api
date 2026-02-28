import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const ai = await client.chat.completions.create({
      model: "gpt-4o-mini",
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
`
        }
      ]
    });

    const text = ai.choices[0].message.content;

    res.status(200).json(JSON.parse(text));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
