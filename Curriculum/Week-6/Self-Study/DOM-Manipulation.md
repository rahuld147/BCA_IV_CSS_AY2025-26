# Self-Study: DOM Manipulation

**Estimated Time:** 4-5 hours  
**Prerequisites:** Weeks 1-5 complete  
**Goal:** Learn to select, create, modify, and remove HTML elements using JavaScript

---

## 📚 What is the DOM?

The **DOM** (Document Object Model) is a programming interface for HTML documents. When a browser loads a web page, it creates a **tree-like representation** of the HTML in memory — this tree is the DOM. JavaScript can read and modify this tree, which causes the web page to change in real time.

**Key terms:**
- **Document** — the entire web page
- **Node** — any single item in the DOM tree (elements, text, comments)
- **Element** — a specific type of node representing an HTML tag (`<div>`, `<p>`, `<h1>`, etc.)
- **Attribute** — a property of an HTML element (`id`, `class`, `href`, etc.)

### The DOM Tree

```
document
  └── <html>
        ├── <head>
        │     ├── <title>My Page</title>
        │     └── <meta charset="UTF-8">
        └── <body>
              ├── <h1>Hello World</h1>
              ├── <p id="intro">Welcome</p>
              └── <div class="container">
                    ├── <ul>
                    │     ├── <li>Item 1</li>
                    │     └── <li>Item 2</li>
                    └── <button id="btn">Click me</button>
```

Every HTML tag becomes a **node** in this tree. JavaScript can navigate this tree, find specific nodes, and change them.

---

## 1. Selecting Elements

Before you can change an element, you need to **select** (find) it. JavaScript provides several methods:

### getElementById()

Selects a single element by its `id` attribute. Returns `null` if not found.

```javascript
// HTML: <h1 id="title">Hello World</h1>
const title = document.getElementById("title");
console.log(title.textContent);  // "Hello World"
```

### querySelector()

Selects the **first** element matching a CSS selector. This is the most versatile method.

```javascript
// By ID
const title = document.querySelector("#title");

// By class
const box = document.querySelector(".container");

// By tag
const firstParagraph = document.querySelector("p");

// By complex selector
const listItem = document.querySelector("ul > li:first-child");
```

### querySelectorAll()

Selects **all** elements matching a CSS selector. Returns a **NodeList** (similar to an array).

```javascript
// All paragraphs
const paragraphs = document.querySelectorAll("p");
console.log(paragraphs.length);  // Number of <p> elements

// Loop through them
paragraphs.forEach(p => {
    console.log(p.textContent);
});

// All items with class "item"
const items = document.querySelectorAll(".item");
```

### getElementsByClassName() and getElementsByTagName()

```javascript
// By class name (returns live HTMLCollection)
const boxes = document.getElementsByClassName("box");

// By tag name
const divs = document.getElementsByTagName("div");
```

> **Best Practice:** Use `querySelector()` and `querySelectorAll()` for most tasks — they accept any CSS selector and are the most flexible.

---

## 2. Modifying Element Content

### textContent

Gets or sets the **text** inside an element (ignoring HTML tags):

```javascript
const heading = document.querySelector("h1");

// Read
console.log(heading.textContent);  // "Hello World"

// Write
heading.textContent = "New Title";
```

### innerHTML

Gets or sets the **HTML** inside an element (parses HTML tags):

```javascript
const container = document.querySelector(".container");

// Read
console.log(container.innerHTML);

// Write — HTML tags are rendered
container.innerHTML = "<p>New paragraph</p><strong>Bold text</strong>";
```

> **Security Warning:** Never use `innerHTML` with user input! Malicious users could inject `<script>` tags. Use `textContent` for user-provided text.

### value (for form inputs)

```javascript
const input = document.querySelector("#username");

// Read the value typed by the user
console.log(input.value);

// Set the value
input.value = "default_user";
```

---

## 3. Modifying Element Styles

### Inline Styles (style property)

```javascript
const box = document.querySelector(".box");

// Set individual styles
box.style.backgroundColor = "blue";
box.style.color = "white";
box.style.padding = "20px";
box.style.borderRadius = "10px";

// Note: CSS properties with hyphens use camelCase:
// background-color → backgroundColor
// font-size → fontSize
// border-radius → borderRadius
```

### CSS Classes (classList)

A better approach is to toggle CSS classes:

```javascript
const element = document.querySelector("#myElement");

// Add a class
element.classList.add("active");

// Remove a class
element.classList.remove("hidden");

// Toggle (add if absent, remove if present)
element.classList.toggle("highlighted");

// Check if class exists
if (element.classList.contains("active")) {
    console.log("Element is active");
}

// Replace a class
element.classList.replace("old-class", "new-class");
```

---

## 4. Modifying Attributes

```javascript
const link = document.querySelector("a");

// Get attribute
console.log(link.getAttribute("href"));

// Set attribute
link.setAttribute("href", "https://example.com");
link.setAttribute("target", "_blank");

// Remove attribute
link.removeAttribute("target");

// Check if attribute exists
console.log(link.hasAttribute("href"));  // true

// Common shortcuts (direct properties)
const img = document.querySelector("img");
img.src = "new-image.jpg";
img.alt = "Description of image";
```

---

## 5. Creating and Adding Elements

### createElement() and appendChild()

```javascript
// Create a new element
const newParagraph = document.createElement("p");
newParagraph.textContent = "This paragraph was created by JavaScript!";
newParagraph.classList.add("dynamic");

// Add it to the page
const container = document.querySelector(".container");
container.appendChild(newParagraph);
```

### insertBefore()

```javascript
const parent = document.querySelector("ul");
const newItem = document.createElement("li");
newItem.textContent = "New Item";

// Insert before the first child
const firstChild = parent.firstElementChild;
parent.insertBefore(newItem, firstChild);
```

### insertAdjacentHTML()

```javascript
const list = document.querySelector("ul");

// Insert positions:
// "beforebegin" — before the element itself
// "afterbegin"  — inside, before first child
// "beforeend"   — inside, after last child
// "afterend"    — after the element itself

list.insertAdjacentHTML("beforeend", "<li>Added at end</li>");
list.insertAdjacentHTML("afterbegin", "<li>Added at start</li>");
```

---

## 6. Removing Elements

```javascript
// Method 1: remove() — modern
const element = document.querySelector("#old-element");
element.remove();

// Method 2: removeChild() — older but widely supported
const parent = document.querySelector(".container");
const child = document.querySelector(".unwanted");
parent.removeChild(child);
```

---

## 7. DOM Traversal

Navigate between elements in the DOM tree:

```javascript
const item = document.querySelector("#middle-item");

// Parent
const parent = item.parentElement;

// Children
const children = parent.children;           // All child elements
const firstChild = parent.firstElementChild;
const lastChild = parent.lastElementChild;

// Siblings
const next = item.nextElementSibling;
const prev = item.previousElementSibling;

// Closest ancestor matching a selector
const closestDiv = item.closest("div");
```

---

## 8. Practical Example: Dynamic Todo List

```html
<!DOCTYPE html>
<html>
<head>
    <title>Todo List</title>
    <style>
        .completed { text-decoration: line-through; color: gray; }
        .todo-item { padding: 8px; margin: 4px 0; }
    </style>
</head>
<body>
    <h1>My Todo List</h1>
    <input type="text" id="todoInput" placeholder="Enter a task...">
    <button id="addBtn">Add</button>
    <ul id="todoList"></ul>

    <script>
        const input = document.getElementById("todoInput");
        const addBtn = document.getElementById("addBtn");
        const todoList = document.getElementById("todoList");

        function addTodo() {
            const text = input.value.trim();
            if (text === "") return;

            // Create list item
            const li = document.createElement("li");
            li.classList.add("todo-item");

            // Task text
            const span = document.createElement("span");
            span.textContent = text;

            // Complete button
            const completeBtn = document.createElement("button");
            completeBtn.textContent = "✓";
            completeBtn.addEventListener("click", () => {
                span.classList.toggle("completed");
            });

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "✕";
            deleteBtn.addEventListener("click", () => {
                li.remove();
            });

            li.appendChild(span);
            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);

            input.value = "";
            input.focus();
        }

        addBtn.addEventListener("click", addTodo);
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") addTodo();
        });
    </script>
</body>
</html>
```

---

## 📋 Practice Challenges

1. **Color Switcher:** Create a page with 5 buttons, each changing the background to a different color
2. **Character Counter:** Build an input field that shows how many characters have been typed (live update)
3. **Accordion:** Create a list of questions that expand/collapse their answers when clicked
4. **Image Gallery:** Display thumbnails that show a larger version when clicked
5. **Dynamic Table:** Create a table from an array of objects, with the ability to add and delete rows

---

## 🔗 Further Reading

- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN: Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [JavaScript.info: DOM Nodes](https://javascript.info/dom-nodes)

---

*Self-Study Document 1 of 5 — BCA IV Semester Client Side Scripting*
