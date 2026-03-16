import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health",(req,res)=>{
  res.json({status:"ok"});
});

/* MCP metadata */

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

/* SKILLS EXECUTION */

app.post("/:agent/tools/:tool",(req,res)=>{

  const tool = req.params.tool
  const input = req.body

  if(tool === "analyze_token"){
    return res.json({
      tool,
      result:"Token analysis complete",
      risk:"low",
      score:85
    })
  }

  if(tool === "wallet_risk"){
    return res.json({
      tool,
      result:"Wallet risk checked",
      risk:"medium",
      score:60
    })
  }

  if(tool === "detect_scam"){
    return res.json({
      tool,
      result:"No scam detected",
      confidence:"92%"
    })
  }

  if(tool === "chain_activity"){
    return res.json({
      tool,
      result:"Chain activity analyzed",
      transactions:124
    })
  }

  res.json({error:"Unknown tool"})
})

/* A2A communication */

app.post("/:agent/a2a",(req,res)=>{

  const agentName = req.params.agent
  const body = req.body

  res.json({
    agent:agentName,
    received:body,
    response:"A2A communication successful",
    status:"active"
  })

})

app.listen(PORT,()=>{
  console.log("MCP + Skills + A2A running")
})
