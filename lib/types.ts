export type UserRole = "student" | "admin";
export type LessonType = "theory" | "practical" | "quiz";

export type Course = {
  id: string; slug: string; title: string; subtitle: string; description: string; category: string;
  level: string; price: number; currency: string; duration: string; image: string; featured: boolean;
  published: boolean; outcomes: string[]; requirements: string[]; createdAt?: string;
};

export type Module = { id: string; courseId: string; title: string; position: number };
export type Lesson = {
  id: string; moduleId: string; courseId: string; slug: string; title: string; type: LessonType; position: number;
  durationMinutes: number; summary: string; transcript: string; content: string; lab?: LabConfig | null;
};
export type LabConfig = {
  language: "html" | "javascript" | "python" | "shell" | "text";
  starterCode?: string; solution?: string; instructions: string[]; expectedContains?: string[];
};
export type User = { id: string; name: string; email: string; role: UserRole };
