export const aiCourseContent:Record<string,string>={
"What Generative AI Can and Cannot Do":`## Learning objectives
You will understand what generative AI models do well, where they are unreliable and how to decide when human verification is required.

## What generative AI does
Generative AI predicts and produces new content based on patterns learned from large datasets. It can draft text, summarize material, transform formats, generate code, classify content and help structure ideas.

It does not "know" facts in the same way a database stores records. A fluent answer can still be wrong.

## Strengths
AI is often useful for brainstorming, rewriting, extracting structure from text, generating examples, comparing options and producing first drafts.

## Limitations
Models can hallucinate facts, citations, statistics and events. They may miss recent changes, misunderstand ambiguous instructions or reproduce bias from training data.

They can also produce plausible code that contains subtle bugs or security problems.

## Confidence versus accuracy
Language models are designed to generate likely responses, not calibrated truth scores. Confident tone is not evidence.

## High-stakes use
Medical, legal, financial, security and other consequential decisions require stronger verification and appropriate professionals.

## Example
AI can help you draft a scholarship application outline. It should not invent a fellowship you never attended or a leadership position you never held.

## Check your understanding
List three tasks where AI can speed up your work and three tasks where you would require independent verification before acting.

## Key takeaways
Use AI as a capable assistant, not an authority. The more important the consequence, the stronger the verification should be.`,

"Prompting Foundations":`## Learning objectives
You will learn how to turn a vague request into a clear prompt with goal, context, audience, constraints and output format.

## Start with the task
State what you want the model to do using a clear verb: summarize, compare, explain, draft, classify or transform.

## Provide context
Relevant context improves output. Include the audience, purpose, source material and any facts that must be preserved.

## Add constraints
Specify length, tone, prohibited assumptions, required sections or factual limits.

## Define output
Ask for a format that matches your next action: paragraph, email, table, checklist, JSON structure or step-by-step explanation.

## Example
Weak: "Write about my event."
Stronger: "Draft a 120-word LinkedIn post for university students announcing a free digital-skills workshop in Juba. Use simple professional English, include date and venue, and do not invent benefits."

## Iteration
Prompting is often iterative. Review the first output, identify what is missing and refine the instruction.

## Practical task
Take the starter prompt and add audience, purpose, tone and maximum length. Then add one constraint preventing invented details.

## Check your understanding
Explain why adding more words does not automatically make a better prompt. Which details actually change the desired result?

## Key takeaways
Strong prompts define the job, relevant context, constraints and expected output. Clarity beats unnecessary complexity.`,

"Privacy, Attribution and Responsible Use":`## Learning objectives
You will learn how to protect sensitive information, distinguish assistance from authorship and use AI transparently when context requires it.

## Sensitive information
Do not paste passwords, API keys, private identity documents, confidential contracts or protected personal data into AI tools unless the service and organizational policy explicitly support that use.

## Data minimization
Share only the information required for the task. Replace names with placeholders when identity is irrelevant.

## Attribution
Rules differ by institution and task. Some universities or employers require disclosure when AI contributes substantially to work.

Do not present generated material as independent research if you did not verify the sources.

## Intellectual responsibility
You remain responsible for claims you submit under your name. Editing an AI answer does not transfer responsibility away from you.

## Bias
AI can reproduce stereotypes or underrepresent local context. Review language and assumptions, especially when writing about communities or groups.

## Example
For a CV, AI can improve phrasing based on real experience. It should not create achievements, dates or employers to make the profile sound stronger.

## Check your understanding
Identify three pieces of information from your work or studies that you would avoid pasting into a general AI chat.

## Key takeaways
Use the minimum necessary data, follow institutional rules and take responsibility for accuracy. AI assistance does not replace authorship ethics.`,

"Research with AI":`## Learning objectives
You will learn how AI can support research planning without replacing source discovery and verification.

## Good uses
AI can help turn a broad topic into research questions, suggest search terms, identify competing concepts and summarize text you provide.

## Weak use
Asking an AI system for "five sources" and copying whatever it invents is not research.

## Research workflow
Start with a question. Ask AI to help break it into subquestions. Search authoritative sources yourself. Read the original material. Then use AI to compare or organize verified evidence.

## Primary and secondary sources
A primary source may be an original report, dataset, law, study or official announcement. Secondary sources interpret or report on primary material.

## Evidence table
Create columns for claim, source, publication date, relevant passage and uncertainty. This makes later writing more reliable.

## Local context
Generic global responses may miss local conditions. Add geographic, institutional and time context when it materially affects the question.

## Check your understanding
Choose a topic such as youth employment or food insecurity. Write one research question, three subquestions and five search terms you would use outside the AI system.

## Key takeaways
AI can structure research, but evidence still comes from verifiable sources. Use AI to organize thinking, not to manufacture citations.`,

"Build a Verification Checklist":`## Learning objectives
You will create a repeatable method for checking important AI-generated claims before using them.

## Separate claims
Break an answer into individual factual claims. A paragraph may contain several different statements requiring different sources.

## Prioritize
Not every sentence needs the same effort. Verify dates, numbers, names, legal rules, medical claims, quotations and anything that affects a decision.

## Source quality
Prefer primary or authoritative sources where possible. A random blog repeating a claim is weaker than the original institution's document.

## Freshness
A correct fact from last year may be wrong today. Check dates for opportunities, prices, policies, office holders and software documentation.

## Cross-check
Use independent sources for important contested claims. Several pages copying the same press release are not independent confirmation.

## Record uncertainty
If evidence is incomplete, say so. Do not convert "possibly" into "definitely" during rewriting.

## Practical task
Build a checklist with Claim, Needs verification?, Source, Date checked and Confidence notes. Apply it to one AI-generated answer.

## Key takeaways
Verification is a workflow. Identify claims, prioritize risk, check authoritative evidence and preserve uncertainty honestly.`,

"Summaries and Evidence":`## Learning objectives
You will learn how to summarize source material while preserving the evidence, limitations and distinctions that matter.

## Summary is compression
A useful summary removes detail without changing the central meaning.

## Preserve scope
If a study concerns one country, age group or time period, do not summarize it as universal.

## Separate evidence from interpretation
Write what the source found, then distinguish your analysis from the source's conclusion.

## Numbers
Keep denominators and units. "50% increase" means little without knowing the starting point.

## Quotations
Use direct quotations sparingly. Paraphrase accurately and preserve attribution.

## AI-assisted summarization
Provide the actual source text when possible and ask the model to identify main findings, methodology and limitations separately.

## Check against the source
After generating a summary, compare each important sentence with the original. Remove claims that are not supported.

## Exercise
Take a short article and produce a three-part summary: key claim, evidence and limitation.

## Key takeaways
A strong summary is shorter but not stronger than the source. Preserve scope, evidence and uncertainty.`,

"Drafting with Constraints":`## Learning objectives
You will learn how explicit constraints improve AI-assisted writing and reduce unnecessary rewriting.

## Audience
Writing for a donor, student, customer or technical team requires different vocabulary and assumptions.

## Purpose
Decide whether the text should inform, persuade, request action or document an event.

## Tone
Specify natural qualities such as concise, formal, conversational or technical. Avoid contradictory instructions like "very detailed and extremely short."

## Facts that must remain
Provide names, dates, roles and figures that cannot change. Tell the model not to invent missing facts.

## Length
Use a realistic range or maximum when the output must fit a platform.

## Example
"Rewrite this announcement for WhatsApp in 80–100 words. Keep all dates and links exactly. Use simple English. Do not add claims or emojis."

## Revision
Review whether the output met the constraints. If not, point to the exact failure instead of asking the model to "make it better."

## Check your understanding
Choose one message you often write and define its audience, purpose, tone, required facts and length.

## Key takeaways
Constraints reduce ambiguity. Good AI writing starts with accurate source facts and a clear communication goal.`,

"Rewrite for Clarity":`## Learning objectives
You will learn how to use AI to improve clarity without changing meaning or making the text artificially polished.

## Diagnose first
Before rewriting, identify the problem: repetition, long sentences, unclear structure, jargon or weak transitions.

## Preserve meaning
Tell the model which facts, claims and tone must remain unchanged.

## Plain language
Prefer familiar words when they communicate the same meaning. Break long sentences when each contains several ideas.

## Avoid "AI voice"
Overly polished transitions, inflated claims and generic motivational language can make writing sound less human.

## Practical workflow
1. Provide the original text.
2. State the intended audience.
3. Ask for specific clarity improvements.
4. Compare the rewrite line by line.
5. Restore any lost nuance.

## Example
Instead of asking "make this professional," ask "shorten the opening, remove repetition, keep my direct tone and do not add new facts."

## Check your understanding
Take a dense paragraph and mark which sentences should be shortened, combined or removed before asking AI to rewrite it.

## Key takeaways
Clarity is not decoration. Use AI to reduce friction while preserving the writer's actual meaning and voice.`,

"Editing and Human Review":`## Learning objectives
You will learn a structured review process for AI-assisted work before publication or submission.

## Factual review
Check names, dates, numbers, links and cited claims.

## Logic review
Look for contradictions, missing steps and conclusions that do not follow from the evidence.

## Audience review
Ask whether the reader has enough context and whether specialist terms need explanation.

## Tone review
Remove exaggerated confidence, filler phrases and language that does not sound like the intended author.

## Safety and privacy
Check that private information, credentials or internal notes did not enter the final output.

## Original requirements
Compare the draft with the task. A polished response that ignored one required section is still incomplete.

## Human responsibility
Do not publish material simply because it "sounds right." The person submitting or publishing it owns the decision.

## Check your understanding
Create a six-item review checklist you can reuse before submitting scholarship applications, reports or public posts.

## Key takeaways
AI can accelerate drafting. Human review converts a draft into accountable work.`,

"Structured Outputs and Templates":`## Learning objectives
You will learn when tables, schemas, checklists and templates are better than free-form prose.

## Structure helps downstream work
If information will be copied into a spreadsheet or system, request consistent fields.

## Tables
Tables are useful for comparing options with the same attributes. They are poor for long narrative explanations.

## JSON and schemas
Structured JSON is useful in software workflows but should be validated before a program trusts it.

## Checklists
Checklists support repeated procedures such as launch reviews or application verification.

## Templates
Templates capture required sections while leaving space for specific content.

## Example
Instead of asking AI for "some opportunity information," define fields: title, organization, deadline, eligibility, benefits, country and application link.

## Validation
A structured response can still contain wrong values. Structure improves consistency, not truth.

## Check your understanding
Choose one repeated task and design a structured output format that would make the result easier to review.

## Key takeaways
Choose output structure based on the next action. Validate both format and factual content.`,

"Design a Repeatable AI Workflow":`## Learning objectives
You will turn a repeated knowledge task into a workflow with explicit inputs, AI steps, verification and human approval.

## Define the task
Choose a task that repeats often and has clear success criteria.

## Inputs
List required source material and identify which information is sensitive.

## AI step
Define exactly what the model should transform, classify or draft.

## Verification
Decide which parts require source checking, calculations or manual review.

## Human approval
Specify who owns the final decision. High-impact outputs should not bypass responsible review.

## Failure path
Decide what happens when the AI output is incomplete or the provider is unavailable.

## Practical task
Design a workflow for turning a verified opportunity announcement into a website entry and social-media post. Include source capture, extraction, validation and final approval.

## Measurement
Track useful outcomes such as time saved, error rate and revision effort rather than assuming automation is valuable.

## Key takeaways
A good AI workflow includes controls around the model. Inputs, verification, fallback and accountability matter as much as the prompt.`,

"AI for Entrepreneurship and Study":`## Learning objectives
You will identify realistic AI uses for small organizations, entrepreneurs and students while avoiding dependency on unreliable automation.

## Study
AI can explain difficult concepts, generate practice questions, help compare notes and provide feedback on drafts.

Do not use it to fabricate citations or replace required independent work.

## Entrepreneurship
AI can help draft customer messages, organize market research, classify support requests and create first versions of documents.

## Operations
Repeated text-heavy tasks are often good automation candidates when the cost of mistakes is low and review is easy.

## Decision support
AI can help list assumptions and compare scenarios. It should not be treated as a guaranteed predictor.

## Local value
The best use case may be simple: reducing time spent formatting documents or helping users understand unfamiliar technical language.

## Build-versus-buy
Before creating an AI feature, estimate model cost, latency, privacy requirements and what happens when the provider fails.

## Final activity
Choose one study or business process. Write the current workflow, proposed AI assistance, risks, verification step and expected benefit.

## Key takeaways
Useful AI adoption begins with a real problem. Automate where review is possible, measure the benefit and keep humans responsible for consequential decisions.`
};
