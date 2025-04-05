import "dotenv/config";
import { runAgent } from "./agent";
import { tools } from "./tools";

const userMessage = process.argv[2];

if (!userMessage) {
  console.error(`Input message is required`);
  process.exit(1);
}

const messages = await runAgent({ userMessage, tools });
