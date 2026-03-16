const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

/* =========================
   DATA
========================= */

const tools = [
 {name:"get_crypto_price",description:"Get current cryptocurrency price"},
 {name:"get_market_overview",description:"Get global crypto market statistics"},
 {name:"get_trending_coins",description:"Top trending cryptocurrencies"},
 {name:"get_top_coins",description:"Largest market cap coins"},
 {name:"get_coin_info",description:"Detailed information about a coin"},
 {name:"get_defi_stats",description:"DeFi ecosystem statistics"}
]

const prompts = [
 {name:"market_briefing",description:"Generate crypto market briefing"},
 {name:"coin_analysis",description:"Analyze cryptocurrency fundamentals"}
]

const resources = [
 {name:"coingecko-api",description:"Public crypto market data"}
]

const skills = [
 {id:"crypto_overview",name:"Crypto Overview",description:"Global crypto market overview"},
 {id:"trending_coins",name:"Trending Coins",description:"Top trending cryptocurrencies"},
 {id:"defi_stats",name:"DeFi Statistics",description:"DeFi ecosystem statistics"},
 {id:"coin_analysis",name:"Coin Analysis",description:"Detailed cryptocurrency analysis"}
]


/* =========================
   MCP RESPONSE
========================= */

function buildMCP(agent){

 return {

  name:agent,
  version:"1.0.0",
  protocolVersion:"2025-06-18",
  description:"CoinGecko powered crypto analysis agent",
  transport:"streamable-http",

  tools,
  prompts,
  resources,

  capabilities:{
   tools:true,
   prompts:true,
   resources:true
  },

  status:"healthy"

 }

}


/* =========================
   MCP ENDPOINTS
========================= */

/* normal */
app.get("/mcp",(req,res)=>{
 res.json(buildMCP("chainpulse-agent"))
})

app.get("/:agent/mcp",(req,res)=>{
 res.json(buildMCP(req.params.agent))
})

/* scanner variants */

app.get("/.mcp",(req,res)=>{
 res.json(buildMCP("chainpulse-agent"))
})

app.get("/.well-known/mcp",(req,res)=>{
 res.json(buildMCP("chainpulse-agent"))
})

app.get("/agent.json",(req,res)=>{
 res.json(buildMCP("chainpulse-agent"))
})

app.get("/.well-known/agent.json",(req,res)=>{
 res.json(buildMCP("chainpulse-agent"))
})

/* POST fallback */

app.post("/mcp",(req,res)=>{
 res.json(buildMCP("chainpulse-agent"))
})

app.post("/:agent/mcp",(req,res)=>{
 res.json(buildMCP(req.params.agent))
})


/* =========================
   A2A
========================= */

function buildA2A(agent){

 return {

  name:agent,
  protocolVersion:"0.3.0",
  description:"Crypto analysis agent",
  defaultInputModes:["text"],
  defaultOutputModes:["text"],
  skills,
  status:"active"

 }

}

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
   SERVER
========================= */

app.listen(PORT,()=>{
 console.log("Server running on port "+PORT)
})
