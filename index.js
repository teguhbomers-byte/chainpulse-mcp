import express from "express"

const app = express()

app.use(express.json())

app.get("/", (req,res)=>{
  res.send("MCP server running")
})

app.get("/health",(req,res)=>{
  res.json({status:"ok"})
})

app.post("/mcp",(req,res)=>{

res.json({
"name":"chainpulse-mcp",
"version":"1.0.0",
"protocolVersion":"2025-06-18",
"description":"Crypto analysis MCP agent",
"transport":"streamable-http",
"methods":["POST"],
"capabilities":{
"tools":true,
"prompts":true,
"resources":true
},
"tools":[
"get_crypto_price",
"get_market_overview",
"get_trending_coins",
"get_top_coins"
],
"prompts":[
"market_briefing",
"coin_analysis"
],
"status":"healthy"
})

})

app.listen(process.env.PORT || 3000, ()=>{
console.log("MCP running")
})
