import { runllm } from "./ai";
import { addMessages, getMessages, llm } from "./llm";

const userMessage = process.argv[2];

if (!userMessage) {
  console.error(`Input message is required`);
  process.exit(1);
}

await addMessages([{ role: "user", content: userMessage }]);

const messages = await getMessages();

const response = await llm({ messages });

await addMessages([{ role: "assistant", content: response.content }]);

const aiResponse = await runllm({ message: userMessage });

console.log("response1:%o", response);

console.log("single-query:%o", aiResponse);
