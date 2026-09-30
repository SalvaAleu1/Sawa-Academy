const wait=(ms:number)=>new Promise(r=>setTimeout(r,ms));

export async function aiText(system:string,user:string,json=false){
  const base=(process.env.AI_API_BASE_URL||"https://api.openai.com/v1").replace(/\/$/,"");
  const key=process.env.AI_API_KEY;
  const model=process.env.AI_MODEL;
  if(!key||!model) throw new Error("AI tutor is not configured yet.");

  const body:any={model,messages:[{role:"system",content:system},{role:"user",content:user}],temperature:0.3};
  if(json) body.response_format={type:"json_object"};

  let res:Response|null=null;
  for(let attempt=0;attempt<2;attempt++){
    res=await fetch(`${base}/chat/completions`,{
      method:"POST",
      headers:{"content-type":"application/json","authorization":`Bearer ${key}`},
      body:JSON.stringify(body)
    });
    if(res.status!==429||attempt===1)break;
    await wait(900);
  }

  if(!res) throw new Error("AI tutor is temporarily unavailable.");
  if(!res.ok){
    if(res.status===429) throw new Error("AI tutor is temporarily unavailable because the AI service limit has been reached. Please try again later.");
    if(res.status===401||res.status===403) throw new Error("AI tutor is temporarily unavailable because the AI service is not authorized.");
    throw new Error("AI tutor is temporarily unavailable. Please try again later.");
  }

  const data=await res.json() as any;
  return data.choices?.[0]?.message?.content?.trim()||"";
}
