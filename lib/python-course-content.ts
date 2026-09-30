export const pythonCourseContent:Record<string,string>={
"Values, Variables and Types":`## Learning objectives
You will learn how Python represents data, how variables refer to values and how type choices affect program behavior.

## Values and types
Python programs work with values such as integers, floating-point numbers, strings, booleans and None. A type describes what operations make sense for a value. You can add two numbers, join two strings and test booleans in conditions.

Use type() during learning to inspect a value, but learn to predict types by reading code.

## Variables
A variable is a name bound to a value. In name = "Amina", the variable name refers to the string "Amina". Variables can later be rebound to new values.

Choose meaningful names. total_price communicates more than x.

## Type conversion
User input arrives as text. If a learner enters "22", input() returns a string. Convert it with int() before numerical calculations. Conversion can fail, so later lessons will cover validation and exceptions.

## Mutability
Some Python objects can change in place. Lists and dictionaries are mutable; strings, integers and tuples are immutable. This distinction becomes important when values are shared between functions.

## Example
price = 25
quantity = 3
total = price * quantity
message = "Total: " + str(total)

Here, price and quantity are integers, total is calculated numerically and the final line converts the value for display.

## Check your understanding
For each value, predict the type: 7, 7.0, "7", True, None and [7]. Then explain why "7" + "3" behaves differently from 7 + 3.

## Key takeaways
Values have types, variables give values meaningful names and conversion should be explicit. Understanding types early prevents many confusing bugs.`,

"Write Your First Python Program":`## Learning objectives
You will combine variables, input and output into a small program and learn a simple workflow for running and improving code.

## A program is a sequence of decisions
Start with the problem before the syntax. Suppose you want to greet a learner and calculate their age next year. The inputs are name and age. The processing is age + 1. The outputs are two readable sentences.

## Input and output
input() reads text from the user. print() displays output. Convert numeric input before calculations.

name = input("Your name: ")
age_text = input("Your age: ")
age = int(age_text)
print("Hello, " + name)
print("Next year you will be " + str(age + 1))

## Readability
Use one responsibility per line and meaningful variable names. Avoid compressing beginner code into clever one-liners.

## Test with more than one value
A program that works for one input is not necessarily correct. Try a short name, a long name and different ages.

Also test incorrect input. If the user enters "twenty", int() fails. You do not have to solve that yet, but noticing the failure is part of learning.

## Practical task
In the lab, create name and age variables, print both in a sentence and use formatted output. Then add one extra variable representing the learner's study goal and include it in the output.

## Reflection
After the code works, explain each line in plain language. If you cannot explain it, you have not finished the exercise.

## Key takeaways
Plan inputs, processing and outputs first. Write readable code, test more than one case and explain what every line does.`,

"Conditions and Program Flow":`## Learning objectives
You will use comparisons, boolean logic and conditional branches to make programs choose different behavior.

## Comparisons
Comparisons produce True or False. Common operators include ==, !=, <, <=, > and >=.

Do not confuse =, which assigns a value, with ==, which compares values.

## if statements
An if block runs only when its condition is true. elif adds another condition and else handles the remaining case.

score = 78
if score >= 70:
    print("Pass")
else:
    print("Try again")

Indentation is part of Python syntax. Code inside a branch must be indented consistently.

## Boolean logic
and requires both conditions to be true. or requires at least one. not reverses a boolean.

Avoid writing one enormous condition. Break complicated rules into named variables such as has_completed_lessons and passed_assessment.

## Order matters
Branches are checked from top to bottom. Put more specific conditions before broader ones when they overlap.

## Example
A course may issue a certificate only when the learner completed all lessons and passed the final assessment. That business rule can be represented as two booleans combined with and.

## Check your understanding
Design conditions for classifying an exam score as distinction, pass or fail. Consider what should happen exactly at the boundary values.

## Key takeaways
Conditions turn data into decisions. Use clear comparisons, readable boolean expressions and deliberate branch ordering.`,

"Lists, Tuples, Sets and Dictionaries":`## Learning objectives
You will compare Python's core collection types and choose the right one for common programming tasks.

## Lists
Lists are ordered and mutable. Use them when you need a sequence that may change.

courses = ["Python", "Git", "Cloud"]

You can access items by index, append new items and iterate through the list.

## Tuples
Tuples are ordered but immutable. They are useful for small fixed groups of values where modification is not expected.

## Sets
Sets store unique values and are useful for membership checks and removing duplicates.

completed = {"lesson-1", "lesson-2"}

Checking whether "lesson-1" is in completed is natural and fast.

## Dictionaries
Dictionaries map keys to values. A student record may contain name, email and role.

student = {"name": "Amina", "role": "student"}

Access values by key and use get() when a missing key is acceptable.

## Choosing a collection
Ask whether order matters, duplicates are allowed, values need names and the collection needs to change.

## Example
A list of enrolled courses should normally remain ordered. A set of completed lesson IDs is useful for membership. A dictionary represents the fields of one course.

## Check your understanding
Choose a collection type for: unique tags, a fixed latitude/longitude pair, an ordered shopping list and a user record with named fields.

## Key takeaways
Collection choice communicates intent. Lists are ordered and mutable, tuples are fixed, sets emphasize uniqueness and dictionaries organize named data.`,

"Loop Through Real Data":`## Learning objectives
You will use loops to process collections and learn how to avoid common mistakes with iteration.

## for loops
A for loop takes each item from an iterable in turn.

for course in courses:
    print(course)

Use singular names for each item and plural names for collections when possible.

## enumerate
When you need both an item and its position, enumerate is clearer than managing a counter manually.

for position, course in enumerate(courses, start=1):
    print(position, course)

## Filtering during iteration
You can use a condition inside the loop, but if the purpose is to create a filtered collection, a list comprehension may later be more concise.

## Avoid modifying a list while iterating
Removing items from the same list you are looping over can skip values or create confusing behavior. Build a new list or iterate over a copy when necessary.

## Practical task
Create a list of at least three course names. Loop through it and print a numbered catalogue. Then add a second list of prices and discuss why separate parallel lists are less reliable than a list of dictionaries.

## Check your understanding
Explain what variable changes during each loop iteration. Predict the output of a loop before running it.

## Key takeaways
Loops express repeated work. Keep the loop body focused, use enumerate for positions and choose data structures that keep related values together.`,

"Comprehensions and Data Transformation":`## Learning objectives
You will learn how comprehensions create new collections from existing data and when a normal loop is clearer.

## List comprehensions
A list comprehension combines iteration and transformation.

prices = [10, 20, 30]
with_tax = [price * 1.1 for price in prices]

The result is a new list; the original list is unchanged.

## Filtering
A condition can filter values.

expensive = [price for price in prices if price >= 20]

## Readability first
Comprehensions are useful for simple transformations. When the logic contains several conditions, error handling or side effects, a normal loop is easier to read.

## Dictionary and set comprehensions
The same idea can build dictionaries and sets. For example, a dictionary can map course IDs to titles for quick lookup.

## Data pipelines
Real programs often transform data in stages: load records, validate them, filter invalid entries, normalize fields and produce output.

## Example
Given student dictionaries, you can create a list containing only the email addresses of active students. Before writing the comprehension, state the input and desired output clearly.

## Check your understanding
Rewrite a simple loop that squares numbers as a list comprehension. Then give one example where you would deliberately keep the loop instead.

## Key takeaways
Comprehensions are concise tools for simple transformations. Use them when they make intent clearer, not merely to make code shorter.`,

"Functions and Scope":`## Learning objectives
You will learn how functions organize programs, how parameters and return values work and how scope affects variable access.

## Why functions matter
Functions reduce duplication and give a name to a piece of behavior. A good function does one understandable job.

## Parameters and arguments
Parameters are the names defined by the function. Arguments are the values passed when it is called.

def calculate_total(price, quantity):
    return price * quantity

## Return values
return sends a result back to the caller. Printing a value and returning a value are different. Functions that return results are easier to reuse and test.

## Scope
Variables created inside a function are local to that function unless deliberately returned or otherwise shared. Avoid relying heavily on global mutable state.

## Defaults
Default arguments can make APIs convenient, but avoid mutable defaults such as [] because the object can be shared between calls.

## Function design
Prefer clear names, small responsibilities and explicit inputs. If a function needs ten unrelated parameters, the design may need reconsideration.

## Check your understanding
Design a function that calculates course completion percentage from completed lessons and total lessons. State its inputs, return value and behavior when total lessons is zero.

## Key takeaways
Functions create reusable boundaries. Clear inputs, predictable outputs and limited side effects make programs easier to test and maintain.`,

"Build a Reusable Utility":`## Learning objectives
You will turn a small requirement into a reusable Python function and verify it with multiple examples.

## Start with a contract
Before coding, write what the function accepts and what it returns.

Suppose format_name receives a person's name and should return a cleaned display version. Decide how to handle leading spaces, repeated spaces and empty input.

## Implementation
A first version might use strip() to remove surrounding whitespace and title() to normalize capitalization. Real names are diverse, so discuss the limitations of aggressive automatic capitalization.

## Validation
A reusable utility should define behavior for unexpected input. Should an empty string return an empty string or raise an error? There is no universal answer; the important part is making the decision explicit.

## Testing
Call the function with ordinary input, input containing spaces and at least one edge case. Compare the actual output with expected output.

## Practical task
Complete the starter function, return a value and call it twice. Then extend it with one validation rule and write three manual test cases.

## Reuse
Move the function mentally into another program. Does its name still make sense? Does it depend on hidden global variables? If so, improve it.

## Key takeaways
Reusable code starts with a clear contract. Define inputs, outputs and edge cases, then test the function with more than the happy path.`,

"Modules and Packages":`## Learning objectives
You will learn how Python modules organize code, how imports work and how packages help structure larger applications.

## Modules
A Python file can act as a module. Functions and classes defined in one file can be imported by another.

Keep related behavior together. A payments.py module should not also contain unrelated image-processing utilities.

## Imports
import module keeps the module namespace visible. from module import name imports a specific symbol. Avoid wildcard imports because they make it unclear where names came from.

## The main guard
if __name__ == "__main__": lets a file run code only when executed directly, not when imported.

## Packages
A package groups modules into a directory structure. Many projects use __init__.py to make package boundaries explicit.

## Third-party packages
Install dependencies in an isolated virtual environment. Record project dependencies so another developer can reproduce the environment.

## Dependency caution
Every dependency adds maintenance and security considerations. Prefer established packages and avoid adding a library for trivial functionality.

## Check your understanding
Sketch a project with files for users, courses and database access. Decide which functions belong in each module and how the main application should import them.

## Key takeaways
Modules and packages turn a script into maintainable software. Organize around responsibilities, keep imports clear and manage external dependencies deliberately.`,

"Files and Structured Data":`## Learning objectives
You will learn safe patterns for reading and writing text, JSON and CSV data.

## Files
Use with open(...) so Python closes the file automatically even if an error occurs.

with open("notes.txt", "r", encoding="utf-8") as file:
    text = file.read()

Specify text encoding when portability matters.

## Writing
Opening a file with "w" replaces existing content. "a" appends. Understand the mode before writing important files.

## JSON
JSON represents objects, arrays, strings, numbers, booleans and null. Python's json module converts between JSON text and Python dictionaries/lists.

## CSV
CSV is common for tabular data but requires careful handling of quoting and delimiters. Use the csv module rather than manually splitting every line by commas.

## Paths
Use pathlib for modern path handling. Avoid assuming a script always runs from a particular current directory.

## Validation
A valid JSON file can still contain the wrong fields. Parsing and validating are separate steps.

## Example
An opportunities dataset may load successfully but contain a missing deadline. The program should decide how to handle incomplete records.

## Check your understanding
Explain the difference between file format validity and business-data validity. Describe what could go wrong if a production script overwrites a file accidentally.

## Key takeaways
Use context managers, standard parsers and explicit validation. File handling is simple until data matters—then careful modes, paths and backups become important.`,

"Work with an API Response":`## Learning objectives
You will learn how to interpret structured API data and safely extract the fields your program needs.

## API responses
A web API often returns JSON. After parsing, the result may become a Python dictionary containing nested dictionaries and lists.

Never assume the response always matches the happy-path example.

## Direct indexing versus get
data["status"] fails with KeyError if status is missing. data.get("status") returns None or a supplied default.

Use direct indexing when the field is required and a missing value should be treated as an error. Use get when the field is legitimately optional.

## Nested data
Break complicated extraction into steps. This makes missing data easier to diagnose.

## HTTP context
In a real API client, validate the HTTP status before trusting the body. A 500 error may return a different JSON shape from a successful response.

## Practical task
Use the provided dictionary as a simulated API response. Read status and count, print a summary and then extend the dictionary with a nested course object. Extract it safely.

## Validation
For production code, a schema library can verify types and required fields. Even without one, write explicit checks before using important values.

## Check your understanding
What should your program do if a field documented as an integer arrives as a string? Explain the difference between silently converting it and rejecting invalid data.

## Key takeaways
Treat API data as external input. Parse it, validate it and handle missing or unexpected fields intentionally.`,

"Exceptions and Defensive Programming":`## Learning objectives
You will learn how exceptions signal failures and how to handle expected problems without hiding programming errors.

## Exceptions
An exception interrupts normal execution. Examples include ValueError for invalid conversion, FileNotFoundError and KeyError.

## try and except
Catch exceptions when you can respond meaningfully.

try:
    age = int(text)
except ValueError:
    print("Enter a whole number.")

Avoid broad except Exception blocks unless you have a specific reason and still record useful diagnostic information.

## else and finally
else runs when the try block succeeds. finally runs regardless of success and is useful for cleanup, though context managers often handle resources more cleanly.

## Fail clearly
Defensive programming does not mean ignoring every error. Sometimes the correct behavior is to stop with a clear error rather than continue with corrupted data.

## Validation before failure
Check simple preconditions before expensive operations. Validate file type, required fields and permissions early.

## Logging
In production, users should receive safe messages while developers receive enough logged context to investigate. Never log passwords or secrets.

## Check your understanding
Give one example of an error you should recover from and one error that should stop the operation. Explain why.

## Key takeaways
Handle failures you understand, preserve diagnostic information and never turn serious errors into silent success.`,

"Testing Python Code":`## Learning objectives
You will learn why automated tests matter and how to design small tests around expected behavior and edge cases.

## Tests are executable expectations
A test provides an input, runs code and checks the result. Good tests make behavior explicit.

## Arrange, act, assert
A simple structure is: arrange test data, act by calling the function and assert the expected result.

## Unit tests
Unit tests focus on small pieces of logic. They should run quickly and avoid unnecessary external services.

## Edge cases
Test boundary values, empty input and invalid values where relevant. A percentage function should be tested when total is zero.

## Test failures
A failing test is information. Read what was expected, what actually happened and whether the code or the test is wrong.

## Avoid testing implementation details
Prefer checking observable behavior over whether a function happened to use one exact internal variable.

## Example
For calculate_total(price, quantity), test normal numbers, zero quantity and perhaps invalid negative values if the function is supposed to reject them.

## Check your understanding
Write three test cases in plain language for a function that determines whether a score passes at 70.

## Key takeaways
Tests reduce regression risk and document expected behavior. Start with important pure functions, then expand toward integration tests as the project grows.`,

"Build a Small Automation Project":`## Learning objectives
You will plan a useful automation project by defining the problem, inputs, outputs, validation and success criteria before writing all the code.

## Choose a real repetitive task
Good beginner automation removes a small repeated burden: renaming files, summarizing a CSV, checking deadlines or formatting records.

Avoid choosing a project that depends on five new technologies at once.

## Requirements
Write one sentence describing the problem. List the input data and the expected output. Define what counts as success.

## Validation
Consider incomplete files, invalid rows or missing input. Decide whether to skip, warn or stop.

## Program structure
Break the project into functions such as load_data, validate_record, process_record and save_result.

## Observability
Print or log useful progress information. If the script processes 500 records, the user should know whether it completed and how many records failed.

## Practical task
Use the lab workspace to create a project plan. Define the problem, inputs, outputs, core functions and at least one validation rule. Then write pseudocode before implementation.

## Portfolio thinking
A portfolio project should include a short README explaining the problem, setup and example output.

## Check your understanding
Explain why writing the entire script before defining the input format can create rework.

## Key takeaways
Automation begins with a clear process, not code. Define the contract, handle failure intentionally and document the result.`,

"Refactoring and Project Documentation":`## Learning objectives
You will learn how to improve working code without changing its intended behavior and how documentation makes a project usable by other people.

## Refactoring
Refactoring improves structure while preserving behavior. Common improvements include clearer names, smaller functions, removing duplication and separating input/output from core logic.

Make small changes and run tests frequently.

## Code smells
Very long functions, repeated blocks, unclear variable names and hidden global state are signals to review design.

## Comments
Comments should explain why, constraints or non-obvious decisions. Do not comment every obvious line.

## README
A useful README answers what the project does, how to install it, how to run it, required configuration and one example.

## Dependency and environment documentation
Record required Python version and dependencies. Do not place real secrets in example configuration.

## Final review
Before publishing a portfolio project, remove temporary files, check that setup works from a clean environment and verify that no credentials are committed.

## Practical reflection
Take one function from a previous exercise and identify one naming improvement, one structural improvement and one test that protects the refactor.

## Key takeaways
Professional code is not only code that runs. It is understandable, testable and documented well enough for another person—or your future self—to use safely.`
};
