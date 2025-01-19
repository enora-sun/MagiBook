import OpenAI from "openai";
const openai = new OpenAI();

async function generateTextAndImage() {
let promptTextBody = "Stray Kids (the kpop band)"; // placeholder

const textCompletion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a worldly-announced children books' writer." },
        {
            role: "user",
            content: `Write a 20 word children's story about ${promptTextBody}.`,
        },
    ],
});

console.log(textCompletion.choices[0].message);

if (textCompletion.choices && textCompletion.choices.length > 0 && textCompletion.choices[0].message) {
    let promptImageBody = textCompletion.choices[0].message.content; 
    let refinedPrompt = `${promptImageBody} (illustration without text)`;

    // Generate image
    const imageResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: refinedPrompt,
        size: "1024x1024",
        quality: "standard",
        n: 1,
    });

    if (imageResponse.data && imageResponse.data.length > 0) {
        console.log(imageResponse.data[0].url); // Print the URL of the generated image
    } else {
        console.log("No image generated.");
    }
} else {
    console.log("No valid text generated to use for image creation.");
}
}

generateTextAndImage().catch(console.error);