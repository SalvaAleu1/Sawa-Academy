export const gitCourseContent:Record<string,string>={
"Repositories, Commits and History":`## Learning objectives
You will learn what Git stores, how commits form project history and why good version control is more than uploading files.

## Repository
A Git repository contains your working files plus metadata that records history. Git does not continuously save every keystroke. It records snapshots when you create commits.

## Working tree, staging area and repository
The working tree contains files as they currently exist. The staging area contains the exact changes you intend to include in the next commit. The repository stores committed history.

This separation lets you review and group related changes instead of committing everything accidentally.

## Commits
A commit should represent one coherent change. A message such as "Fix login redirect for admin users" is more useful than "update."

Good history helps debugging. If a feature breaks, you can inspect when behavior changed and why.

## Identity
Git records author information in commits. Configure it accurately. Do not treat commit metadata as authentication; it is descriptive information.

## Check your understanding
Explain why staging exists. Give an example of two unrelated changes that should usually be committed separately.

## Key takeaways
Git is a history system, not simply cloud storage. Thoughtful staging and coherent commits create a record that helps teams review, debug and recover work.`,

"Practice the Core Git Workflow":`## Learning objectives
You will practice the basic local Git cycle: initialize, inspect, stage, commit and review history.

## Initialize
git init creates repository metadata in the current directory. Before running it, confirm that you are in the intended project folder.

## Inspect
git status is one of the most important commands in Git. It tells you which files are untracked, modified or staged.

## Stage
git add chooses changes for the next commit. git add . stages many changes at once, but review status first so you do not accidentally stage secrets or generated files.

## Commit
git commit -m "message" records the staged snapshot. A commit can succeed even when other working-tree changes remain unstaged.

## Review
Use git log to inspect history and git diff to understand changes. Learn to review before committing rather than after a mistake.

## Practical task
Initialize a practice repository, create a text file, inspect status, stage it and commit it. Then modify the file, use git diff and create a second commit.

## Safety note
Before your first real commit, create an appropriate .gitignore for environment files, build outputs and editor artifacts.

## Key takeaways
The core workflow is inspect, stage intentionally, commit coherently and review. git status should become a habit.`,

"Reading History and Undoing Safely":`## Learning objectives
You will learn how to inspect previous work and choose safer recovery methods without destroying changes unintentionally.

## Reading history
git log shows commits. A compact graph view can help visualize branch history. git show displays a particular commit and its changes.

## Working-tree mistakes
If you changed a file and want to compare it with the last committed version, use git diff first. Do not reach immediately for destructive commands.

## Restoring files
Modern Git provides git restore for discarding or unstaging selected changes. Understand exactly whether you are changing the working tree, staging area or commit history.

## Reverting commits
git revert creates a new commit that reverses an earlier commit. This is often safer for shared branches because it preserves history.

## Reset
git reset can move branch history and may remove work depending on options. It is powerful and should be used carefully, especially after commits have been shared.

## Recovery mindset
Before undoing anything, identify what you want to preserve. Create a backup branch if you are uncertain.

## Check your understanding
A bad commit has already been pushed to a shared branch. Explain why revert is usually safer than rewriting shared history.

## Key takeaways
Inspect first. Prefer reversible operations when collaborating. The safest Git user understands what each undo command changes before running it.`,

"Branching Strategy":`## Learning objectives
You will understand why branches exist and how to use them without creating unnecessary complexity.

## Branches
A branch is a movable name pointing to a commit. Creating a branch is cheap; it does not duplicate the entire project.

## Why branch
Branches isolate work so a feature, fix or experiment can develop without immediately changing the main line.

## Naming
Use names that communicate purpose, such as feature/course-search or fix/admin-redirect.

## Short-lived branches
For many teams, small short-lived branches are easier to review and merge than branches that remain separate for weeks.

## Main branch
The primary branch should represent integrated work. Protect it with review or CI where appropriate.

## Avoid branch chaos
Branches are not a substitute for coordination. If two developers change the same code in different directions, Git may merge syntax but cannot decide which product behavior is correct.

## Check your understanding
Describe one situation where a branch is helpful and one situation where creating another branch adds no value.

## Key takeaways
Branches isolate change. Keep them purposeful, small and synchronized with the main branch to reduce merge risk.`,

"Create and Merge a Feature Branch":`## Learning objectives
You will practice creating a branch, committing a focused change and merging it back.

## Create and switch
Use git switch -c feature-name to create and enter a new branch. Verify the current branch before editing.

## Make a focused change
Change only what the branch is meant to address. If you notice an unrelated problem, record it for later rather than quietly expanding scope.

## Commit
Review git diff and git status, then create a clear commit.

## Bring in recent main changes
Before merging a long-lived branch, update your local main branch and integrate relevant changes. Small branches reduce this burden.

## Merge
Switch to the target branch and merge the feature. If Git can combine the history automatically, the merge completes without conflict.

## Verify
Run tests after the merge. A clean Git merge does not guarantee the application behavior is correct.

## Practical task
Create a feature branch, modify one file, commit the change, merge it into main and inspect the resulting log.

## Key takeaways
A complete branch workflow includes verification before and after merging. The goal is controlled integration, not merely running git merge.`,

"Merge Conflicts":`## Learning objectives
You will understand why merge conflicts happen and how to resolve them based on intended behavior rather than choosing text blindly.

## Why conflicts happen
A conflict occurs when Git cannot confidently combine overlapping changes. This is normal in collaborative work.

## Conflict markers
Git marks conflicting regions with sections representing different versions. Do not leave those markers in the final file.

## Resolve semantically
Read both changes and understand the intended behavior. Sometimes the correct result is one side, sometimes a combination, and sometimes a new implementation.

## Test after resolving
A file can be syntactically conflict-free but logically wrong. Run relevant tests and inspect the final diff.

## Communication
If the conflicting code belongs to another developer, ask about intent instead of guessing.

## Reduce conflicts
Pull or fetch updates regularly, keep branches focused and avoid large unrelated formatting changes mixed with feature changes.

## Check your understanding
Explain why clicking "accept both" in an editor is not a complete conflict-resolution strategy.

## Key takeaways
Merge conflicts are decision points. Resolve meaning, not markers, then test the integrated result.`,

"Remotes and GitHub Repositories":`## Learning objectives
You will learn how local Git repositories connect to remote hosting and what push, pull and fetch actually do.

## Remotes
A remote is a named reference to another repository location. origin is a convention, not a special Git keyword.

## Fetch
git fetch downloads remote history and updates remote-tracking references without automatically changing your working branch.

## Pull
git pull combines fetching with integration, often through merge or rebase depending on configuration.

## Push
git push sends local commits to a remote branch. It may be rejected when the remote contains newer work that you have not integrated.

## Authentication
Modern hosting services use secure authentication such as tokens, SSH keys or browser-based credential flows. Never place personal access tokens directly into repository files.

## Repository visibility
Public repositories are visible to anyone. Private repositories still require careful secret handling because access may expand later.

## Check your understanding
Explain the difference between Git and GitHub. Then explain the difference between fetch and pull.

## Key takeaways
Git works locally; GitHub hosts repositories and collaboration features. Understand remote synchronization before treating push and pull as magic commands.`,

"Pull Requests and Reviews":`## Learning objectives
You will learn how pull requests support discussion, automated checks and deliberate integration.

## A pull request is a proposal
A pull request shows the difference between a source branch and a target branch. It gives collaborators a place to review changes before merging.

## Good description
Explain what changed, why, how it was tested and any known limitations. Link the relevant issue when appropriate.

## Keep scope reviewable
Very large pull requests are difficult to understand. Smaller coherent changes receive better review.

## Review comments
Review code, not the person. Ask questions when intent is unclear. Distinguish blocking issues from optional suggestions.

## Automated checks
CI can run type checking, tests and builds. A green check is evidence, not proof that every behavior is correct.

## Practical task
Draft a pull request for an imaginary login fix. Include summary, testing evidence, risk and screenshots or notes when UI behavior changes.

## Key takeaways
Pull requests create a quality checkpoint. Clear scope, good evidence and respectful review make collaboration faster and safer.`,

"Issues, Projects and Team Workflow":`## Learning objectives
You will learn how issues and lightweight planning connect user problems to code changes.

## Issues
An issue should describe a bug, task or improvement clearly enough that another person understands the expected outcome.

Useful bug reports include steps to reproduce, expected behavior, actual behavior and environment details.

## Labels and milestones
Labels help categorize work. Milestones group related issues around a release or objective.

## Project boards
Boards visualize work states such as planned, in progress and done. The exact tool matters less than keeping work visible and current.

## Link code to work
Reference issue numbers in pull requests or commit messages when useful. This creates traceability from a requirement to the implementation.

## Avoid administration for its own sake
A small project does not need a complicated process. Use enough structure to prevent forgotten work and unclear ownership.

## Check your understanding
Write a short issue for a student who is redirected to the wrong dashboard after login. Include reproduction steps and expected behavior.

## Key takeaways
Team workflow should make work understandable and traceable. Good issues describe outcomes; boards help coordinate rather than replace communication.`,

"README, Licensing and Documentation":`## Learning objectives
You will learn how repository documentation helps others understand, run and contribute to a project.

## README
A useful README explains what the project is, how to set it up, required configuration, common commands and how to verify that it works.

Avoid filling a README with internal notes that belong in issue tracking.

## Installation
Write setup steps that a new developer can actually follow. Specify required runtime versions when they matter.

## Configuration
Document environment-variable names and purpose, but never publish real secret values.

## Licensing
A license defines how others may use, modify and distribute code. Public visibility alone does not grant unlimited rights.

Choose a license deliberately for projects you intend to share.

## Contribution guidance
Team projects may document branch conventions, testing expectations and code review requirements.

## Check your understanding
Review a repository you own. Could a new contributor install and run it without asking you private questions? List what is missing.

## Key takeaways
Documentation is part of software quality. A repository should explain itself without exposing credentials or internal operational secrets.`,

"Repository Hygiene":`## Learning objectives
You will learn how to keep repositories clean, secure and understandable over time.

## .gitignore
Ignore generated dependencies, build outputs, local environment files and operating-system artifacts that do not belong in version history.

## Secrets
Never commit API keys, passwords, database URLs or private tokens. If a secret is committed, removing the line in a later commit does not erase it from earlier history. Rotate the credential.

## Generated files
Do not commit large generated directories when they can be recreated from source unless the project deliberately requires them.

## Commit quality
Avoid committing unrelated formatting changes together with behavior changes. Small coherent commits are easier to review and revert.

## Dependency files
Commit the appropriate lockfile for reproducible dependency resolution when your ecosystem uses one.

## Practical task
Draft a .gitignore for a Node or Python project. Include environment files, dependency/build directories and editor/system artifacts.

## Key takeaways
Repository hygiene reduces noise and security risk. Keep source, configuration templates and reproducible metadata; exclude secrets and disposable outputs.`,

"Capstone Collaboration Workflow":`## Learning objectives
You will combine issues, branches, commits, pull requests, review and CI into a professional collaboration workflow.

## Scenario
Your team needs to add a Profile page to an academy. Begin with an issue describing the user need and acceptance criteria.

## Branch
Create a focused branch for the change. Keep unrelated fixes out of scope.

## Development
Implement the feature in small coherent commits. Run local checks before pushing.

## Pull request
Describe the change, testing evidence and any migration or deployment considerations. Request review.

## Review
Address comments thoughtfully. When requirements change during review, update the issue or pull request description so the record stays accurate.

## CI
Require type checks, tests and production build to pass before merging.

## Merge and verify
Merge according to team policy, deploy and then verify the live user journey. Close the issue only when the production behavior is confirmed.

## Retrospective
If the change caused an unexpected problem, record what the process should catch next time.

## Final activity
Write a complete workflow for one real feature you plan to build. Include issue, branch name, commit strategy, tests, pull request evidence and production verification.

## Key takeaways
GitHub collaboration is a process of controlled change. Tools are useful because they create visibility, evidence and recovery points—not because every project needs bureaucracy.`
};
