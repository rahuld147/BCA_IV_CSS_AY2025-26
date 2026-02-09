# Self-Study: Event Handling

**Estimated Time:** 3-4 hours  
**Prerequisites:** Weeks 1-5 complete, DOM Manipulation self-study  
**Goal:** Learn to respond to user interactions — clicks, keyboard input, form submissions, and more

---

## 📚 What are Events?

An **event** is something that happens in the browser — a user clicks a button, presses a key, moves the mouse, submits a form, or the page finishes loading. **Event handling** is writing JavaScript code that responds to these events.

**Key terms:**
- **Event** — an action or occurrence (e.g., "click", "keydown", "submit")
- **Event handler** (or **event listener**) — a function that runs when an event occurs
- **Event target** — the element on which the event occurred
- **Event object** — an object containing information about the event (what key was pressed, where the mouse was, etc.)

---

## 1. Adding Event Listeners

### addEventListener()

The recommended way to attach events:

```javascript
const button = document.querySelector("#myButton");

button.addEventListener("click", function() {
    console.log("Button was clicked!");
});
```

You can also use a named function:

```javascript
function handleClick() {
    console.log("Button clicked!");
}

button.addEventListener("click", handleClick);
```

With arrow functions:

```javascript
button.addEventListener("click", () => {
    console.log("Clicked with arrow function!");
});
```

### Removing Event Listeners

To remove a listener, you must pass the **same function reference**:

```javascript
function handleClick() {
    console.log("Clicked!");
}

button.addEventListener("click", handleClick);

// Later, to remove:
button.removeEventListener("click", handleClick);

// ❌ This does NOT work (anonymous functions are different each time):
// button.removeEventListener("click", () => console.log("nope"));
```

---

## 2. Common Event Types

### Mouse Events

```javascript
const box = document.querySelector(".box");

box.addEventListener("click", () => console.log("Clicked"));
box.addEventListener("dblclick", () => console.log("Double-clicked"));
box.addEventListener("mousedown", () => console.log("Mouse button pressed"));
box.addEventListener("mouseup", () => console.log("Mouse button released"));
box.addEventListener("mouseover", () => console.log("Mouse entered"));
box.addEventListener("mouseout", () => console.log("Mouse left"));
box.addEventListener("mousemove", (e) => {
    console.log(`Mouse at (${e.clientX}, ${e.clientY})`);
});
```

### Keyboard Events

```javascript
document.addEventListener("keydown", (e) => {
    console.log("Key pressed:", e.key);         // "a", "Enter", "ArrowUp"
    console.log("Key code:", e.code);            // "KeyA", "Enter", "ArrowUp"
    console.log("Shift held?", e.shiftKey);      // true/false
    console.log("Ctrl held?", e.ctrlKey);        // true/false
});

document.addEventListener("keyup", (e) => {
    console.log("Key released:", e.key);
});

// Listen on a specific input
const input = document.querySelector("#search");
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        console.log("Search for:", input.value);
    }
});
```

### Form Events

```javascript
const form = document.querySelector("#myForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();  // Prevent page reload!
    
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    console.log("Form submitted:", name, email);
});

// Input events
const textInput = document.querySelector("#textField");

textInput.addEventListener("input", (e) => {
    console.log("Current value:", e.target.value);  // Fires on every keystroke
});

textInput.addEventListener("change", (e) => {
    console.log("Value changed:", e.target.value);  // Fires when input loses focus
});

textInput.addEventListener("focus", () => console.log("Input focused"));
textInput.addEventListener("blur", () => console.log("Input lost focus"));
```

### Window/Document Events

```javascript
// Page fully loaded (including images, stylesheets)
window.addEventListener("load", () => {
    console.log("Page fully loaded");
});

// DOM structure loaded (before images finish)
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM ready — safe to manipulate elements");
});

// Window resized
window.addEventListener("resize", () => {
    console.log(`Window size: ${window.innerWidth} x ${window.innerHeight}`);
});

// Scrolling
window.addEventListener("scroll", () => {
    console.log("Scroll position:", window.scrollY);
});
```

---

## 3. The Event Object

Every event handler receives an **event object** (commonly named `e`, `event`, or `evt`) containing details about the event:

```javascript
document.addEventListener("click", function(e) {
    console.log("Event type:", e.type);           // "click"
    console.log("Target element:", e.target);       // The element clicked
    console.log("Mouse X:", e.clientX);             // X position in viewport
    console.log("Mouse Y:", e.clientY);             // Y position in viewport
    console.log("Page X:", e.pageX);                // X position in page
    console.log("Timestamp:", e.timeStamp);         // When it happened
});
```

### e.target vs e.currentTarget

```javascript
// e.target = the element that triggered the event (where it originated)
// e.currentTarget = the element the listener is attached to

const list = document.querySelector("ul");

list.addEventListener("click", function(e) {
    console.log("target:", e.target.tagName);         // "LI" (what was clicked)
    console.log("currentTarget:", e.currentTarget.tagName); // "UL" (where listener is)
});
```

---

## 4. Event Propagation: Bubbling and Capturing

When an event occurs on a nested element, it doesn't just fire on that element — it travels through the DOM tree in two phases:

1. **Capturing phase** — the event travels DOWN from the document root to the target element
2. **Bubbling phase** — the event travels UP from the target element back to the root

```
         Document
            ↓ ↑
          <body>
            ↓ ↑
          <div>
            ↓ ↑
         <button>  ← Click happens here
            ↓
    Capturing goes DOWN
    Bubbling goes UP ↑
```

### Bubbling (Default)

By default, event listeners fire during the **bubbling phase** (going up):

```javascript
document.querySelector("button").addEventListener("click", () => {
    console.log("Button clicked");  // Fires first
});

document.querySelector("div").addEventListener("click", () => {
    console.log("Div clicked");     // Fires second (bubbles up)
});

document.querySelector("body").addEventListener("click", () => {
    console.log("Body clicked");    // Fires third (bubbles up further)
});

// Clicking the button logs:
// "Button clicked"
// "Div clicked"
// "Body clicked"
```

### Stopping Propagation

```javascript
button.addEventListener("click", (e) => {
    e.stopPropagation();  // Prevents event from bubbling up
    console.log("Only button handler runs");
});
```

### Event Delegation

Instead of adding listeners to many child elements, add ONE listener to the parent and check `e.target`:

```javascript
// ❌ Inefficient: listener on every button
document.querySelectorAll(".item-btn").forEach(btn => {
    btn.addEventListener("click", handleClick);
});

// ✅ Efficient: one listener on the parent (event delegation)
document.querySelector(".item-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("item-btn")) {
        console.log("Button clicked:", e.target.textContent);
    }
});
```

> **Why delegation is better:**
> - Works for elements added dynamically (after the listener was created)
> - Uses less memory (one listener instead of many)
> - Cleaner code

---

## 5. Preventing Default Behavior

Some events have default browser behavior. `e.preventDefault()` stops it:

```javascript
// Prevent form submission (page reload)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Handle form data with JavaScript instead
});

// Prevent link navigation
link.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Link click handled by JavaScript");
});

// Prevent right-click context menu
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    console.log("Custom right-click menu here");
});
```

---

## 6. Practical Example: Interactive Quiz

```html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Quiz</title>
    <style>
        .question { margin: 20px 0; padding: 15px; border: 1px solid #ddd; }
        .correct { background-color: #d4edda; }
        .incorrect { background-color: #f8d7da; }
        button { margin: 5px; padding: 8px 16px; cursor: pointer; }
    </style>
</head>
<body>
    <h1>JavaScript Quiz</h1>
    <div id="quiz"></div>
    <div id="result"></div>

    <script>
        const questions = [
            {
                question: "What does === check?",
                options: ["Value only", "Type only", "Value and type", "Reference"],
                answer: 2
            },
            {
                question: "Which keyword declares a block-scoped variable?",
                options: ["var", "let", "function", "global"],
                answer: 1
            },
            {
                question: "What does Array.map() return?",
                options: ["undefined", "The original array", "A new array", "A single value"],
                answer: 2
            }
        ];

        let score = 0;
        const quizDiv = document.getElementById("quiz");

        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question");
            questionDiv.id = "q" + index;

            const questionText = document.createElement("p");
            questionText.textContent = (index + 1) + ". " + q.question;
            questionDiv.appendChild(questionText);

            q.options.forEach((option, optIndex) => {
                const btn = document.createElement("button");
                btn.textContent = option;
                btn.addEventListener("click", () => {
                    // Disable all buttons for this question
                    const buttons = questionDiv.querySelectorAll("button");
                    buttons.forEach(b => b.disabled = true);

                    if (optIndex === q.answer) {
                        questionDiv.classList.add("correct");
                        score++;
                    } else {
                        questionDiv.classList.add("incorrect");
                        buttons[q.answer].style.fontWeight = "bold";
                    }

                    // Check if all questions answered
                    const answered = document.querySelectorAll(".correct, .incorrect");
                    if (answered.length === questions.length) {
                        document.getElementById("result").textContent =
                            `Score: ${score}/${questions.length}`;
                    }
                });
                questionDiv.appendChild(btn);
            });

            quizDiv.appendChild(questionDiv);
        });
    </script>
</body>
</html>
```

---

## 📋 Practice Challenges

1. **Click Counter:** Display a number that increases each time a button is clicked
2. **Keyboard Piano:** Assign different sounds/messages to different keys (A-G)
3. **Drag and Drop:** Make a `<div>` draggable using mouse events (mousedown, mousemove, mouseup)
4. **Form Validator:** Validate a registration form in real-time (check email format, password strength, etc.)
5. **Dark Mode Toggle:** Add a button that switches the entire page between light and dark themes

---

## 🔗 Further Reading

- [MDN: Introduction to Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
- [MDN: Event Reference (full list)](https://developer.mozilla.org/en-US/docs/Web/Events)
- [JavaScript.info: Introduction to Browser Events](https://javascript.info/introduction-browser-events)

---

*Self-Study Document 2 of 5 — BCA IV Semester Client Side Scripting*
