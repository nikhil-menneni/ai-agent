import { z } from "zod";
import type { Toolfn } from "../types";
import { openai } from "../ollama";

export const generateImageToolDefinition = {
  name: "generate_image",
  parameters: z
    .object({
      prompt: z
        .string()
        .describe(
          "The prompt to use to generate the image with a diffusion model image generator like Dall-E"
        ),
    })
    .describe("Generates an image and returns the url of the image."),
};

type Args = z.infer<typeof generateImageToolDefinition.parameters>;

export const generateImage: Toolfn<Args, string> = async ({
  toolargs,
  userMessage,
}) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: toolargs.prompt,
    n: 1,
    size: "1024x1024",
  });

  const imageUrl = response.data[0].url!;

  return imageUrl;
};
