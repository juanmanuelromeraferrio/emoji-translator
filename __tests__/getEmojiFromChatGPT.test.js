const { OpenAIApi } = require("openai");
const { getEmojiFromChatGPT } = require('../src/lib/getEmojiFromChatGPT');

jest.mock("openai");

describe("getEmojiFromChatGPT function", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("returns the emoji for a given word", async () => {
        const word = "happy";
        const response = {
            data: {
                choices: [
                    {
                        text: "😀"
                    }
                ]
            }
        };
        OpenAIApi.prototype.createCompletion.mockResolvedValue(response);

        const result = await getEmojiFromChatGPT(word);

        expect(result).toBe("😀");
        expect(OpenAIApi.prototype.createCompletion).toHaveBeenCalledWith({
            model: "text-davinci-003",
            prompt: `Can you give an emoji for the word "${word}"?`,
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
    });

    it("returns null if the API call fails", async () => {
        const word = "happy";
        OpenAIApi.prototype.createCompletion.mockRejectedValue(new Error("API call failed"));

        const result = await getEmojiFromChatGPT(word);

        expect(result).toBeNull();
        expect(OpenAIApi.prototype.createCompletion).toHaveBeenCalledWith({
            model: "text-davinci-003",
            prompt: `Can you give an emoji for the word "${word}"?`,
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
    });

    it("throws an error if the word parameter is not a string", async () => {
        const word = 123;
        await expect(getEmojiFromChatGPT(word)).rejects.toThrow("Invalid word");
    });

    it("throws an error if the word parameter is an empty string", async () => {
        const word = "";
        await expect(getEmojiFromChatGPT(word)).rejects.toThrow("Invalid word");
    });
});
