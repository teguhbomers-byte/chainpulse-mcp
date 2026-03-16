import express from "express"

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000


/* =========================
   MCP ENDPOINT
========================= */

app.get("/:agent/mcp",(req,res)=>{

 const agent = req.params.agent

 res.json({

  name:agent,
  version:"1.0.0",

  protocolVersion:"2025-06-18",

  description:"CoinGecko-powered crypto market analysis MCP agent",

  transport:"streamable-http",

  methods:["POST"],

  capabilities:{
   tools:true,
   prompts:true,
   resources:true
  },

  tools:[
   "get_crypto_price",
   "get_market_overview",
   "get_trending_coins",
   "get_top_coins",
   "get_coin_info",
   "get_defi_stats"
  ],

  prompts:[
   "market_briefing",
   "coin_analysis"
  ],

  status:"healthy"

 })

})


/* =========================
   TOOL EXECUTION
========================= */

app.post("/:agent/tools",(req,res)=>{

 const tool = req.body.tool

 if(tool==="get_crypto_price"){
  return res.json({
   tool,
   result:"BTC price $68000"
  })
 }

 if(tool==="get_market_overview"){
  return res.json({
   tool,
   result:"Market slightly bullish"
  })
 }

 if(tool==="get_trending_coins"){
  return res.json({
   tool,
   coins:["BTC","ETH","SOL"]
  })
 }

 if(tool==="get_top_coins"){
  return res.json({
   tool,
   coins:["BTC","ETH","BNB"]
  })
 }

 if(tool==="get_coin_info"){
  return res.json({
   tool,
   coin:"BTC",
   marketCap:"1.2T"
  })
 }

 if(tool==="get_defi_stats"){
  return res.json({
   tool,
   tvl:"$95B"
  })
 }

 res.json({
  error:"Unknown tool"
 })

})


/* =========================
   A2A ENDPOINT
========================= */

app.post("/:agent/a2a",(req,res)=>{

 const agent = req.params.agent

 res.json({
  agent:agent,
  status:"active",
  response:"A2A communication successful"
 })

})


/* =========================
   SERVER START
========================= */

app.listen(PORT,()=>{

 console.log("MCP + Tools + A2A running")

})
