import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req,res)=>{
  res.json({status:"ok"});
});

app.get("/mcp",(req,res)=>{
  res.json({
    name:"chainpulse-agent",
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
      "get_wallet_risk",
      "analyze_token",
      "detect_scam",
      "chain_activity"
    ],
    prompts:[
      "wallet_analysis",
      "token_risk_report"
    ],
    status:"healthy"
  });
});

app.listen(PORT,()=>{
  console.log("MCP running");
});
