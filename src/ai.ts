import { Ollama } from "ollama";

const ollama = new Ollama();

export const runllm = async ({
  message,
  temperature = 0.1,
  model = "llama3",
}: {
  message: string;
  temperature?: number;
  model?: string;
}) => {
  const response = await ollama.chat({
    model,
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    options: { temperature },
  });

  return response.message;
};
