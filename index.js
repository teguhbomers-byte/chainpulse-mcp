const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MCP Builder – format lebih standar biar tools/prompts terbaca
function buildMCP(agentName = "chainpulse-agent") {
  return {
    name: agentName,
    description: "CoinGecko-powered crypto market analysis MCP agent",
    version: "1.0.0",
    protocolVersion: "2025-06-18",
    transport: "streamable-http",
    methods: ["POST"],
    capabilities: {
      tools: true,
      prompts: true,
      resources: true
    },
    tools: [
      {
        id: "get_crypto_price",
        name: "Get Crypto Price",
        description: "Get current USD price and 24h change for one or more cryptocurrencies",
        input_schema: { type: "object", properties: { coin: { type: "string" } } }
      },
      {
        id: "get_market_overview",
        name: "Market Overview",
        description: "Get global crypto market stats: total market cap, BTC dominance, active coins",
        input_schema: { type: "object", properties: {} }
      },
      {
        id: "get_trending_coins",
        name: "Trending Coins",
        description: "Get top trending cryptocurrencies in the last 24 hours",
        input_schema: { type: "object", properties: {} }
      },
      {
        id: "get_top_coins",
        name: "Top Coins",
        description: "Get top coins ranked by market cap",
        input_schema: { type: "object", properties: {} }
      },
      {
        id: "get_coin_info",
        name: "Coin Info",
        description: "Get detailed information about a specific coin",
        input_schema: { type: "object", properties: { coin: { type: "string" } } }
      },
      {
        id: "get_defi_stats",
        name: "DeFi Stats",
        description: "Get DeFi market cap, dominance, and top DeFi coins",
        input_schema: { type: "object", properties: {} }
      }
    ],
    prompts: [
      {
        name: "market_briefing",
        description: "Generate a concise crypto market briefing using live CoinGecko data"
      },
      {
        name: "coin_analysis",
        description: "Produce a structured analysis of a specific coin using its CoinGecko data"
      }
    ],
    resources: true,  // Tambah ini biar "resources" terdeteksi
    status: "healthy"
  };
}

// A2A Builder (tetap, karena sudah aman)
function buildA2A(agentName = "chainpulse-agent") {
  return {
    name: agentName,
    protocolVersion: "0.3.0",
    description: "Crypto analysis agent with A2A capabilities",
    defaultInputModes: ["text", "json"],
    defaultOutputModes: ["json"],
    skills: [
      {id: "crypto-overview", name: "Crypto Overview", description: "Global crypto market overview"},
      {id: "trending", name: "Trending Coins", description: "Top trending coins"},
      {id: "defi", name: "DeFi Statistics", description: "DeFi ecosystem stats"},
      {id: "analysis", name: "Coin Analysis", description: "Detailed coin analysis"}
    ],
    status: "active"
  };
}

// Root: MCP metadata utama (ini yang paling sering di-test)
app.get("/", (req, res) => {
  res.json(buildMCP());
});

// /mcp: fallback kalau platform nyari path ini
app.get("/mcp", (req, res) => {
  res.json(buildMCP());
});

// Per agent
app.get("/:agent/mcp", (req, res) => {
  res.json(buildMCP(req.params.agent));
});

// A2A
app.get("/a2a", (req, res) => {
  res.json(buildA2A());
});

app.get("/:agent/a2a", (req, res) => {
  res.json(buildA2A(req.params.agent));
});

// POST MCP (tool call execution)
app.post("/mcp", (req, res) => {
  const body = req.body || {};
  res.json({
    status: "success",
    tool: body.tool || "unknown",
    result: "Processed (dummy for now)"
  });
});

// Health
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
