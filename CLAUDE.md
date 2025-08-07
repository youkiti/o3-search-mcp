# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the gpt5-search-mcp project - an MCP (Model Context Protocol) server that enables AI agents to perform intelligent web searches using OpenAI's gpt-5 model. It allows any AI coding agent to autonomously consult with the gpt-5 model to solve complex problems.

## Key Commands

### Build
```bash
pnpm build
```
Compiles TypeScript code to JavaScript in the `build/` directory and sets executable permissions on the output.

### Install Dependencies
```bash
pnpm install
```

### Publishing
```bash
pnpm prepublishOnly
```
Runs the build command before publishing to npm.

## Architecture

### Core Components

1. **MCP Server Implementation** (`index.ts`):
   - Uses `@modelcontextprotocol/sdk` for MCP server functionality
   - Implements a single tool `gpt5-search` that interfaces with OpenAI's gpt-5 model
   - Communicates via StdioServerTransport for stdin/stdout communication

2. **Configuration Management**:
   - Environment variables control all configuration:
     - `OPENAI_API_KEY` (required)
     - `SEARCH_CONTEXT_SIZE` (low/medium/high, default: medium)
     - `REASONING_EFFORT` (low/medium/high, default: medium)
     - `TEXT_VERBOSITY` (low/medium/high, default: medium)
     - `REASONING_SUMMARY` (auto/detailed/concise, default: auto)
     - `OPENAI_API_TIMEOUT` (milliseconds, default: 60000)
     - `OPENAI_MAX_RETRIES` (default: 3)

3. **Tool Implementation**:
   - Single tool `gpt5-search` accepts natural language input
   - Uses OpenAI's responses API with web_search_preview tool including user location
   - Configurable text format and verbosity settings
   - Enhanced reasoning with summary options
   - Returns text responses with error handling

### Technical Stack

- **Language**: TypeScript (ES2022 target)
- **Package Manager**: pnpm (v10.10.0)
- **Module System**: ES Modules
- **Build System**: TypeScript compiler with strict mode enabled
- **Dependencies**:
  - `@modelcontextprotocol/sdk`: MCP protocol implementation
  - `openai`: OpenAI API client
  - `zod`: Runtime type validation

### Distribution

- Published as npm package `gpt5-search-mcp`
- Provides CLI binary executable via npx
- Supports both global installation and local development

## Important Notes

- The project requires appropriate OpenAI API access permissions for gpt-5 model
- The server runs as a standalone process communicating via stdio
- All outputs are JSON-RPC formatted for MCP protocol compliance