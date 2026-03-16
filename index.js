const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

/* =========================
   TOOLS
========================= */

const tools = [
 {
  name:"get_crypto_price",
  description:"Get current cryptocurrency price"
 },
 {
  name:"get_market_overview",
  description:"Get global crypto market statistics"
 },
 {
  name:"get_trending_coins",
  description:"Top trending cryptocurrencies"
 },
 {
  name:"get_top_coins",
  description:"Largest market cap coins"
 },
 {
  name:"get_coin_info",
  description:"Detailed information about a coin"
 },
 {
  name:"get_defi_stats",
  description:"DeFi ecosystem statistics"
 }
]

const prompts = [
 {
  name:"market_briefing",
  description:"Generate crypto market briefing"
 },
 {
  name:"coin_analysis",
  description:"Analyze cryptocurrency fundamentals"
 }
]

const resources = [
 {
  name:"coingecko-api",
  description:"Public crypto market data"
 }
]

/* =========================
   MCP RESPONSE
========================= */

function mcp(agent){

 return {

  name:agent,
  version:"1.0.0",
  protocolVersion:"2025-06-18",
  description:"CoinGecko powered crypto analysis agent",
  transport:"streamable-http",

  capabilities:{

   tools:{
    list:tools
   },

   prompts:{
    list:prompts
   },

   resources:{
    list:resources
   }

  },

  status:"healthy"

 }

}

/* =========================
   MCP ENDPOINT
========================= */

app.get("/mcp",(req,res)=>{
 res.json(mcp("chainpulse-agent"))
})

app.get("/:agent/mcp",(req,res)=>{
 res.json(mcp(req.params.agent))
})

app.post("/mcp",(req,res)=>{
 res.json(mcp("chainpulse-agent"))
})

app.post("/:agent/mcp",(req,res)=>{
 res.json(mcp(req.params.agent))
})

/* =========================
   A2A
========================= */

function a2a(agent){

 return {

  name:agent,
  protocolVersion:"0.3.0",
  description:"Crypto analysis agent",

  defaultInputModes:["text"],
  defaultOutputModes:["text"],

  skills:[
   {
    id:"crypto_overview",
    name:"Crypto Overview",
    description:"Global crypto market overview"
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

 }

}

app.get("/a2a",(req,res)=>{
 res.json(a2a("chainpulse-agent"))
})

app.get("/:agent/a2a",(req,res)=>{
 res.json(a2a(req.params.agent))
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
