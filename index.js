const express = require("express")

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())


/* =========================
   MCP BUILDER
========================= */

function buildMCP(agent){

 return {

  name:agent,

  description:"CoinGecko-powered crypto market analysis agent",

  protocolVersion:"2025-06-18",

  transport:"streamable-http",

  methods:["GET","POST"],

  defaultInputModes:["text"],

  defaultOutputModes:["text"],

  tools:[
   {id:"get_crypto_price",name:"Get Crypto Price",description:"Get cryptocurrency price"},
   {id:"get_market_overview",name:"Market Overview",description:"Crypto market overview"},
   {id:"get_trending_coins",name:"Trending Coins",description:"Trending cryptocurrencies"},
   {id:"get_top_coins",name:"Top Coins",description:"Largest market cap coins"},
   {id:"get_coin_info",name:"Coin Info",description:"Detailed coin information"},
   {id:"get_defi_stats",name:"DeFi Stats",description:"DeFi market statistics"}
  ],

  prompts:[
   "market_briefing",
   "coin_analysis"
  ],

  status:"healthy"

 }

}


/* =========================
   MCP ENDPOINT
========================= */

app.get("/:agent/mcp",(req,res)=>{
 res.json(buildMCP(req.params.agent))
})


/* =========================
   A2A BUILDER
========================= */

function buildA2A(agent){

 return {

  name:agent,

  protocolVersion:"0.3.0",

  description:"Crypto analysis agent",

  defaultInputModes:["text"],

  defaultOutputModes:["text"],

  skills:[
   {id:"crypto-overview",name:"Crypto Overview",description:"Global crypto market overview"},
   {id:"trending",name:"Trending Coins",description:"Top trending coins"},
   {id:"defi",name:"DeFi Statistics",description:"DeFi ecosystem stats"},
   {id:"analysis",name:"Coin Analysis",description:"Detailed coin analysis"}
  ],

  status:"active"

 }

}


/* =========================
   A2A ENDPOINT
========================= */

app.get("/:agent/a2a",(req,res)=>{
 res.json(buildA2A(req.params.agent))
})


/* =========================
   ROOT
========================= */

app.get("/",(req,res)=>{
 res.json({status:"ChainPulse MCP server running"})
})


app.listen(PORT,()=>{
 console.log("Server running on port "+PORT)
})
