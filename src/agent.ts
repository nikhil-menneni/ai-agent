import type { z } from "zod";
import { runllm } from "./ai";

import type { AIMessage } from "./types";
import { addMessages, getMessages, saveToolResponse } from "./memory";
import { runLLM } from "./llm";
import { runTool } from "./toolRunner";
import logger from "./logger";

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string;
  tools?: { name: string; parameters: z.AnyZodObject }[];
}) => {
  await addMessages([{ role: "user", content: userMessage }]);

  while (true) {
    const history = await getMessages();
    const response: any = await runLLM({
      messages: history,
      tools,
    });
    await addMessages([response]);

    logger.info(`response from LLM is %o`, response);

    if (response.content) {
      return getMessages();
    }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0];
      logger.info(`executing: ${toolCall.function.name}`);

      const toolResponse = await runTool(toolCall, userMessage);
      await saveToolResponse(toolCall.id, toolResponse);

      logger.info(`executed: ${toolCall.function.name}`);
    }
  }
};
