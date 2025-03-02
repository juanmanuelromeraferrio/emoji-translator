import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const getEmojisFromChatGPT = async (word) => {
    if (typeof word !== 'string' || !word.trim()) {
        throw new Error('Invalid word');
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: 'user',
                content: `Provide exactly 10 emojis for the word "${word}" as a comma-separated list, with no numbering or additional text.`
            }],
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        
        const rawEmojis = response.choices[0].message.content.trim();
        const emojis = rawEmojis.split(',')
            .map(e => e.replace(/^\d+\.\s*/, '').trim())
            .filter(e => e.length > 0);
        
        console.log('Emojis:', emojis);
        return emojis;
    } catch (error) {
        console.error('Error retrieving emojis:', error.message);
        return null;
    }
};


export default getEmojisFromChatGPT;
