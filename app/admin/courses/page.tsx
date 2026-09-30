import { getCourses } from "@/lib/db"; import { CoursesClient } from "./courses-client";
export const dynamic="force-dynamic";
export default async function AdminCourses(){const cs=await getCourses(true);return <div><span className="eyebrow">Catalogue</span><h1>Courses</h1><p>Review course drafts before publishing them to learners.</p><CoursesClient courses={cs}/></div>}
