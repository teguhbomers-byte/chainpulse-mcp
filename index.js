const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MCP Builder (sama seperti punyamu, ditambah detail biar lebih standar)
function buildMCP(agentName = "chainpulse-agent") {
  return {
    name: agentName,
    description: "CoinGecko-powered crypto market analysis agent",
    protocolVersion: "2025-06-18",
    transport: "streamable-http",
    methods: ["POST"], // Tool call POST, discovery GET
    defaultInputModes: ["text", "json"],
    defaultOutputModes: ["text", "json"],
    tools: [
      {id: "get_crypto_price", name: "Get Crypto Price", description: "Get cryptocurrency price"},
      {id: "get_market_overview", name: "Market Overview", description: "Crypto market overview"},
      {id: "get_trending_coins", name: "Trending Coins", description: "Trending cryptocurrencies"},
      {id: "get_top_coins", name: "Top Coins", description: "Largest market cap coins"},
      {id: "get_coin_info", name: "Coin Info", description: "Detailed coin information"},
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
function buildA2A(agentName = "chainpulse-agent") {
  return {
    name: agentName,
    protocolVersion: "0.3.0",
    description: "Crypto analysis agent",
    defaultInputModes: ["text", "json"],
    defaultOutputModes: ["text", "json"],
    skills: [
      {id: "crypto-overview", name: "Crypto Overview", description: "Global crypto market overview"},
      {id: "trending", name: "Trending Coins", description: "Top trending coins"},
      {id: "defi", name: "DeFi Statistics", description: "DeFi ecosystem stats"},
      {id: "analysis", name: "Coin Analysis", description: "Detailed coin analysis"}
    ],
    status: "active"
  };
}

// Root: MCP metadata default (ini sering dicoba platform dulu)
app.get("/", (req, res) => {
  res.json(buildMCP());
});

// Tambah ini biar /mcp nggak 404 lagi
app.get("/mcp", (req, res) => {
  res.json(buildMCP());
});

// MCP per agent (kalau platform support dynamic)
app.get("/:agent/mcp", (req, res) => {
  res.json(buildMCP(req.params.agent));
});

// A2A global & per agent (sudah aman dari screenshot-mu)
app.get("/a2a", (req, res) => {
  res.json(buildA2A());
});

app.get("/:agent/a2a", (req, res) => {
  res.json(buildA2A(req.params.agent));
});

// POST untuk MCP tool call (wajib biar MCP bisa "execute" skills, bukan cuma discovery)
app.post("/mcp", (req, res) => {
  const body = req.body || {};
  console.log("MCP tool call:", body); // Debug di Railway logs

  // Dummy response untuk test (nanti upgrade ke real CoinGecko)
  res.json({
    status: "success",
    agent: "chainpulse-agent",
    tool: body.tool || "unknown",
    result: "Processed successfully (dummy data)"
  });
});

// Optional: POST per agent kalau perlu
app.post("/:agent/mcp", (req, res) => {
  const agent = req.params.agent || "chainpulse-agent";
  res.json({
    status: "success",
    agent: agent,
    message: "Tool call received for this agent"
  });
});

// Health buat monitoring
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
