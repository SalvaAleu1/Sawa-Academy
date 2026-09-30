import { ReturnClient } from "./return-client";
export default async function Return({searchParams}:{searchParams:Promise<{reference?:string}>}){const q=await searchParams;return <main className="auth-shell"><ReturnClient reference={q.reference||''}/></main>}
