const express = require("express")

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())


/* =========================
   MCP BUILDER
========================= */

function buildMCP(agent){

 return {

  name: agent,

  version: "1.0.0",

  protocolVersion: "2025-06-18",

  description: "CoinGecko-powered crypto market analysis MCP agent",

  transport: "streamable-http",

  methods: ["POST"],

  capabilities: {

   tools: [

    {
     name: "get_crypto_price",
     description: "Get current USD price and 24h change for cryptocurrency"
    },

    {
     name: "get_market_overview",
     description: "Get global crypto market statistics"
    },

    {
     name: "get_trending_coins",
     description: "Top trending cryptocurrencies"
    },

    {
     name: "get_top_coins",
     description: "Top coins ranked by market cap"
    },

    {
     name: "get_coin_info",
     description: "Detailed information about specific coin"
    },

    {
     name: "get_defi_stats",
     description: "DeFi ecosystem statistics"
    }

   ],

   prompts: [

    {
     name: "market_briefing",
     description: "Generate crypto market briefing"
    },

    {
     name: "coin_analysis",
     description: "Analyze crypto coin fundamentals"
    }

   ],

   resources: [

    {
     name: "coingecko",
     description: "CoinGecko public API resource"
    }

   ]

  },

  status: "healthy"

 }

}


/* =========================
   MCP ENDPOINT
========================= */

app.get("/mcp",(req,res)=>{

 res.json(buildMCP("chainpulse-agent"))

})

app.post("/mcp",(req,res)=>{

 res.json(buildMCP("chainpulse-agent"))

})

app.get("/:agent/mcp",(req,res)=>{

 res.json(buildMCP(req.params.agent))

})

app.post("/:agent/mcp",(req,res)=>{

 res.json(buildMCP(req.params.agent))

})


/* =========================
   A2A BUILDER
========================= */

function buildA2A(agent){

 return {

  name: agent,

  protocolVersion: "0.3.0",

  description: "Crypto intelligence multi-agent endpoint",

  defaultInputModes: ["text"],

  defaultOutputModes: ["text"],

  skills: [

   {
    id: "crypto_overview",
    name: "Crypto Overview",
    description: "Global cryptocurrency market overview"
   },

   {
    id: "trending_coins",
    name: "Trending Coins",
    description: "Top trending cryptocurrencies"
   },

   {
    id: "defi_statistics",
    name: "DeFi Statistics",
    description: "DeFi market cap and ecosystem metrics"
   },

   {
    id: "coin_analysis",
    name: "Coin Analysis",
    description: "Detailed cryptocurrency analysis"
   }

  ],

  status: "active"

 }

}


/* =========================
   A2A ENDPOINT
========================= */

app.get("/a2a",(req,res)=>{

 res.json(buildA2A("chainpulse-agent"))

})

app.get("/:agent/a2a",(req,res)=>{

 res.json(buildA2A(req.params.agent))

})


/* =========================
   ROOT
========================= */

app.get("/",(req,res)=>{

 res.json({status:"ChainPulse MCP server running"})

})


/* =========================
   START SERVER
========================= */

app.listen(PORT,()=>{

 console.log("ChainPulse MCP running on port "+PORT)

})
