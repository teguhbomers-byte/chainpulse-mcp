const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

const tools = [
 {name:"get_crypto_price",description:"Get crypto price"},
 {name:"get_market_overview",description:"Market overview"},
 {name:"get_trending_coins",description:"Trending coins"},
 {name:"get_top_coins",description:"Top coins"},
 {name:"get_coin_info",description:"Coin information"},
 {name:"get_defi_stats",description:"DeFi statistics"}
]

const prompts = [
 {name:"market_briefing",description:"Generate market briefing"},
 {name:"coin_analysis",description:"Analyze coin"}
]

const resources = [
 {name:"coingecko",description:"Crypto market data"}
]

/* MCP INFO */

app.get("/mcp",(req,res)=>{
 res.json({
  name:"chainpulse-agent",
  version:"1.0.0",
  protocolVersion:"2025-06-18",
  capabilities:{
   tools:{},
   prompts:{},
   resources:{}
  }
 })
})

/* MCP RPC */

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

/* A2A */

app.get("/a2a",(req,res)=>{
 res.json({
  name:"chainpulse-agent",
  protocolVersion:"0.3.0",
  skills:[
   {id:"crypto",name:"Crypto Overview"},
   {id:"trending",name:"Trending Coins"},
   {id:"defi",name:"DeFi Stats"},
   {id:"analysis",name:"Coin Analysis"}
  ]
 })
})

app.listen(PORT,()=>{
 console.log("Server running "+PORT)
})
