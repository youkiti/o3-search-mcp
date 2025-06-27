# o3-search-mcp

An MCP (Model Context Protocol) server that provides web search capabilities using OpenAI's o3 model. The `o3-search` tool accepts text queries and returns AI-powered search results.

## Installation

```json
{
  "mcpServers": {
    "o3-search": {
      "command": "npx",
      "args": ["o3-search-mcp"],
      "env": {
        "OPENAI_API_KEY": "your-api-key",
        // Optional: low, medium, high (default: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium"
      }
    }
  }
}

```