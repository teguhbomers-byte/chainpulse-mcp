const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

function buildMCP(agentId){
 return {
  name:"repustream-agent-"+agentId,
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
 }
}

/* MCP */
app.get("/agent-:id/mcp",(req,res)=>{
 const id = req.params.id
 res.json(buildMCP(id))
})

/* A2A */
app.get("/agent-:id/a2a",(req,res)=>{
 const id = req.params.id
 res.json({
  name:"repustream-agent-"+id,
  protocolVersion:"0.3.0",
  description:"Crypto analysis agent",
  defaultInputModes:["text"],
  defaultOutputModes:["text"],
  skills:[
   {id:"crypto-overview",name:"Crypto Overview"},
   {id:"trending",name:"Trending Coins"},
   {id:"defi",name:"DeFi Statistics"},
   {id:"analysis",name:"Coin Analysis"}
  ],
  status:"active"
 })
})

app.get("/",(req,res)=>{
 res.json({status:"server running"})
})

app.listen(PORT,()=>{
 console.log("server running on "+PORT)
})
