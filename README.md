# ai-agent
Building an ai agent from scratch.

A modular AI agent framework built from scratch in TypeScript, designed to work with both LLaMA 3 via Ollama and OpenAI models. This project enables function-calling agents that can interact with external tools through a flexible plugin-style system.

Features
🧠 LLM integration:

OpenAI GPT models.

LLaMA 3 (via Ollama)

🧰 Dynamic tool registry with Zod for schema validation

🔁 Recursive reasoning and tool usage loop

📦 Simple JSON-based memory store

🔌 Easily extensible for new tools

Tech Stack
TypeScript
Node.js
Zod
OpenAI API 
Ollama (LLaMA 3)

---

## 🧠 How It Works

1. The agent prompts the model (OpenAI GPT or local LLaMA 3) with the user query and tool definitions.
2. If the model chooses a function/tool, the agent:
   - Parses the call
   - Validates the input using Zod
   - Optionally asks for human confirmation (human-in-the-loop)
   - Executes the tool and sends the result back to the model
3. This loop continues until a final response is generated.



Getting Started
1. Clone & Install

git clone https://github.com/nikhil-menneni/ai-agent

cd ai-agent
npm install

3. Set up Ollama + OpenAI
Ollama: Install from ollama.com and run:
ollama run llama3
OpenAI Key: Add your API key in an .env file:
OPENAI_API_KEY=your-key-here
