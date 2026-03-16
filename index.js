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

  tools: [

   {
    name: "get_crypto_price",
    description: "Get current USD price and 24h change for cryptocurrency",
    inputSchema:{
     type:"object",
     properties:{
      coin:{type:"string"}
     }
    }
   },

   {
    name: "get_market_overview",
    description: "Get global crypto market statistics"
   },

   {
    name: "get_trending_coins",
    description: "Get top trending cryptocurrencies on CoinGecko"
   },

   {
    name: "get_top_coins",
    description: "Get top coins ranked by market cap"
   },

   {
    name: "get_coin_info",
    description: "Get detailed information about specific coin"
   },

   {
    name: "get_defi_stats",
    description: "Get DeFi market statistics"
   }

  ],

  prompts:[
   {
    name:"market_briefing",
    description:"Generate crypto market briefing"
   },
   {
    name:"coin_analysis",
    description:"Analyze crypto coin fundamentals"
   }
  ],

  resources:[],

  status:"healthy"

 }

}


/* =========================
   MCP ENDPOINT
========================= */

app.get("/mcp",(req,res)=>{
 res.json(buildMCP("chainpulse-agent"))
})

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

  skills:[

   {
    id:"crypto-overview",
    name:"Crypto Overview",
    description:"Global crypto market overview"
   },

   {
    id:"trending",
    name:"Trending Coins",
    description:"Top trending cryptocurrencies"
   },

   {
    id:"defi",
    name:"DeFi Statistics",
    description:"DeFi ecosystem statistics"
   },

   {
    id:"analysis",
    name:"Coin Analysis",
    description:"Detailed token analysis"
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
 res.json({status:"ChainPulse MCP running"})
})


app.listen(PORT,()=>{
 console.log("Server running on port "+PORT)
})
