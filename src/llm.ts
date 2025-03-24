import { Ollama } from "ollama";
import type { AIMessage } from "./types";
import { v4 as uuid4 } from "uuid";

import { JSONFilePreset } from "lowdb/node";

const ollama = new Ollama();

export type MessageWithMetadata = AIMessage & {
  id: string;
  createdAt: string;
};

export const addMetadata = (message: AIMessage) => ({
  ...message,
  id: uuid4(),
  createdAt: new Date().toISOString(),
});

export const removeMetadata = (message: MessageWithMetadata) => {
  const { id, createdAt, ...rest } = message;
  return rest;
};

type Data = {
  messages: MessageWithMetadata[];
};

const defaultData: Data = {
  messages: [],
};

export const getDB = async () => {
  const db = await JSONFilePreset<Data>("db.json", defaultData);
  return db;
};

export const addMessages = async (message: AIMessage[]) => {
  const db = await getDB();
  db.data.messages.push(...message.map(addMetadata));
  await db.write();
};

export const getMessages = async () => {
  const db = await getDB();
  return db.data.messages.map(removeMetadata);
};

export const llm = async ({
  messages,
  temperature = 0.1,
  model = "llama3",
}: {
  messages: AIMessage[];
  temperature?: number;
  model?: string;
}) => {
  const response = await ollama.chat({
    model,
    messages,
    options: { temperature },
  });

  return response.message;
};
