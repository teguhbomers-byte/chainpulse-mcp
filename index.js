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

  methods: ["GET","POST"],

  defaultInputModes: ["text"],

  defaultOutputModes: ["text"],

  tools: [

   { id:"get_crypto_price", name:"Get Crypto Price", description:"Get real-time cryptocurrency price" },

   { id:"get_market_overview", name:"Market Overview", description:"Analyze crypto market overview" },

   { id:"get_trending_coins", name:"Trending Coins", description:"List trending cryptocurrencies" },

   { id:"get_top_coins", name:"Top Coins", description:"Top market cap coins" },

   { id:"get_coin_info", name:"Coin Info", description:"Detailed coin data" },

   { id:"get_defi_stats", name:"DeFi Stats", description:"DeFi ecosystem statistics" }

  ],

  prompts: [

   "market_briefing",

   "coin_analysis"

  ],

  resources: [],

  status: "healthy"

 }

}


/* =========================
   MCP ENDPOINTS
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

  description: "Crypto analysis agent",

  defaultInputModes: ["text"],

  defaultOutputModes: ["text"],

  skills: [

   { id:"crypto-overview", name:"Crypto Overview", description:"Global crypto market overview" },

   { id:"trending", name:"Trending Coins", description:"Top trending cryptocurrencies" },

   { id:"defi", name:"DeFi Statistics", description:"DeFi market statistics" },

   { id:"analysis", name:"Coin Analysis", description:"Detailed coin analysis" }

  ],

  status: "active"

 }

}


/* =========================
   A2A ENDPOINTS
========================= */

app.get("/a2a",(req,res)=>{
 res.json(buildA2A("chainpulse-agent"))
})

app.get("/:agent/a2a",(req,res)=>{
 res.json(buildA2A(req.params.agent))
})

app.post("/:agent/a2a",(req,res)=>{
 res.json({
  agent: req.params.agent,
  status: "active",
  response: "A2A communication successful"
 })
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

 console.log("ChainPulse MCP server running on port " + PORT)

})
