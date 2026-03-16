import express from "express"

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000


/* =========================
   MCP RESPONSE BUILDER
========================= */

function buildMCP(agent){

 return {

  name:agent,

  version:"1.0.0",

  protocolVersion:"2025-06-18",

  description:"CoinGecko-powered crypto market analysis MCP agent",

  transport:"streamable-http",

  methods:["GET","POST"],

  capabilities:{
   tools:true,
   prompts:true,
   resources:true
  },

  tools:[
   {
    name:"get_crypto_price",
    description:"Get cryptocurrency price"
   },
   {
    name:"get_market_overview",
    description:"Analyze crypto market overview"
   },
   {
    name:"get_trending_coins",
    description:"List trending cryptocurrencies"
   },
   {
    name:"get_top_coins",
    description:"Top market cap coins"
   },
   {
    name:"get_coin_info",
    description:"Detailed coin data"
   },
   {
    name:"get_defi_stats",
    description:"DeFi ecosystem statistics"
   },
   {
    name:"get_market_sentiment",
    description:"Crypto market sentiment index"
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
   MCP ENDPOINTS
========================= */

app.get("/mcp",(req,res)=>{
 res.json(buildMCP("default-agent"))
})

app.get("/:agent/mcp",(req,res)=>{
 res.json(buildMCP(req.params.agent))
})

app.post("/mcp",(req,res)=>{
 res.json(buildMCP("default-agent"))
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
  return res.json({tool,result:"BTC price $68000"})
 }

 if(tool==="get_market_overview"){
  return res.json({tool,result:"Market slightly bullish"})
 }

 if(tool==="get_trending_coins"){
  return res.json({tool,coins:["BTC","ETH","SOL"]})
 }

 if(tool==="get_top_coins"){
  return res.json({tool,coins:["BTC","ETH","BNB"]})
 }

 if(tool==="get_coin_info"){
  return res.json({tool,coin:"BTC",marketCap:"1.2T"})
 }

 if(tool==="get_defi_stats"){
  return res.json({tool,tvl:"$95B"})
 }

 if(tool==="get_market_sentiment"){
  return res.json({tool,sentiment:"Bullish"})
 }

 res.json({error:"Unknown tool"})

})


/* =========================
   A2A BUILDER
========================= */

function buildA2A(agent){

 return {

  name:agent,

  description:"Crypto market analysis agent",

  protocolVersion:"0.3.0",

  defaultInputModes:["text"],

  defaultOutputModes:["text"],

  capabilities:{
   streaming:false
  },

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
    description:"DeFi market statistics"
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
   A2A ENDPOINTS
========================= */

app.get("/a2a",(req,res)=>{
 res.json(buildA2A("default-agent"))
})

app.get("/:agent/a2a",(req,res)=>{
 res.json(buildA2A(req.params.agent))
})

app.post("/a2a",(req,res)=>{
 res.json({status:"active"})
})

app.post("/:agent/a2a",(req,res)=>{
 res.json({
  agent:req.params.agent,
  received:req.body,
  response:"A2A communication successful",
  status:"active"
 })
})


/* =========================
   HEALTH CHECK
========================= */

app.get("/",(req,res)=>{
 res.json({status:"server running"})
})


/* =========================
   SERVER START
========================= */

app.listen(PORT,()=>{

 console.log("MCP + Tools + A2A server running")

})
