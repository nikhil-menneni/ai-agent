import type OpenaI from "openai";
import { getWeather } from "./tools/getWeather";
import { reddit, redditToolDefinition } from "./tools/reddit";
import {
  generateImage,
  generateImageToolDefinition,
} from "./tools/generateImage";
import { dadJoke, dadJokeToolDefinition } from "./tools/dadJoke";

export const runTool = async (
  toolCall: OpenaI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolargs: JSON.parse(toolCall.function.arguments),
  };

  switch (toolCall.function.name) {
    case "get_weather":
      return getWeather(input);
    case redditToolDefinition.name:
      return await reddit(input);
    case generateImageToolDefinition.name:
      const image = await generateImage(input);
      return image;
    case dadJokeToolDefinition.name:
      return await dadJoke(input);
    default:
      throw new Error(`Unknown Tool: ${toolCall.function.name}`);
  }
};
