#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import OpenAI from "openai";
import { z } from "zod";

// Create server instance
const server = new McpServer({
  name: "gpt5-search-mcp",
  version: "0.0.1",
});

// Configuration from environment variables
const config = {
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: parseInt(process.env.OPENAI_MAX_RETRIES || "3"),
  timeout: parseInt(process.env.OPENAI_API_TIMEOUT || "60000"),
  searchContextSize: (process.env.SEARCH_CONTEXT_SIZE || "medium") as
    | "low"
    | "medium"
    | "high",
  reasoningEffort: (process.env.REASONING_EFFORT || "medium") as
    | "low"
    | "medium"
    | "high",
  textVerbosity: (process.env.TEXT_VERBOSITY || "medium") as
    | "low"
    | "medium"
    | "high",
  reasoningSummary: (process.env.REASONING_SUMMARY || "auto") as
    | "auto"
    | "detailed"
    | "concise",
};

// Initialize OpenAI client with retry and timeout configuration
const openai = new OpenAI({
  apiKey: config.apiKey,
  maxRetries: config.maxRetries,
  timeout: config.timeout,
});

// Define the gpt5-search tool
server.tool(
  "gpt5-search",
  `An AI agent with advanced web search capabilities powered by GPT-5. Useful for finding the latest information, troubleshooting errors, and discussing ideas or design challenges. Supports natural language queries.`,
  {
    input: z
      .string()
      .describe(
        "Ask questions, search for information, or consult about complex problems in English.",
      ),
  },
  async ({ input }) => {
    try {
      const response = await openai.responses.create({
        model: "gpt-5",
        input: [{
          type: "message",
          content: input,
          role: "user"
        }],
        text: {
          format: {
            type: "text"
          }
        },
        reasoning: {
          effort: config.reasoningEffort,
          summary: config.reasoningSummary
        },
        tools: [
          {
            type: "web_search_preview",
            user_location: {
              type: "approximate"
            },
            search_context_size: config.searchContextSize
          }
        ],
        store: false
      });

      return {
        content: [
          {
            type: "text",
            text: response.output_text || "No response text available.",
          },
        ],
      };
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
          },
        ],
      };
    }
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
