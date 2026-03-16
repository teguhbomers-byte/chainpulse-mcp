const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

/* =========================
   DATA
========================= */

const tools = [
 {name:"get_crypto_price",description:"Get current crypto price"},
 {name:"get_market_overview",description:"Global crypto market overview"},
 {name:"get_trending_coins",description:"Top trending cryptocurrencies"},
 {name:"get_top_coins",description:"Top market cap coins"},
 {name:"get_coin_info",description:"Detailed coin information"},
 {name:"get_defi_stats",description:"DeFi ecosystem statistics"}
]

const prompts = [
 {name:"market_briefing",description:"Generate crypto market briefing"},
 {name:"coin_analysis",description:"Analyze cryptocurrency fundamentals"}
]

const resources = [
 {name:"coingecko-api",description:"Public crypto market data"}
]


/* =========================
   MCP INFO (GET)
========================= */

app.get("/mcp",(req,res)=>{

 res.json({
  name:"chainpulse-agent",
  version:"1.0.0",
  protocolVersion:"2025-06-18",
  description:"CoinGecko-powered crypto market analysis agent",
  transport:"streamable-http",
  methods:["GET","POST"],
  capabilities:{
   tools:true,
   prompts:true,
   resources:true
  },
  status:"healthy"
 })

})


/* =========================
   MCP RPC
========================= */

app.post("/mcp",(req,res)=>{

 const method = req.body?.method

 if(method==="tools/list"){

  return res.json({tools})

 }

 if(method==="prompts/list"){

  return res.json({prompts})

 }

 if(method==="resources/list"){

  return res.json({resources})

 }

 res.json({status:"ok"})

})


/* =========================
   A2A
========================= */

app.get("/a2a",(req,res)=>{

 res.json({

  name:"chainpulse-agent",

  protocolVersion:"0.3.0",

  description:"Crypto intelligence agent",

  skills:[

   {
    id:"crypto_overview",
    name:"Crypto Overview",
    description:"Global cryptocurrency market overview"
   },

   {
    id:"trending_coins",
    name:"Trending Coins",
    description:"Top trending cryptocurrencies"
   },

   {
    id:"defi_stats",
    name:"DeFi Statistics",
    description:"DeFi ecosystem statistics"
   },

   {
    id:"coin_analysis",
    name:"Coin Analysis",
    description:"Detailed cryptocurrency analysis"
   }

  ],

  status:"active"

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

 console.log("Server running on port "+PORT)

})
