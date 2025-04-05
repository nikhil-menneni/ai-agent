import type { AIMessage } from "./types";
import { zodFunction } from "openai/helpers/zod";
import { z } from "zod";
import { openai } from "./ollama";
import { systemPrompt } from "./systemPrompt";

export const runLLM = async ({
  model = "gpt-4o-mini",
  messages,
  temperature,
  tools,
}: {
  messages: AIMessage[];
  model?: string;
  temperature?: number;
  tools?: { name: string; parameters: z.AnyZodObject }[];
}) => {
  const formattedTools = tools?.map((tool) => zodFunction(tool));
  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages,
    ],
    temperature,
    tools: formattedTools,
    tool_choice: "auto",
    parallel_tool_calls: false,
  });

  return response.choices[0].message;
};
