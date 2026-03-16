const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MCP Builder (sama seperti punyamu, tapi ditambah defaultInput/Output lebih lengkap)
function buildMCP(agentName) {
  return {
    name: agentName || "chainpulse-agent",
    description: "CoinGecko-powered crypto market analysis agent",
    protocolVersion: "2025-06-18",
    transport: "streamable-http",
    methods: ["POST"], // Tool call biasanya POST, discovery GET
    defaultInputModes: ["text", "json"],
    defaultOutputModes: ["text", "json"],
    tools: [
      {id: "get_crypto_price", name: "Get Crypto Price", description: "Get cryptocurrency price in USD"},
      {id: "get_market_overview", name: "Market Overview", description: "Global crypto market stats"},
      {id: "get_trending_coins", name: "Trending Coins", description: "Top trending cryptocurrencies"},
      {id: "get_top_coins", name: "Top Coins", description: "Largest market cap coins"},
      {id: "get_coin_info", name: "Coin Info", description: "Detailed coin information incl. ATH, supply"},
      {id: "get_defi_stats", name: "DeFi Stats", description: "DeFi market statistics"}
    ],
    prompts: [
      "market_briefing",
      "coin_analysis"
    ],
    status: "healthy"
  };
}

// A2A Builder (sama)
function buildA2A(agentName) {
  return {
    name: agentName || "chainpulse-agent",
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

// Root: MCP metadata default (ini yang paling sering di-test platform)
app.get("/", (req, res) => {
  res.json(buildMCP("chainpulse-agent"));
});

// MCP discovery global (tambahkan ini biar /mcp nggak 404)
app.get("/mcp", (req, res) => {
  res.json(buildMCP("chainpulse-agent"));
});

// MCP per agent
app.get("/:agent/mcp", (req, res) => {
  res.json(buildMCP(req.params.agent));
});

// A2A global
app.get("/a2a", (req, res) => {
  res.json(buildA2A("chainpulse-agent"));
});

// A2A per agent
app.get("/:agent/a2a", (req, res) => {
  res.json(buildA2A(req.params.agent));
});

// POST MCP tool call (wajib! biar MCP bisa execute 4 skills)
app.post("/mcp", (req, res) => {
  const body = req.body || {};
  console.log("MCP POST received:", body);

  // Dummy response untuk test (ganti nanti dengan real CoinGecko)
  res.json({
    status: "success",
    message: "Tool call processed",
    tool: body.tool || "unknown",
    result: { example: "Dummy data from server" }
  });
});

// Health check (buat monitoring)
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
