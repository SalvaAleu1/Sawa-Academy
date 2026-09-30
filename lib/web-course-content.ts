export const webCourseContent:Record<string,string>={
"How the Web Works":`## Learning objectives
By the end of this lesson, you should be able to explain what happens after a user enters a web address, distinguish the roles of DNS, HTTP, a browser and a server, and describe why front-end and back-end code run in different places.

## From a URL to a page
A URL identifies a resource. When you enter a URL such as https://example.com/courses, the browser first needs to discover where the domain is hosted. DNS translates the human-readable domain into network information that helps the browser reach the correct server.

The browser then opens a network connection and sends an HTTP request. The request includes a method such as GET or POST, a path, headers and sometimes a body. The server processes the request and sends an HTTP response containing a status code, headers and a response body.

A response might contain HTML, JSON, an image, a stylesheet or another resource.

## Browser responsibilities
The browser parses HTML to understand document structure, CSS to determine presentation and JavaScript to add behavior. A modern page often makes additional requests after the initial HTML loads—for fonts, images, JavaScript bundles and API data.

## Server responsibilities
Server-side code handles operations that should not be trusted to the browser alone: reading private database records, enforcing authorization, processing payments, protecting secrets and validating important actions.

A useful rule is: the browser can improve the user experience, but the server must enforce trust boundaries.

## HTTP status codes
Status codes communicate the outcome of a request. 200 usually means success, 201 indicates a resource was created, 400 indicates a bad request, 401 means authentication is required, 403 means the user is not allowed, 404 means the resource was not found and 500 indicates a server error.

## Example
A student signs into an academy. The browser submits credentials over HTTPS. The server verifies them, creates a session and returns a secure cookie. Later requests include that session cookie, allowing the server to identify the user.

## Check your understanding
Explain the path from typing a domain to receiving a webpage using these terms: DNS, request, server, response, browser. Then explain why a database password should never be embedded in front-end JavaScript.

## Key takeaways
The web is a request-response system. Browsers render and interact; servers protect data and business rules. Understanding that boundary will make later lessons about APIs, authentication and deployment much easier.`,

"Build Your First Semantic Page":`## Learning objectives
You will learn how semantic HTML gives structure and meaning to a page, how browsers interpret that structure, and how to create markup that is easier to maintain and more accessible.

## HTML is structure, not decoration
HTML describes the meaning of content. A heading is a heading because it organizes a section, not because it looks large. A navigation element represents navigation. A button represents an action. CSS should control appearance.

Using meaningful elements makes code easier for developers to read and gives assistive technologies stronger information about the page.

## Core page structure
A typical document contains a doctype, html element, head and body. The head stores metadata such as the title and viewport settings. The body contains visible content.

Inside the body, semantic elements such as header, nav, main, section, article, aside and footer describe major regions.

## Headings
Headings should form a logical outline. A page normally has one primary h1 describing the page. Subsections use h2, then h3 when necessary. Do not choose heading levels only for visual size.

## Links and buttons
Use a link when the user is navigating to another location. Use a button when the user is performing an action on the current interface. This distinction improves semantics and keyboard behavior.

## Images
Meaningful images need useful alternative text. Decorative images may use empty alt text so screen readers can skip them.

## Lab expectations
In the practical workspace, build a small academy landing page with a header, main content, one descriptive heading, a paragraph, a useful link and a footer. Keep the HTML valid and avoid using generic div elements when a semantic element is more appropriate.

## Review checklist
• Does the page have one clear h1?
• Are major regions represented with semantic elements?
• Do links navigate and buttons perform actions?
• Are images described appropriately?
• Can the document still make sense with CSS disabled?

## Key takeaways
Professional HTML begins with meaning. Good semantics improve accessibility, maintainability and the reliability of styling and scripting later.`,

"Accessibility and HTML Quality":`## Learning objectives
You will understand accessibility as a normal quality requirement, learn several high-impact HTML practices and recognize common barriers before they reach users.

## Accessibility is part of engineering
Accessible software can be used by people with a wider range of visual, hearing, motor and cognitive abilities. It also benefits users on small screens, slow connections, temporary injuries and difficult environments.

Accessibility should not be treated as a final cosmetic audit. Many of the strongest improvements come from correct HTML at the beginning.

## Keyboard access
Interactive controls should be reachable and usable with a keyboard. Native links, buttons and form elements already include important behavior. Replacing them with clickable div elements creates extra work and often introduces failures.

## Forms and labels
Every form field needs a clear label. Placeholder text is not a substitute for a label because it disappears as the user types and may have poor contrast.

Validation errors should explain what is wrong and how to correct it.

## Images and media
Alternative text should communicate the purpose of meaningful images. Captions or transcripts may be needed for media when spoken information is important.

## Color and contrast
Do not rely on color alone to communicate status. An error field can use a red border, but it should also include text or an icon with accessible meaning.

## Document quality
Use the HTML validator mindset: close elements correctly, avoid duplicated IDs, use valid nesting and choose elements for purpose rather than appearance.

## Example
A custom card is clickable with a mouse but cannot be reached by keyboard. Replacing the clickable container with a properly styled link often solves keyboard behavior, focus handling and semantics at once.

## Check your understanding
Review a form you have used recently. Identify its labels, focus order, error messages and submit control. Note one improvement you would make.

## Key takeaways
Start with semantic HTML, preserve keyboard access, label controls clearly and communicate meaning in more than one way. Accessibility is easier when it is built in from the start.`,

"CSS Foundations":`## Learning objectives
You will learn how CSS rules are selected and resolved, understand the box model, and use spacing and typography consistently rather than through trial and error.

## Rules and selectors
A CSS rule selects elements and assigns properties. Selectors can target element names, classes, attributes, states and relationships.

Prefer selectors that are easy to understand and do not depend on fragile page structure.

## The cascade
When several rules apply to the same element, the browser resolves them using origin, importance, specificity and source order. Many CSS bugs are really cascade misunderstandings.

Avoid solving every conflict with !important. It usually makes future changes harder.

## The box model
Every element has content, padding, border and margin. With box-sizing: border-box, declared width and height include padding and border, which is often easier to reason about.

## Spacing
Use a small spacing system instead of unrelated values everywhere. Consistent spacing creates visual rhythm and makes components easier to reuse.

## Typography
Choose readable font sizes and line heights. Body text should remain comfortable on small screens. Headings need visual hierarchy without becoming oversized simply for impact.

## CSS variables
Custom properties such as --space-md or --brand can centralize design decisions. This makes themes and global adjustments easier.

## Example
If a card appears wider than its container, inspect width, padding, border and box sizing before adding arbitrary negative margins.

## Check your understanding
Create a simple card mentally or on paper. List the values you would control for content width, padding, border, margin, background and typography. Explain which belong to the card and which should come from the surrounding layout.

## Key takeaways
CSS becomes predictable when you understand the cascade and box model. Use reusable classes, consistent spacing and clear typography instead of accumulating one-off fixes.`,

"Responsive Layout with Flexbox and Grid":`## Learning objectives
You will learn when Flexbox and Grid are appropriate, how responsive layouts adapt to available space and how to avoid designing for only one screen width.

## Responsive design
Responsive design means the interface responds to available space and user needs. It is not the same as creating separate desktop and mobile websites.

Start with content that works in a narrow layout, then add complexity when more space is available.

## Flexbox
Flexbox is strong for one-dimensional layouts: navigation bars, button groups, rows of cards or vertical stacks. Key properties include display:flex, gap, justify-content, align-items, flex-wrap and flex.

## Grid
CSS Grid is strong for two-dimensional layouts where rows and columns need coordinated placement. Grid templates can use flexible units such as fr and functions such as minmax.

## Media queries
Use media queries when the layout genuinely needs a breakpoint. Do not create dozens of device-specific widths. Choose breakpoints based on where content becomes uncomfortable.

## Fluid sizing
Percentages, max-width, min(), max(), clamp() and flexible grid units can reduce the need for many media queries.

## Practical task
Build a layout with main content and a sidebar. On a wide screen, show two columns. On a narrow screen, stack them. Add a consistent gap and ensure text never becomes too narrow to read.

## Common mistakes
Fixed widths can cause horizontal scrolling. Large headings can overflow. A navigation bar may need wrapping or a different mobile treatment.

## Check your understanding
Explain why "desktop width 1440px" is not a complete responsive strategy. Describe how your layout should behave at widths you did not explicitly test.

## Key takeaways
Responsive layouts are flexible systems. Use Flexbox for one-dimensional alignment, Grid for coordinated rows and columns, and breakpoints only where the content needs them.`,

"Design Systems and Reusable Styles":`## Learning objectives
You will understand why repeated visual decisions should become reusable tokens and components, and how a small design system improves consistency without making a project unnecessarily complex.

## What a design system solves
As an application grows, repeated decisions appear: colors, spacing, border radius, shadows, type sizes, buttons, cards and form controls.

If every page invents its own values, inconsistency grows quickly.

## Design tokens
Tokens are named design decisions. Instead of using #16a36a everywhere, define a variable such as --color-primary. Instead of random margins, define a small spacing scale.

Names should describe purpose rather than a specific appearance where possible.

## Components
A button component should define common states such as default, hover, focus and disabled. Variants can represent primary, secondary and destructive actions without duplicating the entire style.

## Consistency versus rigidity
A design system should reduce repeated decisions, not block reasonable exceptions. Keep the first system small and grow it as patterns become genuinely repeated.

## Example
If three pages each contain a slightly different green button with different padding, consolidate them into one reusable button style and explicit variants.

## Documentation
Even a small project benefits from documenting core colors, type scale and spacing rules. This makes future changes faster.

## Check your understanding
List five repeated UI decisions from a website you know. Convert them into token names or reusable component names.

## Key takeaways
A professional interface is consistent because common decisions are centralized. Start with tokens and components that already repeat; avoid building a giant design system before you need one.`,

"JavaScript Fundamentals":`## Learning objectives
You will learn the core building blocks of JavaScript programs and how to choose clear data structures and control flow.

## Values and variables
JavaScript works with strings, numbers, booleans, null, undefined, objects, arrays and other values. Use const by default when a variable binding should not be reassigned. Use let when reassignment is part of the logic.

## Expressions and comparisons
Operators combine values. Strict equality, ===, is usually preferable to loose equality because it avoids unexpected type coercion.

## Conditions
if, else if and else let a program choose behavior based on conditions. Keep conditions readable. Complex boolean logic is easier to maintain when meaningful parts are named.

## Arrays and objects
Arrays represent ordered collections. Objects represent named properties. A course list is naturally an array; each course can be an object with title, price and category fields.

## Loops
Use loops to repeat work over collections. Modern JavaScript also offers array methods such as map, filter and find.

## Functions
Functions package behavior into reusable units. Good functions have clear inputs, a focused responsibility and predictable outputs.

## Example
A filterCourses function can accept a list of courses and a category, then return only matching courses. This is easier to test than mixing filtering logic directly into DOM manipulation.

## Check your understanding
Describe the difference between an array and an object. Write a mental model for a list of students where each student has a name, email and role.

## Key takeaways
Strong JavaScript comes from clear data and small functions, not from clever syntax. Master values, collections, conditions and functions before relying heavily on frameworks.`,

"DOM Events and Interactive UI":`## Learning objectives
You will learn how browser JavaScript finds elements, listens for user actions and updates the document without reloading the page.

## The DOM
The Document Object Model represents the page as objects JavaScript can inspect and modify. document.querySelector can locate an element using a CSS selector.

## Events
Browsers emit events when users click, type, submit forms, resize windows and perform other actions. addEventListener connects a function to an event.

## State and rendering
Even without a framework, interactive interfaces need state. A menu may be open or closed. A counter has a current value. When state changes, the visible page should update consistently.

## Forms
Use the submit event for forms rather than relying only on button clicks. This supports keyboard submission and keeps form behavior centralized.

## Avoid unsafe HTML injection
When inserting user-provided text, prefer textContent rather than innerHTML. Rendering untrusted HTML can introduce security problems.

## Practical task
Select a button, listen for a click and update text on the page. Then extend the exercise by tracking how many times the button has been pressed.

## Debugging
If an event handler does not run, verify that the element exists, the selector is correct and the script executes after the relevant DOM is available.

## Check your understanding
Explain the difference between finding an element and listening for an event. Describe why textContent is safer for plain user text than innerHTML.

## Key takeaways
Interactive browser code follows a simple loop: read state, respond to events and update the interface. Keep event handling predictable and treat user-controlled content carefully.`,

"Async JavaScript and APIs":`## Learning objectives
You will understand asynchronous work, promises, async/await and the steps involved in safely requesting data from an API.

## Why asynchronous code exists
Network requests, timers and some browser operations take time. JavaScript should not freeze the entire interface while waiting.

A Promise represents work that may complete later. async/await provides a readable way to work with promises.

## Fetch
fetch sends an HTTP request and returns a promise for a Response. A fulfilled fetch promise does not guarantee an HTTP success status, so check response.ok or the status code.

## Parsing data
JSON responses can be parsed with response.json(). Validate the shape of important external data instead of assuming every field exists.

## Error states
A useful interface distinguishes loading, success, empty and error states. Users should never be left wondering whether a button worked.

## Example
When loading courses, show a loading indicator, request the API, check the HTTP status, parse the response and display either the courses or a useful error.

## Timeouts and retries
Retries can help with temporary failures, but automatic retries are inappropriate for every operation. Retrying a payment creation request without idempotency could create duplicates.

## Check your understanding
Describe the difference between a network failure and an HTTP 404 response. Explain why both need different handling.

## Key takeaways
Asynchronous code is normal in web applications. Check HTTP status explicitly, validate external data and design the UI for loading and failure as carefully as for success.`,

"Components, Props and State":`## Learning objectives
You will understand React's component model, how props pass information and how state represents information that changes over time.

## Components
A component is a reusable unit of UI and behavior. Good components have a clear purpose. A CourseCard can display one course; a CourseGrid can organize several cards.

## Props
Props are inputs supplied by a parent. They should be treated as read-only. If a CourseCard receives a course object, it should render that course rather than silently changing it.

## State
State represents data that changes while the component is mounted: whether a menu is open, the current form value or the selected tab.

Do not put everything in state. Values that can be calculated from props or other state usually do not need a separate state variable.

## One-way data flow
React becomes easier to reason about when data flows down through props and events flow upward through callbacks.

## State placement
Put state in the closest common component that needs to coordinate it. Moving state too high creates unnecessary complexity; keeping shared state too low makes synchronization difficult.

## Example
A lesson page has a selected tab. That tab belongs in the lesson interface state. The course title is stable input and should be a prop.

## Check your understanding
For a shopping cart interface, classify product information, cart quantity and current search text as props, state or derived values.

## Key takeaways
Components organize UI, props provide inputs and state represents change. Good React design starts by deciding where data belongs before writing event handlers.`,

"Forms and Client-side Validation":`## Learning objectives
You will learn how to build usable forms, provide immediate validation feedback and understand why server-side validation remains mandatory.

## Form state
Controlled inputs store the current field value in state. Uncontrolled forms can use the browser's FormData API. Both approaches can be valid depending on complexity.

## Useful validation
Validation should help the user correct a problem. "Invalid input" is weaker than "Password must contain at least 10 characters."

Validate at appropriate moments. Some checks work during typing; others are less distracting after the user leaves a field or submits the form.

## Accessibility
Associate labels with controls. Preserve keyboard behavior. Move focus thoughtfully when a serious error prevents submission.

## Client versus server
Client-side validation improves speed and user experience, but it cannot protect business rules. A user can bypass browser JavaScript and send requests directly.

The server must validate prices, permissions, roles, payment state and any security-sensitive input independently.

## Practical task
Create a form with at least one required field. Store or read the value, validate it, show a clear error and prevent successful submission until the value is valid.

## Check your understanding
Explain why disabling a button in React is not sufficient authorization. Describe one validation rule that belongs on both client and server.

## Key takeaways
Good forms are clear, accessible and specific about errors. Client validation helps users; server validation protects the application.`,

"Routing and Data-driven Interfaces":`## Learning objectives
You will understand how routes map URLs to application views and how data-driven rendering keeps interfaces consistent.

## Routes
A route represents a location in the application. Static routes such as /courses map to fixed pages. Dynamic routes such as /courses/[slug] use a parameter to identify a specific resource.

## URL design
Readable URLs improve navigation and sharing. Prefer stable identifiers such as slugs for public pages when appropriate.

## Server and client rendering
Modern frameworks may render some content on the server and some in the browser. Choose the boundary deliberately. Sensitive data and authorization checks belong on the server.

## Data-driven rendering
Instead of writing six separate hard-coded course cards, fetch or load a course list and map over the data. This reduces duplication and keeps UI behavior consistent.

## Loading and not-found states
Dynamic routes need clear behavior when the resource does not exist. Return a real 404 instead of displaying an empty page.

## Example
A course page loads the slug from the URL, finds the course, checks whether it is published and then renders modules and enrollment state.

## Check your understanding
Design routes for a small academy with a catalogue, individual courses, dashboard, individual lessons and certificate verification.

## Key takeaways
Routing is part of application architecture. Stable URLs, server-side authorization and data-driven rendering make systems easier to scale and reason about.`,

"REST APIs and Server Logic":`## Learning objectives
You will learn how HTTP methods, routes, validation and status codes combine into predictable application APIs.

## Resources and actions
A REST-style API models resources with URLs and uses HTTP methods for common operations. GET reads, POST creates or triggers a new operation, PATCH applies partial updates and DELETE removes.

Not every real system follows pure REST, but consistency matters more than labels.

## Request validation
Never assume incoming JSON has the expected shape. Validate types, required fields, ranges and formats before using values.

## Authorization
Authentication answers who the user is. Authorization answers whether that user may perform the requested action. Check authorization on the server for every protected operation.

## Responses
Return appropriate status codes and useful JSON errors. Avoid leaking stack traces, database details or secrets.

## Idempotency
Some actions such as payments need protection against duplicate requests. An idempotency key or unique reference can ensure a repeated request does not create the same transaction twice.

## Example
Publishing a course should require an authenticated admin, validate the course ID, check content readiness and then update the published state.

## Check your understanding
Design a POST endpoint for enrolling in a free course. List validation, authorization, database and response steps.

## Key takeaways
Good APIs are predictable contracts. Validate inputs, enforce authorization, return meaningful status codes and design duplicate-sensitive operations carefully.`,

"Relational Databases and Authentication":`## Learning objectives
You will understand relational data modeling, keys and relationships, and how sessions connect authenticated users to protected server actions.

## Tables and relationships
Relational databases organize records into tables. A users table may contain id, name, email and role. A courses table contains course data. An enrollments table connects users to courses.

Primary keys uniquely identify records. Foreign keys enforce relationships and can prevent orphaned data.

## Constraints
Unique constraints can ensure that one email belongs to only one user or that a learner has only one enrollment record per course.

Database constraints complement application validation.

## Password storage
Never store plain-text passwords. Store a password hash created with a password-hashing algorithm or secure key-derivation function and a unique salt.

## Sessions
After login, a server can create a random session token. The browser stores the token in an HTTP-only secure cookie. The database stores a hash of the token and its expiry.

When a request arrives, the server hashes the presented token, finds the session and loads the user.

## Authorization
Roles should be enforced on the server. Hiding an Admin button in the browser does not prevent a student from manually requesting an admin URL.

## Practical task
Sketch users, sessions and enrollments tables. Identify primary keys, foreign keys and one useful unique constraint for each relationship.

## Check your understanding
Explain why a user ID in browser JavaScript is not proof of identity. Explain why session tokens should be random and protected.

## Key takeaways
Relational modeling gives structure and integrity. Authentication establishes identity, sessions maintain it across requests and authorization protects actions based on trusted server-side data.`,

"Testing, Git and Production Deployment":`## Learning objectives
You will combine testing, version control, configuration and deployment practices into a production-readiness workflow for a full-stack application.

## Testing strategy
Different tests answer different questions. Unit tests check focused logic. Integration tests check components working together. End-to-end tests exercise important user journeys.

You do not need thousands of tests. Prioritize behavior that would seriously affect users if it broke: authentication, authorization, payments, enrollment and data integrity.

## Version control
Commit coherent changes with clear messages. Use branches or pull requests when collaboration or review is useful. Do not commit API keys or production secrets.

## Environment configuration
Public configuration can be included in application builds when appropriate. Secrets belong in secure runtime configuration.

Keep development and production assumptions separate. A feature that works with local Node.js APIs may fail in an edge runtime if it relies on unsupported functionality.

## CI
A useful pipeline installs dependencies, runs type checks and tests, builds the production application and only then deploys.

## Production verification
A successful deployment command is not the end. Check health endpoints and critical user journeys in the live environment.

## Rollback
Know how to return to a previous working version when a deployment causes serious problems.

## Capstone task
Prepare a production-readiness checklist for a full-stack academy application. Include authentication, role separation, database migrations, environment variables, monitoring, error handling, backup considerations and a live smoke test.

## Check your understanding
Explain why "build succeeded" and "production works" are different claims. Give three examples of failures that only appear after deployment.

## Key takeaways
Professional software work includes verification after coding. Testing, source control, controlled configuration, CI and production checks turn a project into an operable system.`
};
