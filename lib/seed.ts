import type { Course, Module, Lesson } from "./types";

const image=(id:string)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

type Topic={title:string;summary:string;practice?:string[];language?:"html"|"javascript"|"python"|"shell"|"text";starter?:string;expected?:string[]};
type ModulePlan={title:string;topics:Topic[]};
type CoursePlan={course:Course;modules:ModulePlan[];legacyModuleId?:string;legacyLessonIds?:string[]};

const theoryLesson=(courseId:string,moduleId:string,id:string,slug:string,position:number,t:Topic):Lesson=>({
  id,moduleId,courseId,slug,title:t.title,type:"theory",position,durationMinutes:25,
  summary:t.summary,
  content:`${t.summary}

Key ideas
• Understand the core concept and the vocabulary used by practitioners.
• Connect the concept to realistic technology work and decision-making.
• Identify common mistakes, limitations and good practice.
• Finish with a short reflection so you can explain the idea in your own words.

Professional practice
Use this lesson as a reference, then ask the AI tutor for examples related to your own project or learning goal. Do not move on until you can describe what the concept is, why it matters, and when you would use it.`,
  transcript:`Your AI instructor introduces ${t.title}. We begin with the practical reason this topic matters, then break it into clear ideas, examples and professional habits. Pause after each section and explain the concept back in your own words before continuing.`
});

const practicalLesson=(courseId:string,moduleId:string,id:string,slug:string,position:number,t:Topic):Lesson=>({
  id,moduleId,courseId,slug,title:t.title,type:"practical",position,durationMinutes:45,
  summary:t.summary,
  content:"Complete the guided task, check your result, and use the AI tutor for hints rather than copying a final answer.",
  transcript:`This guided practice applies ${t.title}. Work one step at a time, check each result, and focus on why each command or decision is correct.`,
  lab:{
    language:t.language||"text",
    starterCode:t.starter||"",
    instructions:t.practice||["Read the task.","Complete each required step.","Check your result.","Explain what you learned."],
    expectedContains:t.expected||[]
  }
});

const plans:CoursePlan[]=[
{
course:{id:"course-web",slug:"full-stack-web-development",title:"Full-Stack Web Development",subtitle:"Build responsive, database-backed web applications from browser to deployment.",description:"A project-based learning path covering web foundations, responsive interfaces, JavaScript, React, APIs, databases, authentication, testing, Git and cloud deployment.",category:"Software Development",level:"Beginner to Intermediate",price:120,currency:"USD",duration:"12 weeks",image:image("photo-1498050108023-c5249f4df085"),featured:true,published:true,outcomes:["Build accessible responsive websites","Write modern JavaScript applications","Create reusable React interfaces","Design REST APIs and database-backed features","Implement authentication and validation","Deploy and maintain production web applications"],requirements:["A computer with a modern browser","Reliable internet connection","No prior programming experience required"]},
legacyModuleId:"module-1",legacyLessonIds:["web-1","web-2"],
modules:[
{title:"Web Foundations",topics:[
{title:"How the Web Works",summary:"Understand browsers, servers, DNS, URLs, HTTP and the request-response cycle."},
{title:"Build Your First Semantic Page",summary:"Create a clean HTML page using semantic structure.",practice:["Create header, main and footer sections.","Add one heading, two paragraphs and a useful link.","Use semantic HTML elements."],language:"html",starter:"<!doctype html>\n<html>\n<body>\n\n</body>\n</html>",expected:["<header","<main","<footer","<h1"]},
{title:"Accessibility and HTML Quality",summary:"Use headings, labels, alt text and document structure that work for more people."}
]},
{title:"Responsive CSS",topics:[
{title:"CSS Foundations",summary:"Understand the cascade, selectors, box model, spacing and typography."},
{title:"Responsive Layout with Flexbox and Grid",summary:"Create layouts that adapt cleanly across mobile and desktop.",practice:["Create a two-column desktop layout.","Stack the layout on small screens.","Add consistent spacing."],language:"html",starter:"<style>\n/* Add your styles */\n</style>\n<main class=\"layout\"><section>Content</section><aside>Sidebar</aside></main>",expected:["display","@media"]},
{title:"Design Systems and Reusable Styles",summary:"Organize colors, type scales, spacing and components into a consistent visual system."}
]},
{title:"JavaScript Applications",topics:[
{title:"JavaScript Fundamentals",summary:"Work with variables, functions, arrays, objects, conditions and loops."},
{title:"DOM Events and Interactive UI",summary:"Connect JavaScript to the page and respond to user actions.",practice:["Select a button.","Listen for a click.","Update visible text after the click."],language:"javascript",starter:"const button = document.querySelector('button');\n",expected:["addEventListener","textContent"]},
{title:"Async JavaScript and APIs",summary:"Use promises, async/await, fetch and robust error handling."}
]},
{title:"React and Application Architecture",topics:[
{title:"Components, Props and State",summary:"Build reusable React components and manage local application state."},
{title:"Forms and Client-side Validation",summary:"Create reliable forms with useful validation and feedback.",practice:["Define form state.","Validate a required field.","Display an error message when invalid."],language:"javascript",starter:"// Write the core form logic\n",expected:["state","error"]},
{title:"Routing and Data-driven Interfaces",summary:"Organize multi-page applications and render interfaces from data."}
]},
{title:"Backend, Database and Deployment",topics:[
{title:"REST APIs and Server Logic",summary:"Design routes, validate input and return predictable API responses."},
{title:"Relational Databases and Authentication",summary:"Model users and application data while protecting private actions.",practice:["Sketch a users table.","Sketch a sessions table.","List two server-side authorization checks."],language:"text",starter:"Database design:\n",expected:["users","sessions"]},
{title:"Testing, Git and Production Deployment",summary:"Prepare a full-stack project for version control, testing, environment variables and deployment."}
]}
]},
{
course:{id:"course-python",slug:"python-programming",title:"Python Programming",subtitle:"Learn Python from first principles and build useful automation and data projects.",description:"A practical Python path covering syntax, problem solving, functions, data structures, files, APIs, errors, testing and small portfolio projects.",category:"Programming",level:"Beginner",price:60,currency:"USD",duration:"6 weeks",image:image("photo-1526379879527-8559ecfcaec0"),featured:true,published:true,outcomes:["Write clear Python programs","Use collections and functions effectively","Read and write files","Consume web APIs","Handle errors and test code","Build practical automation projects"],requirements:["A computer","No previous coding experience required"]},
legacyModuleId:"module-2",legacyLessonIds:["py-1","py-2"],
modules:[
{title:"Python Foundations",topics:[
{title:"Values, Variables and Types",summary:"Understand Python values, variables, strings, numbers and type conversion."},
{title:"Write Your First Python Program",summary:"Use variables and formatted output in a small program.",practice:["Create name and age variables.","Print both values in one sentence.","Use an f-string."],language:"python",starter:"name = 'Sawa learner'\n",expected:["print(","age","f"]},
{title:"Conditions and Program Flow",summary:"Use comparisons, boolean logic and conditional branches."}
]},
{title:"Collections and Loops",topics:[
{title:"Lists, Tuples, Sets and Dictionaries",summary:"Choose the right Python collection for common tasks."},
{title:"Loop Through Real Data",summary:"Use for loops to process a collection safely.",practice:["Create a list of three course names.","Loop through the list.","Print each course name."],language:"python",starter:"courses = []\n",expected:["for ","print("]},
{title:"Comprehensions and Data Transformation",summary:"Transform collections concisely without losing readability."}
]},
{title:"Functions and Program Design",topics:[
{title:"Functions and Scope",summary:"Break programs into reusable functions with clear inputs and outputs."},
{title:"Build a Reusable Utility",summary:"Write and call a function that solves one focused task.",practice:["Create a function with one parameter.","Return a value.","Call the function twice."],language:"python",starter:"def format_name(name):\n    pass\n",expected:["def ","return"]},
{title:"Modules and Packages",summary:"Organize larger programs and understand how imports work."}
]},
{title:"Files, APIs and Errors",topics:[
{title:"Files and Structured Data",summary:"Read and write text, JSON and CSV safely."},
{title:"Work with an API Response",summary:"Parse structured API data and extract useful values.",practice:["Create a dictionary that represents an API response.","Read two fields safely.","Print a useful summary."],language:"python",starter:"data = {'status': 'ok', 'count': 3}\n",expected:["data","print("]},
{title:"Exceptions and Defensive Programming",summary:"Handle expected failures without hiding real bugs."}
]},
{title:"Testing and Portfolio Project",topics:[
{title:"Testing Python Code",summary:"Use assertions and test cases to verify expected behavior."},
{title:"Build a Small Automation Project",summary:"Plan and implement a useful script from requirements.",practice:["Define the problem.","List inputs and outputs.","Write the program structure.","Add at least one validation check."],language:"text",starter:"Project plan:\n",expected:["input","output"]},
{title:"Refactoring and Project Documentation",summary:"Improve readability, structure and documentation before publishing your work."}
]}
]},
{
course:{id:"course-git",slug:"git-and-github",title:"Git & GitHub",subtitle:"Manage code professionally and collaborate through reliable version-control workflows.",description:"Learn repositories, commits, branches, merge conflicts, pull requests, issues and collaboration patterns used by software teams.",category:"Developer Tools",level:"Beginner",price:25,currency:"USD",duration:"3 weeks",image:image("photo-1618401471353-b98afee0b2eb"),featured:false,published:true,outcomes:["Use Git confidently","Create meaningful commits","Work safely with branches","Resolve common merge conflicts","Collaborate through pull requests","Maintain professional repositories"],requirements:["A computer","Basic command-line familiarity is helpful"]},
legacyModuleId:"module-3",legacyLessonIds:["git-1","git-2"],
modules:[
{title:"Version Control Foundations",topics:[
{title:"Repositories, Commits and History",summary:"Understand what Git records and why version history matters."},
{title:"Practice the Core Git Workflow",summary:"Initialize, inspect, stage and commit a small project.",practice:["Initialize a repository.","Check status.","Stage files.","Create a commit."],language:"shell",starter:"# Enter commands\n",expected:["git init","git status","git add","git commit"]},
{title:"Reading History and Undoing Safely",summary:"Inspect previous work and choose safe recovery commands."}
]},
{title:"Branches and Merging",topics:[
{title:"Branching Strategy",summary:"Use branches to isolate work and reduce risk."},
{title:"Create and Merge a Feature Branch",summary:"Practice a complete branch-to-merge workflow.",practice:["Create a feature branch.","Switch to it.","Make a commit.","Merge it back."],language:"shell",starter:"# Commands\n",expected:["git branch","git switch","git merge"]},
{title:"Merge Conflicts",summary:"Understand why conflicts happen and resolve them deliberately."}
]},
{title:"GitHub Collaboration",topics:[
{title:"Remotes and GitHub Repositories",summary:"Connect local repositories to remote hosting safely."},
{title:"Pull Requests and Reviews",summary:"Use pull requests for discussion, checks and controlled merging.",practice:["Draft a pull request title.","Write a useful summary.","List testing evidence.","Request a review."],language:"text",starter:"Pull request:\n",expected:["summary","test"]},
{title:"Issues, Projects and Team Workflow",summary:"Coordinate work with issues, labels and lightweight planning."}
]},
{title:"Professional Repository Practice",topics:[
{title:"README, Licensing and Documentation",summary:"Make repositories understandable and reusable."},
{title:"Repository Hygiene",summary:"Use .gitignore, meaningful commits and protected secrets.",practice:["List files that should never be committed.","Draft three .gitignore entries.","Explain why secrets must stay out of Git."],language:"text",starter:".gitignore plan:\n",expected:[".env","secret"]},
{title:"Capstone Collaboration Workflow",summary:"Combine branching, pull requests and review into one professional workflow."}
]}
]},
{
course:{id:"course-cloud",slug:"cloud-and-devops-foundations",title:"Cloud & DevOps Foundations",subtitle:"Build a practical foundation in Linux, cloud infrastructure, containers and CI/CD.",description:"A career-oriented introduction to cloud engineering and DevOps covering Linux, networking, cloud architecture, containers, infrastructure concepts, CI/CD, monitoring and secure deployment.",category:"Cloud & DevOps",level:"Intermediate",price:150,currency:"USD",duration:"10 weeks",image:image("photo-1451187580459-43490279c0fa"),featured:true,published:true,outcomes:["Use Linux command-line tools","Explain cloud compute, storage and networking","Build and run containers","Understand infrastructure as code","Design CI/CD workflows","Apply monitoring and deployment practices"],requirements:["Basic computer skills","Basic programming knowledge recommended"]},
legacyModuleId:"module-4",legacyLessonIds:["cloud-1","cloud-2"],
modules:[
{title:"Cloud and Linux Foundations",topics:[
{title:"Cloud Computing Architecture",summary:"Understand regions, compute, storage, networking and managed services."},
{title:"Linux Command Line Essentials",summary:"Navigate files, create directories and inspect a Linux environment.",practice:["Print the current directory.","List files.","Create sawa-lab.","Create a file inside it."],language:"shell",starter:"# Commands\n",expected:["pwd","ls","mkdir","touch"]},
{title:"Users, Permissions and Processes",summary:"Understand ownership, permissions, processes and basic system administration."}
]},
{title:"Networking for Cloud Engineers",topics:[
{title:"IP, DNS, Ports and HTTP",summary:"Understand the network concepts behind deployed applications."},
{title:"Diagnose a Connectivity Problem",summary:"Use a structured method to troubleshoot a failed service connection.",practice:["Check DNS.","Check the target port.","Check application health.","Record the likely fault domain."],language:"text",starter:"Troubleshooting notes:\n",expected:["DNS","port","health"]},
{title:"Firewalls and Secure Connectivity",summary:"Apply least-privilege thinking to inbound and outbound traffic."}
]},
{title:"Containers",topics:[
{title:"Images, Containers and Registries",summary:"Understand how container packaging differs from virtual machines."},
{title:"Write a Container Build Plan",summary:"Describe how an application should be packaged into a container.",practice:["Choose a base image.","Define dependencies.","Define the startup command.","List files to exclude."],language:"text",starter:"Container plan:\n",expected:["base","command"]},
{title:"Container Operations and Debugging",summary:"Inspect logs, environment values, ports and container lifecycle."}
]},
{title:"CI/CD and Infrastructure",topics:[
{title:"Continuous Integration and Delivery",summary:"Understand automated checks, builds and controlled deployments."},
{title:"Design a CI/CD Pipeline",summary:"Create a pipeline from commit to production.",practice:["Add install step.","Add typecheck/test step.","Add build step.","Add deployment approval or condition."],language:"text",starter:"Pipeline:\n",expected:["build","test","deploy"]},
{title:"Infrastructure as Code",summary:"Understand declarative infrastructure, state and repeatability."}
]},
{title:"Reliability and Operations",topics:[
{title:"Monitoring, Logs and Alerts",summary:"Use observability signals to understand production systems."},
{title:"Incident Response Basics",summary:"Structure a calm response to a production incident.",practice:["State impact.","Identify immediate containment.","Record evidence.","Define follow-up actions."],language:"text",starter:"Incident notes:\n",expected:["impact","contain"]},
{title:"Production Readiness Review",summary:"Evaluate security, backups, scaling, observability and rollback before launch."}
]}
]},
{
course:{id:"course-cyber",slug:"cybersecurity-foundations",title:"Cybersecurity Foundations",subtitle:"Develop defensive security thinking for accounts, devices, networks and applications.",description:"A defensive-first course covering risk, identity, device security, networking, phishing, web security, incident response and responsible security practice.",category:"Cybersecurity",level:"Beginner",price:75,currency:"USD",duration:"6 weeks",image:image("photo-1563013544-824ae1b704d3"),featured:false,published:true,outcomes:["Assess common cyber risks","Protect accounts and devices","Recognize phishing and social engineering","Explain network and web security basics","Apply secure configuration habits","Respond to common security incidents"],requirements:["A computer","Basic digital literacy","All exercises are defensive and authorized"]},
legacyModuleId:"module-5",legacyLessonIds:["cyber-1","cyber-2"],
modules:[
{title:"Security Foundations",topics:[
{title:"Assets, Threats, Vulnerabilities and Risk",summary:"Use a simple risk model to reason about what needs protection."},
{title:"Account Security Audit",summary:"Evaluate passwords, MFA and recovery controls.",practice:["Identify weak controls.","Recommend a unique-password strategy.","Recommend MFA.","Improve recovery settings."],language:"text",starter:"Account audit:\nPassword reused\nMFA off\nRecovery email outdated\n",expected:["password","MFA","recovery"]},
{title:"Security Principles",summary:"Apply least privilege, defense in depth and secure defaults."}
]},
{title:"Phishing and Social Engineering",topics:[
{title:"How Social Engineering Works",summary:"Recognize manipulation tactics used to influence human decisions."},
{title:"Analyze a Suspicious Message",summary:"Review a message for warning signs without opening unsafe links.",practice:["Check sender identity.","Inspect urgency or pressure.","Check the destination domain.","Choose a safe verification channel."],language:"text",starter:"Message review:\n",expected:["sender","domain","verify"]},
{title:"Safe Reporting and Recovery",summary:"Know what to do after a suspicious click or credential exposure."}
]},
{title:"Network and Device Security",topics:[
{title:"Network Security Basics",summary:"Understand routers, Wi-Fi, ports, segmentation and common defensive controls."},
{title:"Harden a Personal Device",summary:"Create a practical hardening checklist.",practice:["Enable updates.","Review screen lock.","Review disk protection.","Review installed applications."],language:"text",starter:"Device hardening:\n",expected:["update","lock"]},
{title:"Backups and Recovery",summary:"Use resilient backup practices to reduce the impact of loss or ransomware."}
]},
{title:"Web and Application Security",topics:[
{title:"Authentication and Authorization",summary:"Distinguish identity verification from permission enforcement."},
{title:"Secure Input and Secrets",summary:"Understand validation, environment secrets and safe data handling.",practice:["List two inputs to validate.","List two values that belong in secrets.","Explain why secrets must stay server-side."],language:"text",starter:"Secure design notes:\n",expected:["validate","secret"]},
{title:"Common Web Security Risks",summary:"Recognize high-level application risks without practicing exploitation."}
]},
{title:"Incident Response and Security Careers",topics:[
{title:"Incident Response Lifecycle",summary:"Understand preparation, detection, containment, recovery and lessons learned."},
{title:"Write an Incident Timeline",summary:"Document a simple incident objectively.",practice:["Record first observation.","Record containment.","Record recovery.","Record one preventive action."],language:"text",starter:"Timeline:\n",expected:["contain","recover"]},
{title:"Responsible Security Practice",summary:"Understand authorization, ethics and pathways into defensive cybersecurity careers."}
]}
]},
{
course:{id:"course-ai",slug:"ai-productivity",title:"AI for Productivity",subtitle:"Use generative AI responsibly for research, writing, analysis and repeatable workflows.",description:"A practical course on prompt design, verification, research, structured outputs, automation thinking, privacy and responsible use of AI at work and in study.",category:"Artificial Intelligence",level:"Beginner",price:35,currency:"USD",duration:"4 weeks",image:image("photo-1677442136019-21780ecad995"),featured:false,published:true,outcomes:["Write effective task-specific prompts","Verify AI-generated information","Use AI for structured research and writing","Design repeatable AI workflows","Protect sensitive information","Evaluate where AI should and should not be used"],requirements:["Internet connection","Basic digital literacy"]},
legacyModuleId:"module-6",legacyLessonIds:["ai-1","ai-2"],
modules:[
{title:"AI Foundations and Responsible Use",topics:[
{title:"What Generative AI Can and Cannot Do",summary:"Understand strengths, limitations, uncertainty and hallucinations."},
{title:"Prompting Foundations",summary:"Turn a vague request into a clear instruction.",practice:["State the audience.","State the goal.","Specify tone.","Specify output length."],language:"text",starter:"Draft prompt:\n",expected:["audience","tone"]},
{title:"Privacy, Attribution and Responsible Use",summary:"Decide what information is safe to share and when human review is required."}
]},
{title:"Research and Verification",topics:[
{title:"Research with AI",summary:"Use AI to structure questions, identify gaps and organize research."},
{title:"Build a Verification Checklist",summary:"Create a repeatable process for checking important outputs.",practice:["Separate claims from opinions.","Identify claims needing sources.","Check dates.","Record uncertainty."],language:"text",starter:"Verification checklist:\n",expected:["source","date"]},
{title:"Summaries and Evidence",summary:"Create concise summaries without losing key limitations or context."}
]},
{title:"Writing and Communication",topics:[
{title:"Drafting with Constraints",summary:"Use audience, purpose, tone and format to improve AI-assisted writing."},
{title:"Rewrite for Clarity",summary:"Turn a dense paragraph into concise professional language.",practice:["Remove repetition.","Use shorter sentences.","Preserve meaning.","Keep the tone professional."],language:"text",starter:"Rewrite plan:\n",expected:["meaning","professional"]},
{title:"Editing and Human Review",summary:"Use AI as an editor while keeping human responsibility for accuracy."}
]},
{title:"Structured Workflows",topics:[
{title:"Structured Outputs and Templates",summary:"Ask for tables, schemas, checklists and repeatable formats."},
{title:"Design a Repeatable AI Workflow",summary:"Map a task into inputs, AI steps, checks and final human approval.",practice:["Define the input.","Define the AI task.","Define verification.","Define final approval."],language:"text",starter:"Workflow:\n",expected:["input","verify","approval"]},
{title:"AI for Entrepreneurship and Study",summary:"Identify useful, low-risk ways to apply AI to real work."}
]}
]},
{
course:{id:"course-digital-free",slug:"digital-literacy-essentials",title:"Digital Literacy Essentials",subtitle:"Build the everyday digital skills needed for study, work and entrepreneurship.",description:"A free theory-first foundation covering devices, files, internet use, online communication, cloud tools, privacy, digital safety and information quality.",category:"Digital Skills",level:"Beginner",price:0,currency:"USD",duration:"4 weeks",image:image("photo-1516321318423-f06f85e504b3"),featured:true,published:true,outcomes:["Use devices and files confidently","Communicate professionally online","Use cloud productivity tools","Protect personal accounts","Evaluate online information more carefully"],requirements:["A phone, tablet or computer","Internet connection"]},
modules:[
{title:"Digital Foundations",topics:[
{title:"Devices, Operating Systems and Applications",summary:"Understand the basic parts of a digital device and how applications fit together."},
{title:"Files, Folders and Storage",summary:"Organize files, choose clear names and understand local versus cloud storage."},
{title:"Keyboard, Browser and Search Skills",summary:"Use browsers and search more efficiently and deliberately."}
]},
{title:"Online Communication",topics:[
{title:"Email and Professional Messaging",summary:"Write clear subject lines, concise messages and appropriate replies."},
{title:"Video Meetings and Online Collaboration",summary:"Participate effectively in shared digital workspaces and meetings."},
{title:"Digital Identity and Reputation",summary:"Understand how online activity contributes to a professional digital presence."}
]},
{title:"Productivity and Cloud Tools",topics:[
{title:"Documents, Spreadsheets and Presentations",summary:"Understand the purpose and basic workflow of common productivity tools."},
{title:"Cloud Sharing and Permissions",summary:"Share files safely using view, comment and edit permissions."},
{title:"Personal Digital Organization",summary:"Build simple systems for notes, files, calendars and tasks."}
]},
{title:"Safety and Information Quality",topics:[
{title:"Passwords, MFA and Account Recovery",summary:"Protect accounts using strong authentication and recovery settings."},
{title:"Phishing, Scams and Unsafe Links",summary:"Recognize common warning signs before clicking or sharing information."},
{title:"Fact-checking and Source Evaluation",summary:"Evaluate authorship, evidence, dates and independent confirmation before trusting content."}
]}
]},
{
course:{id:"course-careers-free",slug:"technology-careers-foundations",title:"Technology Careers Foundations",subtitle:"Explore major technology career paths and build a realistic learning roadmap.",description:"A free orientation course for learners choosing between software development, cloud, cybersecurity, data, AI and related technology careers.",category:"Career Foundations",level:"Beginner",price:0,currency:"USD",duration:"3 weeks",image:image("photo-1522202176988-66273c2fd55f"),featured:false,published:true,outcomes:["Understand major technology career families","Compare common entry-level roles","Identify foundational skills shared across tech careers","Build a realistic personal learning roadmap"],requirements:["No prior technology experience required"]},
modules:[
{title:"Understanding Technology Work",topics:[
{title:"How Technology Teams Work",summary:"Understand common roles across product, engineering, operations, security and support."},
{title:"Software Development Careers",summary:"Compare front-end, back-end, full-stack, mobile and software engineering paths."},
{title:"Cloud, DevOps and Infrastructure Careers",summary:"Understand the work behind reliable platforms and deployments."}
]},
{title:"Specialist Career Paths",topics:[
{title:"Cybersecurity Careers",summary:"Explore defensive security, governance, security operations and cloud security roles."},
{title:"Data and AI Careers",summary:"Understand data analysis, data engineering, machine learning and applied AI roles."},
{title:"Technical Support and Systems Roles",summary:"Explore practical entry points through support, networking and system administration."}
]},
{title:"Build Your Roadmap",topics:[
{title:"Foundational Skills Employers Look For",summary:"Identify communication, problem solving, Git, command line and project evidence that transfer across roles."},
{title:"Portfolio and Project Evidence",summary:"Understand how practical projects demonstrate skills better than course completion alone."},
{title:"Create a 90-Day Learning Plan",summary:"Build a focused roadmap with one target role, core skills, weekly practice and one portfolio project."}
]}
]},
{
course:{id:"course-internet-free",slug:"internet-safety-and-digital-citizenship",title:"Internet Safety & Digital Citizenship",subtitle:"Learn safer, more responsible ways to participate online.",description:"A free theory course covering privacy, online identity, misinformation, respectful participation, cyberbullying, scams and responsible use of digital platforms.",category:"Digital Safety",level:"Beginner",price:0,currency:"USD",duration:"2 weeks",image:image("photo-1550751827-4bd374c3f58b"),featured:false,published:true,outcomes:["Recognize common online risks","Protect personal information","Respond safely to harassment or scams","Evaluate suspicious content","Participate online more responsibly"],requirements:["No technical background required"]},
modules:[
{title:"Privacy and Identity",topics:[
{title:"Personal Information and Privacy",summary:"Understand what personal data is and why oversharing can create risk."},
{title:"Online Identity and Digital Footprints",summary:"Recognize that online actions can persist and affect reputation."},
{title:"Privacy Settings and Permissions",summary:"Review application permissions and platform privacy choices."}
]},
{title:"Online Risks and Responses",topics:[
{title:"Scams, Impersonation and Manipulation",summary:"Recognize patterns used in common online scams and fake identities."},
{title:"Cyberbullying and Harassment",summary:"Know how to document, block, report and seek support."},
{title:"Misinformation and Responsible Sharing",summary:"Check sources and evidence before forwarding information."}
]},
{title:"Healthy Digital Participation",topics:[
{title:"Respectful Online Communication",summary:"Use clear and respectful communication even during disagreement."},
{title:"Screen Time, Attention and Boundaries",summary:"Build healthier routines around notifications and digital attention."},
{title:"Your Personal Online Safety Plan",summary:"Create a simple checklist for accounts, privacy, reporting and trusted contacts."}
]}
]}
];

const slugify=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,70);

export const starterCourses:Course[]=plans.map(p=>p.course);
export const starterModules:Module[]=[];
export const starterLessons:Lesson[]=[];

for(const plan of plans){
  plan.modules.forEach((m,mi)=>{
    const moduleId=mi===0&&plan.legacyModuleId?plan.legacyModuleId:`${plan.course.id}-m${mi+1}`;
    starterModules.push({id:moduleId,courseId:plan.course.id,title:m.title,position:mi+1});
    m.topics.forEach((t,ti)=>{
      const legacyId=mi===0?plan.legacyLessonIds?.[ti]:undefined;
      const id=legacyId||`${plan.course.id}-m${mi+1}-l${ti+1}`;
      const slug=mi===0&&legacyId
        ? ({ "web-1":"web-foundations","web-2":"first-web-page","py-1":"python-foundations","py-2":"python-basics","git-1":"git-workflow","git-2":"git-practice","cloud-1":"cloud-model","cloud-2":"linux-basics","cyber-1":"security-thinking","cyber-2":"account-security","ai-1":"ai-responsibility","ai-2":"prompting" } as Record<string,string>)[legacyId]||slugify(t.title)
        : slugify(t.title);
      starterLessons.push(t.practice
        ? practicalLesson(plan.course.id,moduleId,id,slug,ti+1,t)
        : theoryLesson(plan.course.id,moduleId,id,slug,ti+1,t));
    });
  });
}
