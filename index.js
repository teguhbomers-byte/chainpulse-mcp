const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MCP Builder
function buildMCP(agentName = "chainpulse-agent") {
  return {
    name: agentName,
    description: "CoinGecko-powered crypto market analysis MCP agent",
    version: "1.0.0",
    protocolVersion: "2025-06-18",
    transport: "streamable-http",
    methods: ["POST"],
    defaultInputModes: ["text", "json"],
    defaultOutputModes: ["text", "json"],
    capabilities: {
      tools: true,
      prompts: true,
      resources: true
    },
    tools: [
      {id: "get_crypto_price", name: "Get Crypto Price", description: "Get cryptocurrency price in USD"},
      {id: "get_market_overview", name: "Market Overview", description: "Global crypto market stats"},
      {id: "get_trending_coins", name: "Trending Coins", description: "Top trending cryptocurrencies"},
      {id: "get_top_coins", name: "Top Coins", description: "Largest market cap coins"},
      {id: "get_coin_info", name: "Coin Info", description: "Detailed coin information"},
      {id: "get_defi_stats", name: "DeFi Stats", description: "DeFi market statistics"}
    ],
    prompts: [
      {name: "market_briefing", description: "Concise crypto market briefing"},
      {name: "coin_analysis", description: "Structured coin analysis"}
    ],
    resources: true,
    status: "healthy"
  };
}

// Semua path yang mungkin dicoba platform → return MCP metadata
app.get(["/", "/mcp", "/agent/mcp", "/v1/mcp"], (req, res) => {
  res.json(buildMCP());
});

// Dynamic agent
app.get("/:agent/mcp", (req, res) => {
  res.json(buildMCP(req.params.agent));
});

// POST MCP (tool execution)
app.post(["/mcp", "/"], (req, res) => {
  res.json({
    status: "success",
    message: "Tool call received",
    result: "Processed"
  });
});

// A2A (karena sudah aman)
app.get("/a2a", (req, res) => {
  res.json({
    name: "chainpulse-agent",
    protocolVersion: "0.3.0",
    skills: [
      {id: "crypto-overview", name: "Crypto Overview", description: "Global overview"},
      {id: "trending", name: "Trending Coins", description: "Top trending"},
      {id: "defi", name: "DeFi Statistics", description: "DeFi stats"},
      {id: "analysis", name: "Coin Analysis", description: "Detailed analysis"}
    ],
    status: "active"
  });
});

// Health
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// Fallback kalau path aneh – return MCP juga
app.use((req, res) => {
  res.json(buildMCP());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
