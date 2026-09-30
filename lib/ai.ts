export async function aiText(system:string, user:string, json=false){
  const base=(process.env.AI_API_BASE_URL||"https://api.openai.com/v1").replace(/\/$/,"");
  const key=process.env.AI_API_KEY; const model=process.env.AI_MODEL;
  if(!key||!model) throw new Error("AI is not configured yet.");
  const body:any={model,messages:[{role:"system",content:system},{role:"user",content:user}],temperature:0.3};
  if(json) body.response_format={type:"json_object"};
  const res=await fetch(`${base}/chat/completions`,{method:"POST",headers:{"content-type":"application/json","authorization":`Bearer ${key}`},body:JSON.stringify(body)});
  if(!res.ok) throw new Error(`AI provider error (${res.status})`);
  const data=await res.json() as any; return data.choices?.[0]?.message?.content?.trim()||"";
}
