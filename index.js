const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

/* ================= WALLET MAPPING ================= */
const wallets = {
 "agent-1": "0xbBb9d1d143D1F6ebb5387bb651880921ED938a02",
 "agent-2": "0x02F35dBc798fc95da35a2fE30EeA8351Ff47Cba2",
 "agent-3": "0x86076922B2bEE998886a80306C5723468CFcA5B7",
 "agent-4": "0xDc8Ada09c6240EB978ea8aAC041BFF69B25Dc669",
 "agent-5": "0xA21b18060eeD19A0878D879aECE41B37F1d31742",
 "agent-6": "0x9a9043C39DF5f99e85027B4eb86B389bC91F019A",
 "agent-7": "0x11fb6B53Ca7CD55aaf1435D0C52A9826E3101E23",
 "agent-8": "0xDF83c9C866C00E1C4A5fd1962AAEbeAA2a245a4C",
 "agent-9": "0x4eE926Ae607085e7416260EC15fd2830c9B76261",
 "agent-10": "0x5038E2c2b32db1e598E75171F7E5A19407F438b0"
}

/* helper */
function cleanId(id){
 return id.replace("agent-","")
}

/* ================= MCP ================= */
function buildMCP(id){
 const clean = cleanId(id)

 return {
  name:`chainpulse-${clean}`,
  version:"2025-06-18",
  protocolVersion:"2025-06-18",
  description:`ChainPulse MCP agent ${clean}`,
  transport:"http",
  methods:["POST"],

  capabilities:{
   tools:true,
   prompts:true,
   resources:true
  },

  tools:[
 {
  name:"chat",
  description:"Conversational AI assistant",
  inputSchema:{
   type:"object",
   properties:{
    message:{type:"string"}
   },
   required:["message"]
  }
 },
 {
  name:"get_crypto_price",
  description:"Get latest crypto price",
  inputSchema:{
   type:"object",
   properties:{
    symbol:{type:"string"}
   },
   required:["symbol"]
  }
 },
 {
  name:"get_wallet_balance",
  description:"Check wallet balance",
  inputSchema:{
   type:"object",
   properties:{
    address:{type:"string"}
   },
   required:["address"]
  }
 },
 {
  name:"get_gas_price",
  description:"Get current gas price",
  inputSchema:{
   type:"object",
   properties:{}
  }
 },
 {
  name:"search_web",
  description:"Search information from internet",
  inputSchema:{
   type:"object",
   properties:{
    query:{type:"string"}
   },
   required:["query"]
  }
 },
 {
  name:"get_token_info",
  description:"Get token details",
  inputSchema:{
   type:"object",
   properties:{
    contract:{type:"string"}
   },
   required:["contract"]
  }
 },
 {
  name:"get_trending_tokens",
  description:"Get trending crypto tokens",
  inputSchema:{
   type:"object",
   properties:{}
  }
 },
 {
  name:"get_portfolio",
  description:"Analyze crypto portfolio",
  inputSchema:{
   type:"object",
   properties:{
    address:{type:"string"}
   },
   required:["address"]
  }
 },
 {
  name:"get_defi_stats",
  description:"Get DeFi statistics",
  inputSchema:{
   type:"object",
   properties:{}
  }
 },
 {
  name:"get_market_overview",
  description:"Get overall crypto market data",
  inputSchema:{
   type:"object",
   properties:{}
  }
],

prompts:[
 {
  name:"greeting",
  description:"Basic greeting prompt"
 },
 {
  name:"help",
  description:"Show available commands"
 },
 {
  name:"analysis",
  description:"Analyze crypto project or token"
 },
 {
  name:"report",
  description:"Generate crypto market report"
 }
],

  status:"healthy"
 }
}

app.get("/mcp/:id",(req,res)=>{
 res.json(buildMCP(req.params.id))
})

app.post("/mcp/:id",(req,res)=>{
 res.json(buildMCP(req.params.id))
})

/* ================= A2A ================= */
function buildA2A(id){
 const clean = cleanId(id)

 return {
  name:`ChainPulse ${clean}`,
  description:"Advanced AI agent for crypto, automation, and intelligence",
  url:`https://chainpulse-mcp-production.up.railway.app/agents/${id}`,
  version:"0.3.0",

  defaultInputModes:["text"],
  defaultOutputModes:["text"],

  authentication:{
   schemes:["x402"],
   description:"Optional micropayment"
  },

  skills:[
   {id:"chatbot",name:"Chatbot"},
   {id:"crypto",name:"Crypto Analysis"},
   {id:"analysis",name:"Data Analysis"}
  ],

  capabilities:{
   streaming:false
  }
 }
}

app.get("/agents/:id/.well-known/agent-card.json",(req,res)=>{
 res.json(buildA2A(req.params.id))
})

/* ================= INDEX AUTO ================= */
app.get("/agent/:id",(req,res)=>{
 const id = req.params.id

 if (!wallets[id]) {
  return res.status(400).json({ error: "Wallet not found for " + id })
 }

 return res.json({
  type:"https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
  active:true,

  services:[
   {
    name:"MCP",
    version:"2025-06-18",
    endpoint:`https://chainpulse-mcp-production.up.railway.app/mcp/${id}`,
    transport:"http"
   },
   {
    name:"A2A",
    version:"0.3.0",
    endpoint:`https://chainpulse-mcp-production.up.railway.app/agents/${id}/.well-known/agent-card.json`,
    transport:"http"
   }
  ],

  registrations:[
   {
    address: wallets[id],
    chainId:8453
   }
  ],

  supportedTrust:["basic"]
 })
})

/* ================= ROOT ================= */
app.get("/",(req,res)=>{
 res.send("ChainPulse mapping ready")
})

app.listen(PORT,()=>{
 console.log("Server running on "+PORT)
})
