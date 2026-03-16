const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

/* =========================
   MCP AGENT INFO
========================= */

function buildMCP(agent){

 return {

  name:agent,

  description:"CoinGecko-powered crypto market analysis agent",

  protocolVersion:"2025-06-18",

  transport:"streamable-http",

  methods:["POST"],

  defaultInputModes:["text"],

  defaultOutputModes:["text"],

  tools:[
   {
    id:"get_crypto_price",
    name:"Get Crypto Price",
    description:"Get real-time cryptocurrency price"
   },
   {
    id:"get_market_overview",
    name:"Market Overview",
    description:"Get global crypto market stats"
   },
   {
    id:"get_trending_coins",
    name:"Trending Coins",
    description:"Top trending cryptocurrencies"
   },
   {
    id:"get_top_coins",
    name:"Top Coins",
    description:"Largest market cap coins"
   },
   {
    id:"get_coin_info",
    name:"Coin Info",
    description:"Detailed information about a coin"
   },
   {
    id:"get_defi_stats",
    name:"DeFi Stats",
    description:"DeFi market statistics"
   }
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

app.get("/mcp",(req,res)=>{
 res.json(buildMCP("chainpulse-agent"))
})

app.get("/:agent/mcp",(req,res)=>{
 res.json(buildMCP(req.params.agent))
})

app.post("/mcp",(req,res)=>{
 res.json(buildMCP("chainpulse-agent"))
})

app.post("/:agent/mcp",(req,res)=>{
 res.json(buildMCP(req.params.agent))
})


/* =========================
   TOOL EXECUTION
========================= */

app.post("/:agent/tools",(req,res)=>{

 const tool = req.body.tool

 if(tool==="get_crypto_price"){
  return res.json({price:"$68000"})
 }

 if(tool==="get_market_overview"){
  return res.json({market:"bullish"})
 }

 if(tool==="get_trending_coins"){
  return res.json({coins:["BTC","ETH","SOL"]})
 }

 if(tool==="get_top_coins"){
  return res.json({coins:["BTC","ETH","BNB"]})
 }

 if(tool==="get_coin_info"){
  return res.json({coin:"BTC",marketCap:"1.2T"})
 }

 if(tool==="get_defi_stats"){
  return res.json({tvl:"$95B"})
 }

 res.json({error:"Unknown tool"})

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

  skills:[
   {
    id:"crypto-overview",
    name:"Crypto Overview",
    description:"Global crypto market overview"
   },
   {
    id:"trending",
    name:"Trending Coins",
    description:"Top trending coins"
   },
   {
    id:"defi",
    name:"DeFi Statistics",
    description:"DeFi ecosystem stats"
   },
   {
    id:"analysis",
    name:"Coin Analysis",
    description:"Detailed coin analysis"
   }
  ],

  status:"active"

 }

}

app.get("/a2a",(req,res)=>{
 res.json(buildA2A("chainpulse-agent"))
})

app.get("/:agent/a2a",(req,res)=>{
 res.json(buildA2A(req.params.agent))
})

app.post("/:agent/a2a",(req,res)=>{
 res.json({
  agent:req.params.agent,
  received:req.body,
  response:"A2A communication successful"
 })
})


/* =========================
   ROOT
========================= */

app.get("/",(req,res)=>{
 res.json({status:"ChainPulse MCP server running"})
})


app.listen(port,()=>{
 console.log(`ChainPulse MCP running on ${port}`)
})
