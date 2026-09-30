import { createHmac, timingSafeEqual } from "node:crypto";

const env = (name:string, fallback="") => process.env[name] || fallback;
export const paymentsEnabled = () => env("PAYMENTS_ENABLED","false").toLowerCase()==="true";
const field=(obj:any,path:string)=>path.split(".").reduce((v,k)=>v?.[k],obj);

export async function createBankPayment(input:{reference:string;amount:number;currency:string;courseTitle:string;customer:{name:string;email:string}}){
  if(!paymentsEnabled()) throw new Error("Card payments are not available yet.");
  const base=env("BANK_API_BASE_URL").replace(/\/$/,""); if(!base) throw new Error("Bank gateway is not configured.");
  const app=env("NEXT_PUBLIC_APP_URL").replace(/\/$/,"");
  const payload={merchantId:env("BANK_MERCHANT_ID"),reference:input.reference,amount:input.amount,currency:input.currency,description:`Sawa Academy — ${input.courseTitle}`,customer:input.customer,returnUrl:`${app}/payment/return?reference=${encodeURIComponent(input.reference)}`,callbackUrl:`${app}/api/payment/webhook`};
  const res=await fetch(`${base}${env("BANK_CREATE_PAYMENT_PATH","/payments")}`,{method:"POST",headers:{"content-type":"application/json","authorization":`Bearer ${env("BANK_API_KEY")}`,"x-api-secret":env("BANK_API_SECRET")},body:JSON.stringify(payload)});
  const data=await res.json().catch(()=>({})); if(!res.ok) throw new Error((data as any).message||"The bank could not start the payment.");
  const checkoutUrl=field(data,env("BANK_CHECKOUT_URL_FIELD","checkoutUrl")); const paymentId=field(data,env("BANK_PAYMENT_ID_FIELD","id"));
  if(!checkoutUrl||!paymentId) throw new Error("Bank response is missing the configured checkout URL or payment ID field.");
  return {checkoutUrl:String(checkoutUrl),paymentId:String(paymentId),raw:data};
}
export async function verifyBankPayment(paymentId:string){
  const base=env("BANK_API_BASE_URL").replace(/\/$/,""); const path=env("BANK_VERIFY_PAYMENT_PATH","/payments/{id}").replace("{id}",encodeURIComponent(paymentId));
  const res=await fetch(`${base}${path}`,{headers:{"authorization":`Bearer ${env("BANK_API_KEY")}`,"x-api-secret":env("BANK_API_SECRET")}}); const data=await res.json().catch(()=>({}));
  if(!res.ok) throw new Error("Unable to verify payment with the bank."); const status=String(field(data,env("BANK_STATUS_FIELD","status"))||"").toLowerCase();
  const success=env("BANK_SUCCESS_STATUSES","paid,completed,successful,success").split(",").map(s=>s.trim().toLowerCase()).includes(status); return {success,status,raw:data};
}
export function verifyWebhook(raw:string, signature:string|null){
  const secret=env("BANK_WEBHOOK_SECRET"); if(!secret) return true; if(!signature) return false;
  const expected=createHmac("sha256",secret).update(raw).digest("hex"); const a=Buffer.from(expected); const b=Buffer.from(signature); return a.length===b.length && timingSafeEqual(a,b);
}
