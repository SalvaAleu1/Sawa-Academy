import { ensureDb,sql } from "@/lib/db";
import { SettingsForm } from "./settings-form";
export const dynamic="force-dynamic";
export default async function Settings(){
  await ensureDb();
  const rows=await sql!`SELECT key,value FROM academy_settings` as any[];
  const settings=Object.fromEntries(rows.map(r=>[r.key,r.value]));
  const status={
    database:true,
    ai:Boolean(process.env.AI_API_KEY&&process.env.AI_MODEL),
    payments:process.env.PAYMENTS_ENABLED==="true",
    appUrl:process.env.NEXT_PUBLIC_APP_URL||"Not configured"
  };
  return <div><span className="eyebrow">Platform</span><h1>Settings & service status</h1><p>Manage non-secret academy preferences here. API keys and database credentials remain protected in Cloudflare runtime secrets.</p>
    <div className="admin-metrics status-metrics">
      <div className="card"><h3>Database</h3><strong className="status-good">Connected</strong><p>Neon production database</p></div>
      <div className="card"><h3>AI services</h3><strong className={status.ai?"status-good":"status-warn"}>{status.ai?"Configured":"Needs configuration"}</strong><p>{process.env.AI_MODEL||"No model configured"}</p></div>
      <div className="card"><h3>Payments</h3><strong className={status.payments?"status-good":"status-warn"}>{status.payments?"Enabled":"Disabled"}</strong><p>Enable only after bank gateway testing</p></div>
      <div className="card"><h3>Application URL</h3><strong className="settings-url">{status.appUrl}</strong></div>
    </div>
    <div className="card settings-card"><h2>Academy preferences</h2><SettingsForm settings={settings}/></div>
  </div>;
}
