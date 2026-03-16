const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

function buildMCP(id){
 return {
  name:"repustream-agent-"+id,
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

/* MCP (UNIVERSAL) */
app.get("/mcp",(req,res)=>{
 const id = req.query.agent || "1"
 res.json(buildMCP(id))
})

/* A2A (UNIVERSAL) */
app.get("/a2a",(req,res)=>{
 const id = req.query.agent || "1"

 res.json({
  name:"repustream-agent-"+id,
  protocolVersion:"0.3.0",
  description:"Crypto analysis agent",
  skills:[
   {id:"crypto-overview"},
   {id:"trending"},
   {id:"defi"},
   {id:"analysis"}
  ]
 })
})

app.listen(PORT,()=>console.log("running "+PORT))
