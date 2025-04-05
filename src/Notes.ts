//additional notes
import { z } from "zod";
parameters: z.object({
  city: z.string().describe("Name of the city to get weather for"),
}).describe("Get current weather info for a given city");

// tool calls = object arguments every time
