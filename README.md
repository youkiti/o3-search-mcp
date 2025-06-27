# o3-search-mcp

An MCP (Model Context Protocol) server that provides web search capabilities using OpenAI's o3 model.

## Features

- Advanced web search functionality through OpenAI o3 model
- Natural language query support
- Configurable search context size and reasoning effort
- Error handling and graceful fallbacks

## Installation

```bash
# Clone the repository
git clone https://github.com/yoshiko-pg/o3-search-mcp.git
cd o3-search-mcp

# Install dependencies
pnpm install

# Build the project
pnpm run build
```

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Set your OpenAI API key in `.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

3. Optional: Configure search parameters:
```
SEARCH_CONTEXT_SIZE=medium  # Options: low, medium, high (default: medium)
REASONING_EFFORT=medium     # Options: low, medium, high (default: medium)
```

## Usage

This MCP server exposes a single tool called `o3-search` that accepts text queries and returns AI-powered search results.

### With Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "o3-search": {
      "command": "node",
      "args": ["/path/to/o3-search-mcp/build/index.js"],
      "env": {
        "OPENAI_API_KEY": "your_openai_api_key_here"
      }
    }
  }
}
```

### Tool Description

- **Name**: `o3-search`
- **Description**: An AI agent with advanced web search capabilities. Useful for finding latest information and troubleshooting errors. Supports natural language queries.
- **Input**: `input` (string) - Your query in English

## Development

```bash
# Build
pnpm run build

# TypeScript watch mode (if configured)
pnpm run dev
```

## Requirements

- Node.js 18+
- pnpm
- OpenAI API key with access to o3 model

## License

ISC
