import { z } from "zod";

export const getWeatherDefinition = {
  name: "get_weather",
  parameters: z.object({}),
};

export const getWeather = (input: any) => "hot, 90deg";
