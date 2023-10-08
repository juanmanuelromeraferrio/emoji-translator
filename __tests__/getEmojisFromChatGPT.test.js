const { OpenAIApi } = require("openai");
const { getEmojisFromChatGPT } = require('../src/lib/getEmojisFromChatGPT');

jest.mock("openai");

describe("getEmojisFromChatGPT function", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("returns the emojis for a given word", async () => {
        const word = "happy";
        const response = {
            data: {
                choices: [
                    {
                        text: "😀,😀,😀,😀,😀,😀,😀,😀,😀,😀"
                    }
                ]
            }
        };
        OpenAIApi.prototype.createCompletion.mockResolvedValue(response);

        const result = await getEmojisFromChatGPT(word);

        expect(result).toStrictEqual(['😀','😀','😀','😀','😀','😀','😀','😀','😀','😀']);
        expect(OpenAIApi.prototype.createCompletion).toHaveBeenCalledWith({
            model: "text-davinci-003",
            prompt: `Can you give 10 emoji for the word "${word}, separated by comma"?`,
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

        const result = await getEmojisFromChatGPT(word);

        expect(result).toBeNull();
        expect(OpenAIApi.prototype.createCompletion).toHaveBeenCalledWith({
            model: "text-davinci-003",
            prompt: `Can you give 10 emoji for the word "${word}, separated by comma"?`,
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
    });

    it("throws an error if the word parameter is not a string", async () => {
        const word = 123;
        await expect(getEmojisFromChatGPT(word)).rejects.toThrow("Invalid word");
    });

    it("throws an error if the word parameter is an empty string", async () => {
        const word = "";
        await expect(getEmojisFromChatGPT(word)).rejects.toThrow("Invalid word");
    });
});
