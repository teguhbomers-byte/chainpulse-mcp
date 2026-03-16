const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Aktifkan CORS supaya client dari mana saja bisa akses
app.use(cors());
app.use(express.json());

/* =========================
   MCP BUILDER
========================= */
function buildMCP(agentName) {
  return {
    name: agentName || "chainpulse-agent",
    description: "CoinGecko-powered crypto market analysis agent",
    protocolVersion: "2025-06-18",
    transport: "streamable-http",
    methods: ["POST"], // Kebanyakan MCP discovery GET, tapi tool call POST-only
    defaultInputModes: ["text", "json"],
    defaultOutputModes: ["text", "json"],
    tools: [
      { id: "get_crypto_price", name: "Get Crypto Price", description: "Get cryptocurrency price in USD" },
      { id: "get_market_overview", name: "Market Overview", description: "Global crypto market stats" },
      { id: "get_trending_coins", name: "Trending Coins", description: "Top trending cryptocurrencies" },
      { id: "get_top_coins", name: "Top Coins", description: "Largest market cap coins" },
      { id: "get_coin_info", name: "Coin Info", description: "Detailed coin information incl. ATH, supply" },
      { id: "get_defi_stats", name: "DeFi Stats", description: "DeFi market statistics" }
    ],
    prompts: [
      "market_briefing",
      "coin_analysis"
    ],
    status: "healthy"
  };
}

/* =========================
   A2A BUILDER
========================= */
function buildA2A(agentName) {
  return {
    name: agentName || "chainpulse-agent",
    protocolVersion: "0.3.0",
    description: "Crypto analysis agent with A2A capabilities",
    defaultInputModes: ["text", "json"],
    defaultOutputModes: ["json"],
    skills: [
      { id: "crypto-overview", name: "Crypto Overview", description: "Global crypto market overview" },
      { id: "trending", name: "Trending Coins", description: "Top trending coins" },
      { id: "defi", name: "DeFi Statistics", description: "DeFi ecosystem stats" },
      { id: "analysis", name: "Coin Analysis", description: "Detailed coin analysis" }
    ],
    status: "active"
  };
}

/* =========================
   ENDPOINT DISCOVERY (GET)
========================= */
// Root → tampil metadata default (banyak platform expect ini)
app.get("/", (req, res) => {
  res.json(buildMCP("chainpulse-agent"));
});

// MCP discovery per agent
app.get("/:agent/mcp", (req, res) => {
  res.json(buildMCP(req.params.agent));
});

// A2A discovery per agent
app.get("/:agent/a2a", (req, res) => {
  res.json(buildA2A(req.params.agent));
});

// Health check (penting buat monitoring)
app.get("/health", (req, res) => {
  res.json({ status: "healthy", uptime: process.uptime() });
});

/* =========================
   TOOL CALL ENDPOINT (POST) - wajib ada!
========================= */
// MCP tool calling endpoint (support multi-agent via param)
app.post("/mcp/:agent?", (req, res) => {
  const agentName = req.params.agent || "chainpulse-agent";
  const body = req.body || {};

  // Log biar bisa debug di Railway
  console.log(`Tool call dari ${agentName}:`, body);

  // Contoh dummy response (nanti diganti real logic CoinGecko kalau mau)
  let result = { success: true, message: "Tool call diterima" };

  if (body.tool === "get_crypto_price" && body.args?.coin) {
    result.data = {
      coin: body.args.coin,
      price: 69420 + Math.floor(Math.random() * 5000), // dummy
      change_24h: (Math.random() * 20 - 10).toFixed(2) + "%"
    };
  }

  res.json({
    agent: agentName,
    ...result
  });
});

/* =========================
   SERVER START
========================= */
app.listen(PORT, () => {
  console.log(`ChainPulse MCP+A2A server running on port ${PORT}`);
});
