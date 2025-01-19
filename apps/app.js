const express = require('express');
const OpenAI = require('openai');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Storybook Generator API.');
});

// post to generate story and image
app.post('/generate', async (req, res) => {
  const { keywords } = req.body;

  // input of 5 keywords
  if (!Array.isArray(keywords) || keywords.length !== 5) {
    return res.status(400).json({ error: 'Please provide exactly 5 keywords.' });
  }

  try {
    // text story from OpenAI GPT-4
    const textCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: "You are a world-renowned children's book author." },
        {
          role: 'user',
          content: `Write a 200-word children's storybook using these 5 keywords: ${keywords.join(', ')}. The story should be engaging, creative, and appropriate for young readers aged 6 to 10.`,
        },
      ],
    });

    const storyText = textCompletion.choices[0].message.content;
    console.log("Generated Story: ", storyText);


    // generate the image based on the story
    const imageResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: storyText,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    });

    if (imageResponse.data && imageResponse.data.length > 0) {
      const imageUrl = imageResponse.data[0].url;
      console.log("Generated Image URL: ", imageUrl);
      // send back the story and image URL
      res.json({ story: storyText, imageUrl: imageUrl });
    } else {
      res.status(500).json({ error: 'Error generating image.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating story and image.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});