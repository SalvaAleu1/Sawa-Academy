import { neon } from "@neondatabase/serverless";
import { starterCourses, starterLessons, starterModules } from "./seed";
import type { Course, Lesson, Module, User } from "./types";

const url = process.env.DATABASE_URL;
export const sql = url ? neon(url) : null;
let initialized = false;

export async function ensureDb() {
  if (!sql) throw new Error("DATABASE_URL is not configured");
  if (initialized) return;

  await sql`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'student', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT UNIQUE NOT NULL, expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL, subtitle TEXT NOT NULL,
    description TEXT NOT NULL, category TEXT NOT NULL, level TEXT NOT NULL, price NUMERIC NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD', duration TEXT NOT NULL, image TEXT NOT NULL,
    featured BOOLEAN NOT NULL DEFAULT FALSE, published BOOLEAN NOT NULL DEFAULT FALSE,
    outcomes JSONB NOT NULL DEFAULT '[]', requirements JSONB NOT NULL DEFAULT '[]', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS modules (
    id TEXT PRIMARY KEY, course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL, position INTEGER NOT NULL
  )`;
  await sql`CREATE TABLE IF NOT EXISTS lessons (
    id TEXT PRIMARY KEY, module_id TEXT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE, slug TEXT NOT NULL,
    title TEXT NOT NULL, type TEXT NOT NULL, position INTEGER NOT NULL, duration_minutes INTEGER NOT NULL DEFAULT 10,
    summary TEXT NOT NULL, transcript TEXT NOT NULL, content TEXT NOT NULL, lab JSONB,
    UNIQUE(course_id, slug)
  )`;
  await sql`CREATE TABLE IF NOT EXISTS enrollments (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE, status TEXT NOT NULL DEFAULT 'active',
    payment_reference TEXT, enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(user_id, course_id)
  )`;
  await sql`CREATE TABLE IF NOT EXISTS progress (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE, completed BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(user_id, lesson_id)
  )`;
  await sql`CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE, amount NUMERIC NOT NULL, currency TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', provider_payment_id TEXT, reference TEXT UNIQUE NOT NULL,
    provider_payload JSONB, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS quiz_sessions (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE, answer_key JSONB NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS quiz_attempts (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE, score INTEGER NOT NULL,
    passed BOOLEAN NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS certificates (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE, verification_code TEXT UNIQUE NOT NULL,
    issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(user_id, course_id)
  )`;
  await sql`CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT NOT NULL, window_start BIGINT NOT NULL, count INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (key, window_start)
  )`;

  const count = await sql`SELECT COUNT(*)::int AS count FROM courses` as Array<{count:number}>;
  if ((count[0]?.count ?? 0) === 0) {
    for (const c of starterCourses) {
      await sql`INSERT INTO courses (id,slug,title,subtitle,description,category,level,price,currency,duration,image,featured,published,outcomes,requirements)
        VALUES (${c.id},${c.slug},${c.title},${c.subtitle},${c.description},${c.category},${c.level},${c.price},${c.currency},${c.duration},${c.image},${c.featured},${c.published},${JSON.stringify(c.outcomes)}::jsonb,${JSON.stringify(c.requirements)}::jsonb)`;
    }
    for (const m of starterModules) await sql`INSERT INTO modules (id,course_id,title,position) VALUES (${m.id},${m.courseId},${m.title},${m.position})`;
    for (const l of starterLessons) await sql`INSERT INTO lessons (id,module_id,course_id,slug,title,type,position,duration_minutes,summary,transcript,content,lab)
      VALUES (${l.id},${l.moduleId},${l.courseId},${l.slug},${l.title},${l.type},${l.position},${l.durationMinutes},${l.summary},${l.transcript},${l.content},${l.lab ? JSON.stringify(l.lab) : null}::jsonb)`;
  }
  initialized = true;
}

function courseFrom(r: any): Course { return {id:r.id,slug:r.slug,title:r.title,subtitle:r.subtitle,description:r.description,category:r.category,level:r.level,price:Number(r.price),currency:r.currency,duration:r.duration,image:r.image,featured:r.featured,published:r.published,outcomes:r.outcomes||[],requirements:r.requirements||[],createdAt:r.created_at}; }
function lessonFrom(r:any): Lesson { return {id:r.id,moduleId:r.module_id,courseId:r.course_id,slug:r.slug,title:r.title,type:r.type,position:r.position,durationMinutes:r.duration_minutes,summary:r.summary,transcript:r.transcript,content:r.content,lab:r.lab}; }

export async function getCourses(all=false): Promise<Course[]> {
  await ensureDb();
  const rows = all ? await sql!`SELECT * FROM courses ORDER BY featured DESC, created_at DESC` : await sql!`SELECT * FROM courses WHERE published=true ORDER BY featured DESC, created_at DESC`;
  return (rows as any[]).map(courseFrom);
}
export async function getCourse(slug:string): Promise<Course|null> { await ensureDb(); const rows=await sql!`SELECT * FROM courses WHERE slug=${slug} LIMIT 1`; return rows[0]?courseFrom(rows[0]):null; }
export async function getCourseById(id:string): Promise<Course|null> { await ensureDb(); const rows=await sql!`SELECT * FROM courses WHERE id=${id} LIMIT 1`; return rows[0]?courseFrom(rows[0]):null; }
export async function getModules(courseId:string): Promise<Module[]> { await ensureDb(); const rows=await sql!`SELECT * FROM modules WHERE course_id=${courseId} ORDER BY position`; return (rows as any[]).map(r=>({id:r.id,courseId:r.course_id,title:r.title,position:r.position})); }
export async function getLessons(courseId:string): Promise<Lesson[]> { await ensureDb(); const rows=await sql!`SELECT * FROM lessons WHERE course_id=${courseId} ORDER BY module_id, position`; return (rows as any[]).map(lessonFrom); }
export async function getLesson(courseId:string, slug:string): Promise<Lesson|null> { await ensureDb(); const rows=await sql!`SELECT * FROM lessons WHERE course_id=${courseId} AND slug=${slug} LIMIT 1`; return rows[0]?lessonFrom(rows[0]):null; }
export async function findUserByEmail(email:string) { await ensureDb(); const r=await sql!`SELECT * FROM users WHERE email=${email.toLowerCase()} LIMIT 1`; return r[0] as any || null; }
export async function getUser(id:string):Promise<User|null> { await ensureDb(); const r=await sql!`SELECT id,name,email,role FROM users WHERE id=${id} LIMIT 1`; return r[0] ? {id:r[0].id as string,name:r[0].name as string,email:r[0].email as string,role:r[0].role as any}:null; }
export async function isEnrolled(userId:string, courseId:string) { await ensureDb(); const r=await sql!`SELECT 1 FROM enrollments WHERE user_id=${userId} AND course_id=${courseId} AND status='active' LIMIT 1`; return r.length>0; }
export async function getUserEnrollments(userId:string) { await ensureDb(); const r=await sql!`SELECT c.*, e.enrolled_at FROM enrollments e JOIN courses c ON c.id=e.course_id WHERE e.user_id=${userId} AND e.status='active' ORDER BY e.enrolled_at DESC`; return (r as any[]).map(courseFrom); }
export async function progressFor(userId:string, courseId:string) { await ensureDb(); const rows=await sql!`SELECT lesson_id,completed FROM progress WHERE user_id=${userId} AND course_id=${courseId}`; return new Set((rows as any[]).filter(r=>r.completed).map(r=>r.lesson_id as string)); }

export async function consumeRateLimit(key:string, limit:number, windowSeconds:number) {
  await ensureDb();
  const now=Math.floor(Date.now()/1000);
  const windowStart=Math.floor(now/windowSeconds)*windowSeconds;
  const rows=await sql!`INSERT INTO rate_limits (key,window_start,count) VALUES (${key},${windowStart},1)
    ON CONFLICT (key,window_start) DO UPDATE SET count=rate_limits.count+1 RETURNING count` as Array<{count:number}>;
  if(Math.random()<0.02) await sql!`DELETE FROM rate_limits WHERE window_start < ${now-(windowSeconds*4)}`;
  return (rows[0]?.count ?? limit+1) <= limit;
}

export async function lessonBelongsToCourse(lessonId:string, courseId:string) {
  await ensureDb();
  const rows=await sql!`SELECT 1 FROM lessons WHERE id=${lessonId} AND course_id=${courseId} LIMIT 1`;
  return rows.length>0;
}
