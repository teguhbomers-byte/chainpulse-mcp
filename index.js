const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())


/* =========================
   DATA
========================= */

const tools = [

 {
  name:"get_crypto_price",
  description:"Get the current USD price and 24h change for cryptocurrencies"
 },

 {
  name:"get_market_overview",
  description:"Get global crypto market stats including market cap and BTC dominance"
 },

 {
  name:"get_trending_coins",
  description:"Top trending cryptocurrencies on CoinGecko"
 },

 {
  name:"get_top_coins",
  description:"Top coins ranked by market cap"
 },

 {
  name:"get_coin_info",
  description:"Detailed information about a specific cryptocurrency"
 },

 {
  name:"get_defi_stats",
  description:"DeFi ecosystem statistics including TVL"
 }

]


const prompts = [

 {
  name:"market_briefing",
  description:"Generate a crypto market briefing"
 },

 {
  name:"coin_analysis",
  description:"Analyze cryptocurrency fundamentals"
 }

]


const resources = [

 {
  name:"coingecko-api",
  description:"Public crypto market data source"
 }

]


const skills = [

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

]



/* =========================
   MCP INFO
========================= */

function mcpInfo(agent){

 return {

  name:agent,

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

 }

}



/* =========================
   MCP GET
========================= */

app.get("/mcp",(req,res)=>{

 res.json(mcpInfo("chainpulse-agent"))

})


app.get("/:agent/mcp",(req,res)=>{

 res.json(mcpInfo(req.params.agent))

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


app.post("/:agent/mcp",(req,res)=>{

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

function a2aInfo(agent){

 return {

  name:agent,

  protocolVersion:"0.3.0",

  description:"Crypto intelligence agent",

  defaultInputModes:["text"],

  defaultOutputModes:["text"],

  skills,

  status:"active"

 }

}


app.get("/a2a",(req,res)=>{

 res.json(a2aInfo("chainpulse-agent"))

})


app.get("/:agent/a2a",(req,res)=>{

 res.json(a2aInfo(req.params.agent))

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
