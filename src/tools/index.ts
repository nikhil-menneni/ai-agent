import { generateImageToolDefinition } from "./generateImage";
import { redditToolDefinition } from "./reddit";
import { dadJokeToolDefinition } from "./dadJoke";
import { getWeatherDefinition } from "./getWeather";

export const tools = [
  generateImageToolDefinition,
  redditToolDefinition,
  dadJokeToolDefinition,
  getWeatherDefinition,
];
