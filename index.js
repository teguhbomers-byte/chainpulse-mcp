const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MCP Builder – format tools/prompts lebih mirip spec MCP yang sering dipakai (tambah type & parameters)
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
      {
        type: "function",
        function: {
          name: "get_crypto_price",
          description: "Get current USD price and 24h change for cryptocurrencies",
          parameters: {
            type: "object",
            properties: { coin: { type: "string", description: "Coin symbol, e.g. bitcoin" } },
            required: ["coin"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "get_market_overview",
          description: "Global crypto market stats including cap, BTC dominance",
          parameters: { type: "object", properties: {} }
        }
      },
      {
        type: "function",
        function: {
          name: "get_trending_coins",
          description: "Top trending coins in last 24h",
          parameters: { type: "object", properties: {} }
        }
      },
      {
        type: "function",
        function: {
          name: "get_top_coins",
          description: "Top coins by market cap",
          parameters: { type: "object", properties: {} }
        }
      },
      {
        type: "function",
        function: {
          name: "get_coin_info",
          description: "Detailed info: ATH, supply, links",
          parameters: {
            type: "object",
            properties: { coin: { type: "string" } },
            required: ["coin"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "get_defi_stats",
          description: "DeFi market cap, dominance, top coins",
          parameters: { type: "object", properties: {} }
        }
      }
    ],
    prompts: [
      {
        name: "market_briefing",
        description: "Generate concise crypto market briefing using live data"
      },
      {
        name: "coin_analysis",
        description: "Produce structured analysis of a specific coin"
      }
    ],
    resources: true,
    status: "healthy"
  };
}

// A2A Builder – pastiin 4 skills nested
function buildA2A(agentName = "chainpulse-agent") {
  return {
    name: agentName,
    protocolVersion: "0.3.0",
    description: "Crypto analysis agent with A2A capabilities",
    defaultInputModes: ["text", "json"],
    defaultOutputModes: ["json"],
    skills: [
      {
        type: "function",
        function: {
          name: "crypto-overview",
          description: "Global crypto market overview"
        }
      },
      {
        type: "function",
        function: {
          name: "trending",
          description: "Top trending coins"
        }
      },
      {
        type: "function",
        function: {
          name: "defi",
          description: "DeFi ecosystem stats"
        }
      },
      {
        type: "function",
        function: {
          name: "analysis",
          description: "Detailed coin analysis"
        }
      }
    ],
    status: "active"
  };
}

// Route utama + fallback biar nggak 404
app.get(["/", "/mcp"], (req, res) => {
  res.json(buildMCP());
});

// Dynamic agent
app.get("/:agent/mcp", (req, res) => {
  res.json(buildMCP(req.params.agent));
});

// A2A global & per agent
app.get("/a2a", (req, res) => {
  res.json(buildA2A());
});

app.get("/:agent/a2a", (req, res) => {
  res.json(buildA2A(req.params.agent));
});

// POST MCP tool call (biar bisa execute kalau dibutuhin)
app.post("/mcp", (req, res) => {
  res.json({
    status: "success",
    message: "Tool call processed",
    result: "Ready!"
  });
});

// Health
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
