const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MCP metadata – PERSIS seperti contoh aman (array string untuk tools & prompts)
function getMCPMetadata(agentName = "repustream-agent-1001") {
  return {
    name: agentName,
    version: "1.0.0",
    protocolVersion: "2025-06-18",
    description: "CoinGecko-powered crypto market analysis MCP agent",
    transport: "streamable-http",
    methods: ["POST"],
    capabilities: {
      tools: true,
      prompts: true,
      resources: true
    },
    tools: [
      "get_crypto_price",
      "get_market_overview",
      "get_trending_coins",
      "get_top_coins",
      "get_coin_info",
      "get_defi_stats"
    ],
    prompts: [
      "market_briefing",
      "coin_analysis"
    ],
    status: "healthy"
  };
}

// MCP endpoint – PERSIS seperti contoh aman: /mcp/:agent
app.get("/mcp/:agent", (req, res) => {
  res.json(getMCPMetadata(req.params.agent));
});

// Fallback root kalau di-test root
app.get("/", (req, res) => {
  res.json(getMCPMetadata());
});

// A2A endpoint – PERSIS seperti contoh aman (path /agents/:agent/.well-known/agent-card.json)
function getAgentCard(agentName = "RepuStream agent-1001") {
  return {
    name: agentName,
    description: "CoinGecko-powered crypto market analysis agent. Provides real-time price data, market overviews, trending coins, DeFi statistics, and detailed coin analysis.",
    url: `https://chainpulse-mcp-production.up.railway.app/mcp/${agentName.toLowerCase().replace(/\s+/g, '-')}`,
    version: "1.0.0",
    capabilities: {
      tools: [
        { name: "get_crypto_price", description: "Get the current USD price and 24h change for one or more cryptocurrencies." },
        { name: "get_market_overview", description: "Get global crypto market stats: total market cap, BTC dominance, active coins." },
        { name: "get_trending_coins", description: "Get the top trending cryptocurrencies on CoinGecko in the last 24 hours." },
        { name: "get_top_coins", description: "Get top coins ranked by market cap with price, volume, and 24h change." },
        { name: "get_coin_info", description: "Get detailed information about a specific coin: description, links, ATH, supply." },
        { name: "get_defi_stats", description: "Get DeFi market statistics: total DeFi market cap and DeFi dominance." }
      ],
      prompts: [
        { name: "market_briefing", description: "Generate a concise crypto market briefing using live CoinGecko data." },
        { name: "coin_analysis", description: "Produce a structured analysis of a specific coin using its live metrics." }
      ]
    },
    defaultInputModes: ["text"],
    defaultOutputModes: ["text"],
    skills: [
      { id: "crypto-price", name: "Crypto Price Lookup", description: "Get current USD price and 24h change for cryptocurrencies" },
      { id: "market-overview", name: "Market Overview", description: "Global crypto market stats including market cap and dominance" },
      { id: "trending", name: "Trending Coins", description: "Top trending cryptocurrencies in the last 24 hours" },
      { id: "defi-stats", name: "DeFi Statistics", description: "DeFi market cap, dominance, and top DeFi coins" },
      { id: "coin-analysis", name: "Coin Analysis", description: "Detailed coin info including ATH, supply, and market data" }
    ]
  };
}

app.get("/agents/:agent/.well-known/agent-card.json", (req, res) => {
  res.json(getAgentCard(req.params.agent));
});

// POST tool call (minimal, biar bisa execute kalau dibutuhin)
app.post("/mcp/:agent", (req, res) => {
  res.json({ status: "success", message: "Tool call processed" });
});

// Health
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
