const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const getEmojiFromChatGPT = async (word) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Can you give an emoji for the word "${word}"?`,
        temperature: 0.8,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
    const emoji = response.data.choices[0].text.trim();
    return emoji
};

export default getEmojiFromChatGPT;