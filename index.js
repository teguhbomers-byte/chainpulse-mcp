const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())


/* =========================
   MCP RESPONSE
========================= */

function buildMCP(agent){

 return {

  name: agent,

  version: "1.0.0",

  protocolVersion: "2025-06-18",

  description: "CoinGecko-powered crypto market analysis agent",

  transport: "streamable-http",

  methods: ["POST"],

  capabilities:{
   tools:true,
   prompts:true,
   resources:true
  },

  tools:[

   {
    name:"get_crypto_price",
    description:"Get current USD price and 24h change for one or more cryptocurrencies.",
    inputSchema:{
     type:"object",
     properties:{
      coin:{type:"string"}
     }
    }
   },

   {
    name:"get_market_overview",
    description:"Get global crypto market stats: total market cap, BTC dominance, active coins."
   },

   {
    name:"get_trending_coins",
    description:"Get the top trending cryptocurrencies on CoinGecko in the last 24 hours."
   },

   {
    name:"get_top_coins",
    description:"Get top coins ranked by market cap with price, volume, and 24h change."
   },

   {
    name:"get_coin_info",
    description:"Get detailed information about a specific coin: description, links, ATH, supply."
   },

   {
    name:"get_defi_stats",
    description:"Get DeFi market statistics: total DeFi market cap and DeFi dominance."
   }

  ],

  prompts:[

   {
    name:"market_briefing",
    description:"Generate a concise crypto market briefing using live CoinGecko data."
   },

   {
    name:"coin_analysis",
    description:"Analyze a cryptocurrency including price trends, fundamentals, and sentiment."
   }

  ],

  resources:[
   {
    name:"coingecko-api",
    description:"Live crypto data from CoinGecko API"
   }
  ],

  status:"healthy"

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
   A2A RESPONSE
========================= */

function buildA2A(agent){

 return {

  name:agent,

  protocolVersion:"0.3.0",

  description:"Crypto intelligence agent",

  defaultInputModes:["text"],

  defaultOutputModes:["text"],

  skills:[

   {
    id:"crypto-overview",
    name:"Crypto Overview",
    description:"Global cryptocurrency market overview"
   },

   {
    id:"trending-coins",
    name:"Trending Coins",
    description:"Top trending cryptocurrencies in last 24 hours"
   },

   {
    id:"defi-stats",
    name:"DeFi Statistics",
    description:"DeFi market cap, TVL, and ecosystem data"
   },

   {
    id:"coin-analysis",
    name:"Coin Analysis",
    description:"Detailed token data including price, ATH, supply"
   },

   {
    id:"sentiment",
    name:"Market Sentiment",
    description:"Crypto market sentiment analysis"
   }

  ],

  status:"active"

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

 console.log("ChainPulse MCP server running on port "+PORT)

})
