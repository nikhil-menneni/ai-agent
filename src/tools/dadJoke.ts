import { z } from "zod";
import type { Toolfn } from "../types";
import fetch from "node-fetch";

export const dadJokeToolDefinition = {
  name: "dad_joke",
  parameters: z.object({}),
};

type Args = z.infer<typeof dadJokeToolDefinition.parameters>;

export const dadJoke: Toolfn<Args, string> = async ({ toolargs }) => {
  const res = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  return (await res.json()).joke;
};
