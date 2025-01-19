const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type'
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Storybook Generator API.');
});

// post to generate story and image (dummy data for testing)
app.post('/generate', async (req, res) => {
  const { keywords } = req.body;

  // input of 5 keywords
  if (!Array.isArray(keywords) || keywords.length !== 5) {
    return res.status(400).json({ error: 'Please provide exactly 5 keywords.' });
  }

  try {
    /*
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
    
    const translationCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a worldly-announced translator." },
            {
                role: "user",
                content: `Translate ${storyText} to mandarin.`,
            },
        ],
    });

    console.log(translationCompletion.choices[0].message);

    // generate the image based on the story
    const imageResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: storyText + ' (illustration without text, absolutely)(in cute, cartoon style)',
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    });

    if (imageResponse.data && imageResponse.data.length > 0) {
      const imageUrl = imageResponse.data[0].url;
    */

    // Dummy data for testing
    const storyText = `Once upon a time, a little cat named Whiskers found a magical ${keywords[0]} in the forest. With the help of a ${keywords[1]} and a wise old ${keywords[2]}, Whiskers embarked on a journey to discover the ${keywords[3]} and learn the true power of ${keywords[4]}.`;
    const translatedStory = `从前，一个名叫 Whiskers 的小猫在森林里发现了一只神奇的 ${keywords[0]}。 在 ${keywords[1]} 和睿智的 ${keywords[2]} 的帮助下，Whiskers 开始了发现 ${keywords[3]} 并学习 ${keywords[4]} 真正力量的旅程。`;
    const imageUrl = 'https://via.placeholder.com/1024';

    console.log("Generated Story (Dummy Data): ", storyText);
    console.log("Generated Image URL (Dummy Data): ", imageUrl);

    // send back the story and image URL
    res.json({ story: storyText, translatedStory: translatedStory, imageUrl: imageUrl });

    /*
    } else {
      res.status(500).json({ error: 'Error generating image.' });
    }
    */

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating story and image.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
