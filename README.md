# o3-search-mcp

An MCP server that brings the power of OpenAI's o3 model to your AI agents, enabling them to perform intelligent web searches with natural language queries.

<a href="https://glama.ai/mcp/servers/@yoshiko-pg/o3-search-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@yoshiko-pg/o3-search-mcp/badge" alt="o3-search MCP server" />
</a>

## Usage Examples

Once installed, your AI agent can use the `o3-search` tool to perform web searches.
For instance, try giving instructions like this:

### 🐛 When debugging gets tough
Use "ask o3" to find solutions from GitHub issues and Stack Overflow:
```
"I'm getting a 'Module not found' error in Next.js 14. Ask o3 for recent solutions"
"Debug this WebSocket connection issue. Try asking o3 for help"
```

### 🧩 When tackling complex tasks
Add "consult o3 if you get stuck" to your requests:
```
"Implement a distributed caching system with Redis. If you encounter difficulties, consult o3"
"Create a real-time collaborative editor. Ask o3 for help if you get stuck"
```

### 📚 For latest library info and migration guides
Stay up-to-date with "ask o3":
```
"How do I migrate from React Router v5 to v6? Ask o3 for the latest migration guide"
"What's the current best practice for state management in React? Ask o3 for recent recommendations"
```

When you make a request to your coding agent, it can autonomously consult o3 by using the MCP interface to exchange natural language queries and responses. Your agent and o3 work together in real time to help you solve problems.

## Installation

### Using npx (Recommended)

Claude Code:

```
$ claude mcp add o3 -s user \
	-e OPENAI_API_KEY=your-api-key \
	-e SEARCH_CONTEXT_SIZE=medium \
	-e REASONING_EFFORT=medium \
	-e OPENAI_API_TIMEOUT=60000 \
	-e OPENAI_MAX_RETRIES=3 \
	-- npx o3-search-mcp
```

json:

```jsonc
{
  "mcpServers": {
    "o3-search": {
      "command": "npx",
      "args": ["o3-search-mcp"],
      "env": {
        "OPENAI_API_KEY": "your-api-key",
        // Optional: low, medium, high (default: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium",
        // Optional: API timeout in milliseconds (default: 60000)
        "OPENAI_API_TIMEOUT": "60000",
        // Optional: Maximum retry attempts (default: 3)
        "OPENAI_MAX_RETRIES": "3"
      }
    }
  }
}
```

### Local Development Setup

If you want to download and run the code locally:

```bash
# setup
git clone git@github.com:yoshiko-pg/o3-search-mcp.git
cd o3-search-mcp
pnpm install
pnpm build
```

Claude Code:

```
$ claude mcp add o3 -s user \
	-e OPENAI_API_KEY=your-api-key \
	-e SEARCH_CONTEXT_SIZE=medium \
	-e REASONING_EFFORT=medium \
	-e OPENAI_API_TIMEOUT=60000 \
	-e OPENAI_MAX_RETRIES=3 \
	-- node /path/to/o3-search-mcp/build/index.js
```

json:

```jsonc
{
  "mcpServers": {
    "o3-search": {
      "command": "node",
      "args": ["/path/to/o3-search-mcp/build/index.js"],
      "env": {
        "OPENAI_API_KEY": "your-api-key",
        // Optional: low, medium, high (default: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium",
        // Optional: API timeout in milliseconds (default: 60000)
        "OPENAI_API_TIMEOUT": "60000",
        // Optional: Maximum retry attempts (default: 3)
        "OPENAI_MAX_RETRIES": "3"
      }
    }
  }
}
```

## Configuration

### Environment Variables

- **OPENAI_API_KEY** (required): Your OpenAI API key
- **SEARCH_CONTEXT_SIZE** (optional): Controls the search context size
  - Values: `low`, `medium`, `high`
  - Default: `medium`
- **REASONING_EFFORT** (optional): Controls the reasoning effort level
  - Values: `low`, `medium`, `high`
  - Default: `medium`
- **OPENAI_API_TIMEOUT** (optional): API request timeout in milliseconds
  - Default: `60000` (60 seconds)
  - Example: `120000` for 2 minutes
- **OPENAI_MAX_RETRIES** (optional): Maximum number of retry attempts for failed requests
  - Default: `3`
  - The SDK automatically retries on rate limits (429), server errors (5xx), and connection errors