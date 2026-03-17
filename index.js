const express = require("express")
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

/* ================= WALLET ================= */
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

function cleanId(id){
 return id.replace("agent-","")
}

/* ================= MCP BUILD ================= */

function buildCapabilities(){
 return {
  tools:{ listChanges:true },
  prompts:{ listChanges:true },
  resources:{ listChanges:true }
 }
}

function buildTools(){
 return {
  tools:[
   {
    name:"chat",
    description:"Conversational AI",
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
    description:"Get crypto price",
    inputSchema:{
     type:"object",
     properties:{
      symbol:{type:"string"}
     },
     required:["symbol"]
    }
   }
  ]
 }
}

function buildPrompts(){
 return {
  prompts:[
   { name:"greeting", description:"Say hello" },
   { name:"help", description:"Show help" }
  ]
 }
}

function buildResources(){
 return { resources:[] }
}

/* ================= MCP ================= */
app.all("/mcp/:id",(req,res)=>{
 const id = req.params.id

 if (!wallets[id]){
  return res.status(404).json({ error:"Agent not found" })
 }

 // GET = discovery
 if (req.method === "GET"){
  return res.json({
   name:`chainpulse-${cleanId(id)}`,
   version:"2025-06-18",
   protocolVersion:"2025-06-18",
   transport:"http",
   methods:["POST"],
   capabilities: buildCapabilities()
  })
 }

 // POST = JSON-RPC
 const body = req.body

 if (!body || body.jsonrpc !== "2.0"){
  return res.json({
   jsonrpc:"2.0",
   error:{ code:-32600, message:"Invalid Request" },
   id:null
  })
 }

 let result = null

 switch(body.method){

  case "initialize":
   result = {
    capabilities: buildCapabilities(),
    serverVersion:"2025-06-18"
   }
   break

  case "tools/list":
   result = buildTools()
   break

  case "prompts/list":
   result = buildPrompts()
   break

  case "resources/list":
   result = buildResources()
   break

  case "tools/call":
   const name = body.params?.name
   const args = body.params?.arguments || {}

   if (name === "chat"){
    result = {
     content:[{ type:"text", text:`Hello ${args.message || ""} 🚀` }]
    }
   }
   else if (name === "get_crypto_price"){
    result = {
     content:[{ type:"text", text:`Price: $99999` }]
    }
   }
   else{
    return res.json({
     jsonrpc:"2.0",
     error:{ code:-32601, message:"Method not found" },
     id:body.id
    })
   }
   break

  default:
   return res.json({
    jsonrpc:"2.0",
    error:{ code:-32601, message:"Method not found" },
    id:body.id
   })
 }

 return res.json({
  jsonrpc:"2.0",
  result,
  id:body.id
 })
})

/* ================= A2A ================= */
app.get("/agents/:id/.well-known/agent-card.json",(req,res)=>{
 const id = req.params.id
 const clean = cleanId(id)

 res.json({
  name:`ChainPulse ${clean}`,
  description:"Advanced AI agent for crypto, automation, and intelligence",
  url:`https://chainpulse-mcp-production.up.railway.app/agents/${id}`,
  version:"0.3.0",

  defaultInputModes:["text"],
  defaultOutputModes:["text"],

  skills:[
   {
    id:"chat",
    name:"Chat Assistant",
    description:"Conversational AI for user interaction",
    tags:["chat","ai"]
   },
   {
    id:"crypto_analysis",
    name:"Crypto Analysis",
    description:"Analyze tokens, trends, and market data",
    tags:["crypto","analysis","trading"]
   },
   {
    id:"market_insight",
    name:"Market Insight",
    description:"Generate insights and predictions",
    tags:["market","insight"]
   },
   {
    id:"defi_tools",
    name:"DeFi Tools",
    description:"Access DeFi analytics and stats",
    tags:["defi","onchain"]
   }
  ],

  capabilities:{
   streaming:false,
   pushNotifications:false,
   stateTransitionHistory:false
  },

  provider:{
   organization:"ChainPulse",
   url:"https://chainpulse.app"
  }
 })
})

/* ================= ROOT ================= */
app.get("/",(req,res)=>{
 res.send("MCP READY 🚀")
})

app.listen(PORT,()=>{
 console.log("Server running on "+PORT)
})
