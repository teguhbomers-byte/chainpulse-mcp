import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health",(req,res)=>{
  res.json({status:"ok"});
});

function createAgent(name){
  return {
    name:name,
    version:"1.0.0",
    protocolVersion:"2025-06-18",
    description:"AI blockchain analytics agent",
    transport:"streamable-http",
    methods:["POST"],
    capabilities:{
      tools:true,
      prompts:true,
      resources:true
    },
    tools:[
      "analyze_token",
      "wallet_risk",
      "detect_scam",
      "chain_activity"
    ],
    prompts:[
      "token_analysis",
      "wallet_report"
    ],
    status:"healthy"
  }
}

app.get("/:agent/mcp",(req,res)=>{
  const agentName = req.params.agent
  res.json(createAgent(agentName))
})

app.listen(PORT,()=>{
  console.log("Dynamic MCP running")
})
