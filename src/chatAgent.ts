import { Ollama } from "ollama";
import type { AIMessage } from "./types";

const ollama = new Ollama();

export const llm = async ({
  messages,
  tools,
  temperature = 0.1,
  model = "llama3",
}: {
  messages: AIMessage[];
  tools?: any[];
  temperature?: number;
  model?: string;
}) => {
  const response = await ollama.chat({
    model,
    messages,
    options: { temperature },
    tools,
  });

  return response.message;
};
