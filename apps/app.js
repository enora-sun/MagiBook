const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

// Initialize OpenAI client with API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type'
}));

app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Storybook Generator API.');
});

// POST route to generate story and image
app.post('/generate', async (req, res) => {
  const { keywords } = req.body;

  // Validate input: Ensure exactly 5 keywords are provided
  if (!Array.isArray(keywords) || keywords.length !== 5) {
    return res.status(400).json({ error: 'Please provide exactly 5 keywords.' });
  }

  try {
    // Generate the story using OpenAI GPT-4o
    const textCompletion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: "You are a world-renowned children's book author." },
        {
          role: 'user',
          content: `Write a 200-word children's storybook using these 5 keywords: ${keywords.join(', ')}. The story should be engaging, creative, and appropriate for young readers aged 6 to 10.`,
        },
      ],
      max_tokens: 500
    });

    const storyText = textCompletion.choices[0].message.content;

    // Translate the story to Mandarin using OpenAI
    const translationCompletion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: "You are a professional translator." },
        {
          role: 'user',
          content: `Translate the following story into Mandarin: "${storyText}"`,
        },
      ],
      max_tokens: 600
    });

    const translatedStory = translationCompletion.choices[0].message.content;

    // Generate an image based on the story using OpenAI DALL-E
    const imageResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `${storyText} (illustration without words, absolute, and generate in cute, cartoon style)`,
      size: '1024x1024',
      quality: 'standard',
      n: 1
    });

    if (imageResponse.data && imageResponse.data.length > 0) {
      const imageUrl = imageResponse.data[0].url;

      // Send back the generated story, translated version, and image URL
      res.json({ story: storyText, translatedStory: translatedStory, imageUrl: imageUrl });
    } else {
      res.status(500).json({ error: 'Error generating image.' });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error generating story and image.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
