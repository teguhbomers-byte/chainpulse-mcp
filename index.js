const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

/* ================= MCP ================= */
function buildMCP(id){
 return {
  name:`chainpulse-${id}`,
  version:"1.0.0",
  protocolVersion:"2025-06-18",
  description:`ChainPulse MCP agent ${id}`,
  transport:"streamable-http",
  methods:["POST"],

  capabilities:{
   tools:true,
   prompts:true,
   resources:true
  },

  tools:[
   "chat",
   "get_agent_info",
   "get_crypto_price",
   "get_wallet_balance",
   "get_gas_price",
   "get_token_info",
   "search_web",
   "search_knowledge",
   "get_trending_tokens",
   "swap_quote",
   "get_portfolio",
   "get_defi_stats",
   "get_market_overview"
  ],

  prompts:[
   "greeting",
   "help",
   "analysis",
   "report"
  ],

  status:"healthy"
 }
}

/* MCP ROUTE (MEERKAT STYLE) */
app.get("/mcp/:id",(req,res)=>{
 res.json(buildMCP(req.params.id))
})


/* ================= A2A ================= */
function buildA2A(id){
 return {
  name:`ChainPulse ${id}`,
  description:"Advanced AI agent for crypto, automation, and intelligence",
  url:`https://chainpulse-mcp-production.up.railway.app/agents/${id}`,
  version:"1.0.0",

  defaultInputModes:["text"],
  defaultOutputModes:["text"],

  authentication:{
   schemes:["x402"],
   description:"Optional micropayment"
  },

  skills:[
   {id:"chatbot",name:"Chatbot",description:"Conversational AI",tags:["chat","ai"]},
   {id:"nlp",name:"NLP",description:"Text understanding",tags:["nlp","text"]},
   {id:"text_gen",name:"Text Generation",description:"Generate text",tags:["ai","text"]},
   {id:"analysis",name:"Data Analysis",description:"Analyze data",tags:["data","analysis"]},
   {id:"crypto",name:"Crypto Analysis",description:"Analyze crypto",tags:["crypto","trading"]},
   {id:"prediction",name:"Market Prediction",description:"Predict trends",tags:["market"]},
   {id:"search",name:"Search",description:"Search info",tags:["search"]},
   {id:"web",name:"Web Search",description:"Internet search",tags:["web"]},
   {id:"knowledge",name:"Knowledge",description:"Retrieve knowledge",tags:["db"]},
   {id:"automation",name:"Automation",description:"Automate tasks",tags:["automation"]},
   {id:"workflow",name:"Workflow",description:"Pipeline automation",tags:["workflow"]},
   {id:"problem",name:"Problem Solving",description:"Solve problems",tags:["logic"]},
   {id:"qa",name:"Q&A",description:"Answer questions",tags:["qa"]},
   {id:"code",name:"Coding",description:"Generate code",tags:["dev"]},
   {id:"blockchain",name:"Blockchain",description:"Blockchain knowledge",tags:["crypto"]},
   {id:"contract",name:"Smart Contract",description:"Analyze contracts",tags:["contract"]},
   {id:"token",name:"Token Analysis",description:"Token metrics",tags:["token"]},
   {id:"portfolio",name:"Portfolio",description:"Track assets",tags:["portfolio"]},
   {id:"trading",name:"Trading",description:"Trading insights",tags:["trade"]},
   {id:"defi",name:"DeFi",description:"Analyze DeFi",tags:["defi"]},
   {id:"onchain",name:"On-chain",description:"Blockchain data",tags:["onchain"]},
   {id:"report",name:"Report",description:"Generate reports",tags:["report"]},
   {id:"forecast",name:"Forecast",description:"Future prediction",tags:["forecast"]},
   {id:"insight",name:"Insights",description:"Data insights",tags:["insight"]}
  ],

  capabilities:{
   streaming:false,
   pushNotifications:false,
   stateTransitionHistory:false
  },

  provider:{
   organization:"ChainPulse",
   url:"https://chainpulse.app"
  },

  x402:{
   supported:true,
   network:"eip155:8453",
   price:"Free",
   currency:"USDC"
  }
 }
}

/* A2A ROUTE (WAJIB FORMAT INI) */
app.get("/agents/:id/.well-known/agent-card.json",(req,res)=>{
 res.json(buildA2A(req.params.id))
})


/* ================= ROOT ================= */
app.get("/",(req,res)=>{
 res.send("ChainPulse MCP + A2A running")
})


app.listen(PORT,()=>{
 console.log("Server running on "+PORT)
})
