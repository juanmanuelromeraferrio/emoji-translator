const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getEmojisFromChatGPT = async (word) => {
    if (typeof word !== 'string' || !word.trim()) {
        throw new Error('Invalid word');
    }

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Can you give 10 emoji for the word "${word}, separated by comma"?`,
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        const emojis = response.data.choices[0].text.trim().split(',');
        return emojis;
    } catch (error) {
        console.error('Error retrieving emojis:', error.message);
        return null;
    }
};

export default getEmojisFromChatGPT;
