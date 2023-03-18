const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getEmojiFromChatGPT = async (word) => {
    if (typeof word !== 'string' || !word.trim()) {
        throw new Error('Invalid word');
    }

    try {
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
        return emoji;
    } catch (error) {
        console.error('Error retrieving emoji:', error.message);
        return null;
    }
};

export default getEmojiFromChatGPT;
