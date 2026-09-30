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
  await sql`CREATE TABLE IF NOT EXISTS academy_meta (
    key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS academy_settings (
    key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;

  const catalogueVersion="3";
  const versionRows=await sql`SELECT value FROM academy_meta WHERE key='catalogue_version' LIMIT 1` as Array<{value:string}>;
  if(versionRows[0]?.value!==catalogueVersion){
    const coursePayload=JSON.stringify(starterCourses.map(c=>({
      id:c.id,slug:c.slug,title:c.title,subtitle:c.subtitle,description:c.description,category:c.category,level:c.level,
      price:c.price,currency:c.currency,duration:c.duration,image:c.image,featured:c.featured,published:c.published,
      outcomes:c.outcomes,requirements:c.requirements
    })));
    await sql`WITH data AS (
      SELECT * FROM jsonb_to_recordset(${coursePayload}::jsonb) AS x(
        id text,slug text,title text,subtitle text,description text,category text,level text,price numeric,currency text,
        duration text,image text,featured boolean,published boolean,outcomes jsonb,requirements jsonb
      )
    )
    INSERT INTO courses (id,slug,title,subtitle,description,category,level,price,currency,duration,image,featured,published,outcomes,requirements)
    SELECT id,slug,title,subtitle,description,category,level,price,currency,duration,image,featured,published,outcomes,requirements FROM data
    ON CONFLICT (id) DO UPDATE SET
      slug=EXCLUDED.slug,title=EXCLUDED.title,subtitle=EXCLUDED.subtitle,description=EXCLUDED.description,
      category=EXCLUDED.category,level=EXCLUDED.level,price=EXCLUDED.price,currency=EXCLUDED.currency,
      duration=EXCLUDED.duration,image=EXCLUDED.image,featured=EXCLUDED.featured,published=EXCLUDED.published,
      outcomes=EXCLUDED.outcomes,requirements=EXCLUDED.requirements`;

    const modulePayload=JSON.stringify(starterModules.map(m=>({id:m.id,course_id:m.courseId,title:m.title,position:m.position})));
    await sql`WITH data AS (
      SELECT * FROM jsonb_to_recordset(${modulePayload}::jsonb) AS x(id text,course_id text,title text,position integer)
    )
    INSERT INTO modules (id,course_id,title,position)
    SELECT id,course_id,title,position FROM data
    ON CONFLICT (id) DO UPDATE SET course_id=EXCLUDED.course_id,title=EXCLUDED.title,position=EXCLUDED.position`;

    const lessonPayload=JSON.stringify(starterLessons.map(l=>({
      id:l.id,module_id:l.moduleId,course_id:l.courseId,slug:l.slug,title:l.title,type:l.type,position:l.position,
      duration_minutes:l.durationMinutes,summary:l.summary,transcript:l.transcript,content:l.content,lab:l.lab??null
    })));
    await sql`WITH data AS (
      SELECT * FROM jsonb_to_recordset(${lessonPayload}::jsonb) AS x(
        id text,module_id text,course_id text,slug text,title text,type text,position integer,duration_minutes integer,
        summary text,transcript text,content text,lab jsonb
      )
    )
    INSERT INTO lessons (id,module_id,course_id,slug,title,type,position,duration_minutes,summary,transcript,content,lab)
    SELECT id,module_id,course_id,slug,title,type,position,duration_minutes,summary,transcript,content,lab FROM data
    ON CONFLICT (id) DO UPDATE SET
      module_id=EXCLUDED.module_id,course_id=EXCLUDED.course_id,slug=EXCLUDED.slug,title=EXCLUDED.title,type=EXCLUDED.type,
      position=EXCLUDED.position,duration_minutes=EXCLUDED.duration_minutes,summary=EXCLUDED.summary,
      transcript=EXCLUDED.transcript,content=EXCLUDED.content,lab=EXCLUDED.lab`;

    await sql`INSERT INTO academy_meta (key,value,updated_at) VALUES ('catalogue_version',${catalogueVersion},NOW())
      ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value,updated_at=NOW()`;
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
