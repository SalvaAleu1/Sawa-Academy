export const cyberCourseContent:Record<string,string>={
"Assets, Threats, Vulnerabilities and Risk":`## Learning objectives
You will learn a practical way to reason about security using assets, threats, vulnerabilities, likelihood and impact.

## Assets
An asset is something worth protecting: accounts, devices, money, personal data, business records, service availability or reputation.

Security decisions become clearer when you identify the asset first. "Secure the system" is vague; "protect student records from unauthorized access" is specific.

## Threats
A threat is something capable of causing harm. Examples include account theft, malicious insiders, device loss, phishing, malware, accidental deletion and service outages.

## Vulnerabilities
A vulnerability is a weakness that can be exploited or can contribute to harm. Reused passwords, missing patches, overly broad permissions and exposed admin interfaces are examples.

## Risk
Risk combines the possibility of an unwanted event with its consequences. Teams often think in terms of likelihood and impact.

Not every vulnerability deserves equal urgency. A weakness affecting a public test page is different from one exposing payment credentials.

## Controls
Controls reduce risk. Preventive controls try to stop incidents, detective controls identify them and corrective controls support recovery.

## Example
Asset: primary email account.
Threat: account takeover.
Vulnerability: reused password and no MFA.
Impact: attacker can reset many connected accounts.
Controls: unique password, MFA, recovery review and login alerts.

## Check your understanding
Choose one device or account you use. Identify one asset, two threats, two vulnerabilities and two controls. Explain which risk you would reduce first and why.

## Key takeaways
Security starts with what matters. Identify assets, threats and vulnerabilities, then prioritize controls based on realistic impact and likelihood.`,

"Account Security Audit":`## Learning objectives
You will learn how to review an account systematically rather than relying on one strong password.

## Authentication
Start with the password. It should be unique and difficult to guess. Reuse creates a chain reaction when one service is breached.

## Multi-factor authentication
Enable MFA where available. Prefer stronger factors such as authenticator apps or security keys when the service supports them.

Do not share one-time codes with someone who contacts you unexpectedly.

## Recovery
Check recovery email addresses and phone numbers. Old recovery channels can become hidden weaknesses.

## Sessions and devices
Review signed-in devices and active sessions. Sign out devices you no longer use or recognize.

## Connected applications
Third-party applications may retain access to account data. Remove services you no longer need.

## Alerts
Turn on login or security alerts for important accounts when available.

## Practical task
Use the lab checklist to audit an example account with a reused password, MFA disabled and outdated recovery information. Then apply the same framework to one of your own non-sensitive accounts.

## Prioritization
Fix the primary email account first because it can often reset other accounts.

## Key takeaways
Account security is a system: password, second factor, recovery, sessions and connected apps. Review all of them, not just the password field.`,

"Security Principles":`## Learning objectives
You will understand several security principles that remain useful even when technologies change.

## Least privilege
Give users, services and applications only the access required for their role. Excess privilege increases the impact of mistakes or compromise.

## Defense in depth
Do not depend on one control. A secure account can still be harmed by a compromised device; network controls can complement authentication and monitoring.

## Secure defaults
New users and services should begin with safe settings rather than requiring everyone to discover risky options manually.

## Separation of duties
Critical actions may require more than one role or approval. This reduces the chance that one mistake or compromised account controls everything.

## Minimize attack surface
Disable services and permissions that are not needed. Every exposed interface becomes something to maintain and protect.

## Fail safely
When a security-sensitive check fails, deny the action rather than silently allowing it.

## Example
If payment verification cannot confirm a transaction, the application should not grant paid enrollment "just in case."

## Check your understanding
Apply least privilege and secure defaults to a university student portal. Name three permissions students should have and three they should not have.

## Key takeaways
Good security architecture reduces unnecessary access, layers controls and chooses safe behavior when systems fail.`,

"How Social Engineering Works":`## Learning objectives
You will learn how attackers influence people through urgency, authority, familiarity and fear.

## Human decision-making
Social engineering targets normal human behavior. People respond quickly to authority, emergencies and trusted relationships.

The goal may be to obtain credentials, money, confidential information or access to a system.

## Common techniques
Authority: pretending to be a manager, bank or government office.
Urgency: claiming immediate action is required.
Scarcity: offering a limited reward.
Fear: threatening account closure or punishment.
Familiarity: impersonating a friend or colleague.

## Pretexting
A pretext is a believable story created to justify a request. Attackers may combine public information with impersonation to make the story convincing.

## Defensive habit
Separate the request from the identity claim. Verify unusual requests through an independent channel.

## Example
A message from "IT support" asks for an MFA code to fix your account. Legitimate support should not need your authentication code. Stop and verify through the official support channel.

## Check your understanding
Write three warning signs in a message that asks you to act urgently. Then write one independent verification step.

## Key takeaways
Social engineering succeeds by accelerating decisions. Slow down, verify identity independently and never treat urgency as proof.`,

"Analyze a Suspicious Message":`## Learning objectives
You will use a repeatable process to examine a suspicious message without exposing yourself to unnecessary risk.

## Step 1: Context
Ask whether you expected the message. Unexpected invoices, login warnings or delivery notices deserve extra caution.

## Step 2: Sender
Inspect the actual sender address or account, not only the display name. Slight spelling changes can be easy to miss.

## Step 3: Request
Identify what the message wants: login, payment, file download, secret code or personal information.

## Step 4: Link destination
Do not trust link text alone. If you can inspect the destination safely, compare the real domain with the organization's known domain.

## Step 5: Independent verification
Open the official application or website separately. Contact the sender through a known channel.

## Attachments
Unexpected archives, executables and documents requesting macros or unusual permissions should be treated cautiously.

## Practical task
Use the lab to document sender, urgency, destination domain and verification path for a suspicious message. The goal is analysis, not opening unsafe content.

## Check your understanding
A message comes from a familiar person's compromised account. Which warning signs might disappear, and which verification method still works?

## Key takeaways
Evaluate context, identity, request and destination. Independent verification is stronger than visual familiarity.`,

"Safe Reporting and Recovery":`## Learning objectives
You will learn what to do after a suspicious message, accidental click or possible credential exposure.

## If you only received the message
Do not interact with suspicious links or attachments. Report the message through the platform or organization and remove it after evidence is preserved if needed.

## If you clicked but entered nothing
Close the page. If a file was downloaded, do not open it. Run appropriate device security checks and report the event if it occurred on a managed workplace or school device.

## If you entered credentials
Change the password from a trusted device, sign out other sessions and enable or review MFA. If the same password was reused elsewhere, change those accounts too.

## If an MFA code was shared
Treat the account as potentially compromised. Reset credentials and review session/device history immediately.

## If money was sent
Contact the financial provider promptly through official channels. Fast reporting may improve the chance of recovery.

## Preserve evidence
Record timestamps, screenshots and relevant account details without publicly reposting sensitive information.

## Check your understanding
Create a recovery checklist for an email credential compromise. Include password, MFA, sessions, recovery settings and connected accounts.

## Key takeaways
Recovery depends on what happened. Respond quickly, secure the account from a trusted path and preserve enough evidence for reporting.`,

"Network Security Basics":`## Learning objectives
You will understand how networks separate systems and how defensive controls reduce unnecessary exposure.

## Network boundaries
Devices communicate through networks using addresses and ports. Routers move traffic between networks.

## Segmentation
Segmentation separates systems so compromise of one area does not automatically expose everything else. A public web server and a sensitive database should not have the same exposure.

## Firewalls
Firewalls allow or block traffic based on rules. Apply least privilege to network rules just as you do to user permissions.

## Wi-Fi
Use modern encryption and strong administrator credentials on wireless networks. Public Wi-Fi should be treated as untrusted.

## DNS and HTTPS
DNS finds services; HTTPS protects web traffic in transit and authenticates the server certificate.

## Monitoring
Network logs can help identify unusual connections, but collecting logs is only useful if someone can review meaningful alerts.

## Check your understanding
Design a small office network containing staff devices, guest Wi-Fi and an internal file server. Explain why guests should not have unrestricted access to the internal server.

## Key takeaways
Network security limits pathways. Segmentation, firewalls, encryption and monitoring reduce the impact of compromise.`,

"Harden a Personal Device":`## Learning objectives
You will create a practical device-hardening checklist for phones and computers.

## Updates
Enable operating-system and application updates. Security patches fix known weaknesses.

## Screen lock
Use a strong PIN, password or supported biometric control. Configure automatic locking after a reasonable period.

## Storage protection
Use full-disk encryption when available. Encryption reduces data exposure if a device is lost or stolen.

## Applications
Remove software you no longer use. Install from reputable sources and review requested permissions.

## Accounts
Avoid using administrator privileges for ordinary work when the operating system supports separate privilege levels.

## Backups
Maintain backups of important files. A secure device can still fail physically.

## Location and remote actions
Know whether the device supports remote location or remote wipe and make sure the associated account is protected.

## Practical task
Use the lab checklist to review updates, screen lock, encryption, applications and backup status. Record one improvement you can make today.

## Key takeaways
Hardening is reducing unnecessary risk through updates, access control, encryption, software hygiene and recoverability.`,

"Backups and Recovery":`## Learning objectives
You will learn how backups reduce the impact of device loss, accidental deletion and ransomware.

## Backup versus synchronization
Synchronization keeps copies aligned. If you delete a synchronized file, the deletion may spread. A backup should preserve recoverable historical copies.

## 3-2-1 concept
A common guideline is to keep multiple copies, on more than one type of storage, with at least one copy separated from the primary environment.

The exact strategy depends on cost and importance.

## What to back up
Prioritize data that cannot be recreated easily: documents, project files, photographs, records and configuration.

## Recovery testing
A backup you have never restored is only an assumption. Periodically test recovery of sample files.

## Ransomware
Offline or protected backups can prevent an attacker from encrypting both the live data and every recovery copy.

## Retention
Decide how long older versions are kept. One recent copy may not help if corruption was unnoticed for weeks.

## Check your understanding
Design a backup approach for a student's important academic files using a laptop, cloud storage and one additional method.

## Key takeaways
Backups are about recovery, not simply copying. Protect multiple versions and test that restoration actually works.`,

"Authentication and Authorization":`## Learning objectives
You will distinguish authentication from authorization and understand why both must be enforced on the server.

## Authentication
Authentication establishes identity. Passwords, passkeys, MFA and session tokens are authentication mechanisms.

## Authorization
Authorization determines what an authenticated identity may do. An admin may publish courses; a student may view their own progress.

## Session security
Session tokens should be difficult to guess, protected in transit and expire appropriately. HTTP-only cookies can reduce exposure to client-side scripts.

## Server enforcement
Hiding an admin link in the user interface is not authorization. The API must check the user's trusted role before every protected action.

## Object-level authorization
Even two students with the same role should not automatically access each other's private records. The server must verify ownership or permission for the specific object.

## Example
A student changes a URL from /students/123 to /students/124. The server must still reject access if 124 belongs to another learner.

## Check your understanding
Give one example of authentication failure and one example of authorization failure.

## Key takeaways
Authentication answers who; authorization answers what that identity may do. Both belong in trusted server-side logic.`,

"Secure Input and Secrets":`## Learning objectives
You will learn why all external input is untrusted and how to keep secrets out of client-side code and repositories.

## Input validation
Validate type, length, format and allowed values. A course price should be numeric and non-negative; an email should have a plausible format.

## Database queries
Use parameterized queries or safe query builders. Do not concatenate untrusted input into SQL strings.

## Output context
Validation does not replace output encoding. Data displayed in HTML must be rendered safely to reduce injection risk.

## Secrets
API keys, database credentials and signing keys belong in protected runtime configuration.

A variable prefixed as public in a front-end framework may become visible to every user.

## Secret rotation
If a credential is exposed in Git history or logs, rotate it. Deleting the visible line is not enough.

## Practical task
List two values that belong in public configuration and two that belong in secrets. Explain the difference.

## Key takeaways
Treat input as untrusted until validated, use safe data-access methods and keep credentials only in protected server environments.`,

"Common Web Security Risks":`## Learning objectives
You will recognize several high-level web security risks from a defensive perspective.

## Injection
Injection happens when untrusted input is interpreted as code or commands. Parameterized queries reduce SQL injection risk.

## Cross-site scripting
XSS occurs when unsafe content becomes executable script in another user's browser. Framework escaping helps, but developers must be careful with raw HTML features.

## Broken access control
A user accesses data or actions they should not be allowed to use. This is one of the most serious classes of application flaws.

## CSRF
Cross-site request forgery tricks a logged-in browser into sending an unwanted request. SameSite cookies, origin checks and anti-CSRF tokens are possible controls depending on architecture.

## Misconfiguration
Debug endpoints, default credentials, public storage and excessive permissions can expose systems without a sophisticated exploit.

## Dependency risk
Third-party libraries can contain vulnerabilities. Track dependencies and update deliberately.

## Defensive focus
The goal of this course is recognition and prevention, not exploitation. Practice only in authorized environments.

## Check your understanding
Map one control to each risk: input validation/query parameterization, output escaping, authorization checks and secure configuration review.

## Key takeaways
Web security failures often come from broken trust boundaries. Validate, encode, authorize and configure deliberately.`,

"Incident Response Lifecycle":`## Learning objectives
You will understand the phases of incident response and why preparation matters before an incident occurs.

## Preparation
Define contacts, logging, backups, access procedures and response roles before a crisis.

## Detection and analysis
Confirm whether an event is a real incident, determine affected systems and preserve evidence.

## Containment
Limit further harm. Actions may include disabling an account, isolating a device or blocking a malicious connection.

## Eradication
Remove the root cause or attacker persistence after evidence is understood.

## Recovery
Restore systems carefully, monitor for recurrence and validate business functions.

## Lessons learned
Document timeline, contributing factors and corrective actions.

## Communication
Share verified facts and clearly separate assumptions from evidence. Sensitive incidents may require legal or regulatory communication.

## Check your understanding
A staff email account is compromised. Give one action for each lifecycle phase.

## Key takeaways
Incident response is a process, not panic. Preparation, evidence and controlled recovery reduce both technical and organizational damage.`,

"Write an Incident Timeline":`## Learning objectives
You will learn how to document security events chronologically so responders can reconstruct what happened.

## Use timestamps
Record time with timezone. Relative phrases such as "later that morning" are harder to compare across systems.

## Separate observation from conclusion
"Login from new IP observed at 10:14" is evidence. "Attacker entered at 10:14" may be a conclusion requiring more support.

## Record actions
Document containment and recovery actions with time and responsible person. This helps identify whether an action improved or worsened the situation.

## Preserve source
Record where evidence came from: audit log, user report, email header or endpoint event.

## Practical task
Build a timeline containing first observation, confirmation, containment, credential reset, session revocation and recovery verification.

## Post-incident use
A good timeline supports root-cause analysis, communication and future detection improvements.

## Check your understanding
Rewrite a vague statement—"We got hacked yesterday and fixed it"—into three evidence-based timeline entries.

## Key takeaways
Incident timelines should be factual, timestamped and source-aware. Good documentation turns scattered events into an analyzable sequence.`,

"Responsible Security Practice":`## Learning objectives
You will understand authorization, ethical boundaries and how to build security skills without harming other systems.

## Authorization
Security testing must occur on systems you own or have explicit permission to test. Curiosity does not grant permission.

## Scope
Professional engagements define which systems, times and techniques are allowed. Staying within scope is part of technical competence.

## Data handling
Testing may expose sensitive information. Minimize collection, protect evidence and follow reporting requirements.

## Disclosure
If you discover a vulnerability accidentally, avoid expanding the test. Document what is necessary and use the organization's responsible disclosure channel when available.

## Safe learning
Use intentionally vulnerable labs, capture-the-flag environments and your own systems for practice.

## Careers
Defensive roles include security operations, cloud security, governance, application security, incident response and security engineering.

## Professional reputation
Trust is central to security work. Documentation, restraint and respect for authorization matter as much as technical skill.

## Check your understanding
Explain why "I was only testing" is not a sufficient justification for probing someone else's service without permission.

## Key takeaways
Responsible security practice is authorized, scoped, evidence-based and respectful of data. Technical ability without boundaries creates risk rather than security.`
};
