# Self-Study: Modules and Code Organization

**Estimated Time:** 3-4 hours  
**Prerequisites:** Weeks 1-5 complete, Functions (Week 3), Objects (Week 5)  
**Goal:** Learn to split JavaScript code into reusable, maintainable modules using modern ES6 syntax

---

## 📚 Why Modules?

As programs grow, putting everything in one file becomes unmanageable. **Modules** let you:

- **Split** code into separate files, each handling one responsibility
- **Reuse** code across different projects without copy-pasting
- **Encapsulate** — each module has its own scope (variables don't leak out)
- **Maintain** — easier to find, fix, and update small focused files
- **Collaborate** — team members can work on different modules simultaneously

**Analogy:** A module is like a chapter in a book. Each chapter covers one topic and can reference other chapters, but they're self-contained enough to make sense on their own.

---

## 1. Before Modules: The Problem

Without modules, all scripts share the **global scope**:

```html
<!-- file1.js defines a variable -->
<script src="file1.js"></script>
<!-- file2.js accidentally overwrites it! -->
<script src="file2.js"></script>
```

```javascript
// file1.js
let count = 10;
function calculate() { return count * 2; }

// file2.js
let count = 0;  // ❌ Overwrites file1's count!
function calculate() { return count + 5; }  // ❌ Overwrites file1's function!
```

Modules solve this by giving each file its **own scope**.

---

## 2. ES6 Modules (The Modern Standard)

### Setting Up Modules in HTML

To use ES6 modules in a browser, add `type="module"` to your script tag:

```html
<!-- Each module has its own scope — no global pollution -->
<script type="module" src="main.js"></script>
```

> **Note:** Modules require a server (even a local one like VS Code Live Server). They won't work with `file://` URLs due to security restrictions (CORS).

### Named Exports and Imports

A module can **export** specific values (functions, variables, classes) for other modules to use:

```javascript
// ================================
// math.js — exporting values
// ================================

// Export individual items
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// Private — NOT exported, only accessible within this file
function helperFunction() {
    return "I'm private";
}
```

```javascript
// ================================
// main.js — importing values
// ================================

import { PI, add, multiply } from "./math.js";

console.log(PI);              // 3.14159
console.log(add(2, 3));       // 5
console.log(multiply(4, 5));  // 20

// ❌ helperFunction is not exported, so this would fail:
// import { helperFunction } from "./math.js";  // Error!
```

### Export at the Bottom (Alternative Style)

```javascript
// utils.js
const TAX_RATE = 0.18;

function formatCurrency(amount) {
    return "₹" + amount.toFixed(2);
}

function calculateTax(amount) {
    return amount * TAX_RATE;
}

// Export everything at once
export { TAX_RATE, formatCurrency, calculateTax };
```

### Renaming Imports

```javascript
// If names clash, rename with 'as'
import { add as mathAdd } from "./math.js";
import { add as stringAdd } from "./stringUtils.js";

console.log(mathAdd(2, 3));            // 5
console.log(stringAdd("Hello", "!"));  // "Hello!"
```

---

### Default Exports

Each module can have **one** default export — the "main thing" the module provides:

```javascript
// ================================
// User.js — default export
// ================================

export default class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    greet() {
        return `Hello, I'm ${this.name}`;
    }
}
```

```javascript
// ================================
// main.js — importing a default export
// ================================

// No curly braces needed for default imports
// You can name it anything you want
import User from "./User.js";

const alice = new User("Alice", "alice@example.com");
console.log(alice.greet());  // "Hello, I'm Alice"
```

### Mixing Default and Named Exports

```javascript
// api.js
export default function fetchData(url) {
    return fetch(url).then(r => r.json());
}

export const API_BASE = "https://api.example.com";
export const TIMEOUT = 5000;
```

```javascript
// main.js
import fetchData, { API_BASE, TIMEOUT } from "./api.js";
```

### Import Everything

```javascript
// Import all named exports as a namespace object
import * as MathUtils from "./math.js";

console.log(MathUtils.PI);           // 3.14159
console.log(MathUtils.add(2, 3));    // 5
```

---

## 3. Module Scope and Behavior

### Each Module Runs Once

No matter how many files import a module, its code runs **only once**:

```javascript
// counter.js
console.log("counter.js loaded");  // This logs only ONCE
let count = 0;
export function increment() { return ++count; }
export function getCount() { return count; }
```

```javascript
// a.js
import { increment } from "./counter.js";
increment();  // count is now 1

// b.js
import { getCount } from "./counter.js";
console.log(getCount());  // 1 (same counter instance!)
```

### Strict Mode by Default

Modules automatically run in **strict mode** — no need to write `"use strict"`:

```javascript
// In a module:
x = 10;  // ❌ ReferenceError: x is not defined
          // (strict mode requires variable declarations)
```

### Top-Level `this` is `undefined`

```javascript
// In a regular script: this === window
// In a module: this === undefined
console.log(this);  // undefined
```

---

## 4. Project Structure Best Practices

### Flat Structure (Small Projects)

```
my-project/
├── index.html
├── main.js           ← Entry point
├── utils.js          ← Helper functions
├── User.js           ← User class
└── styles.css
```

### Feature-Based Structure (Medium Projects)

```
my-project/
├── index.html
├── main.js
├── components/
│   ├── TodoItem.js
│   ├── TodoList.js
│   └── Header.js
├── services/
│   ├── api.js
│   └── storage.js
├── utils/
│   ├── validation.js
│   ├── formatting.js
│   └── helpers.js
├── models/
│   ├── User.js
│   └── Todo.js
└── styles/
    └── main.css
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Files with a default class export** | PascalCase | `User.js`, `TodoList.js` |
| **Utility/helper files** | camelCase | `utils.js`, `formatting.js` |
| **Config files** | camelCase | `config.js`, `constants.js` |
| **Index/barrel files** | lowercase | `index.js` |

---

## 5. Common Patterns

### Constants Module

```javascript
// constants.js
export const APP_NAME = "My App";
export const VERSION = "1.0.0";
export const MAX_ITEMS = 100;
export const API_URL = "https://api.example.com";

export const COLORS = {
    primary: "#3498db",
    secondary: "#2ecc71",
    danger: "#e74c3c"
};
```

### Utility Module

```javascript
// utils/validation.js
export function isEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

export function isEmpty(str) {
    return str === null || str === undefined || str.trim() === "";
}

export function isInRange(num, min, max) {
    return num >= min && num <= max;
}
```

### Service Module (API Layer)

```javascript
// services/api.js
const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
}

export async function getUserById(id) {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error(`User ${id} not found`);
    return response.json();
}

export async function createUser(userData) {
    const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return response.json();
}
```

### Barrel Exports (Re-exporting)

An `index.js` file can re-export from multiple files for cleaner imports:

```javascript
// models/index.js (barrel file)
export { default as User } from "./User.js";
export { default as Todo } from "./Todo.js";
export { default as Product } from "./Product.js";
```

```javascript
// main.js — clean single import
import { User, Todo, Product } from "./models/index.js";
```

---

## 6. Practical Example: Modular Todo App

### Project Structure

```
todo-app/
├── index.html
├── main.js
├── models/
│   └── Todo.js
├── services/
│   └── storage.js
├── utils/
│   └── dom.js
└── styles.css
```

### models/Todo.js

```javascript
let nextId = 1;

export default class Todo {
    constructor(text) {
        this.id = nextId++;
        this.text = text;
        this.completed = false;
        this.createdAt = new Date();
    }

    toggle() {
        this.completed = !this.completed;
    }

    toString() {
        const status = this.completed ? "✅" : "⬜";
        return `${status} ${this.text}`;
    }
}
```

### services/storage.js

```javascript
const STORAGE_KEY = "todos";

export function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function loadTodos() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function clearTodos() {
    localStorage.removeItem(STORAGE_KEY);
}
```

### utils/dom.js

```javascript
export function createElement(tag, attributes = {}, textContent = "") {
    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(attributes)) {
        if (key === "classList") {
            value.forEach(cls => element.classList.add(cls));
        } else {
            element.setAttribute(key, value);
        }
    }

    if (textContent) {
        element.textContent = textContent;
    }

    return element;
}

export function $(selector) {
    return document.querySelector(selector);
}
```

### main.js

```javascript
import Todo from "./models/Todo.js";
import { saveTodos, loadTodos } from "./services/storage.js";
import { createElement, $ } from "./utils/dom.js";

let todos = loadTodos();

function render() {
    const list = $("#todo-list");
    list.innerHTML = "";

    todos.forEach(todo => {
        const li = createElement("li", {}, todo.text);

        const deleteBtn = createElement("button", {}, "Delete");
        deleteBtn.addEventListener("click", () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos(todos);
            render();
        });

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

$("#add-btn").addEventListener("click", () => {
    const input = $("#todo-input");
    const text = input.value.trim();

    if (text) {
        const newTodo = new Todo(text);
        todos.push(newTodo);
        saveTodos(todos);
        render();
        input.value = "";
    }
});

render();
```

---

## 7. Node.js Modules: CommonJS

While ES6 modules (`import`/`export`) are the standard, you'll encounter **CommonJS** modules in Node.js:

```javascript
// ================================
// CommonJS (Node.js traditional)
// ================================

// Exporting
module.exports = { add, multiply };
// or
module.exports.add = function(a, b) { return a + b; };

// Importing
const { add, multiply } = require("./math");
```

```javascript
// ================================
// ES Modules (Modern, preferred)
// ================================

// Exporting
export function add(a, b) { return a + b; }

// Importing
import { add } from "./math.js";
```

> Modern Node.js (v14+) supports ES modules too. Use `.mjs` extension or add `"type": "module"` to `package.json`.

---

## 📋 Quick Reference

| Syntax | Purpose | Example |
|--------|---------|---------|
| `export` | Make available to other modules | `export const PI = 3.14;` |
| `export default` | The main export (one per module) | `export default class User {}` |
| `import { x }` | Import named exports | `import { add } from "./math.js";` |
| `import X` | Import default export | `import User from "./User.js";` |
| `import * as M` | Import all as namespace | `import * as M from "./math.js";` |
| `import { x as y }` | Rename an import | `import { add as sum } from "./math.js";` |
| `export { x } from` | Re-export from another module | `export { User } from "./User.js";` |

---

## 📋 Practice Challenges

1. **Calculator Module:** Create a `calculator.js` module with add, subtract, multiply, divide functions. Import and use them in `main.js`
2. **Student Manager:** Create separate modules for `Student` class, `storage` service, and `validation` utilities. Wire them together in a main entry point
3. **Recipe Book:** Build a modular app with modules for recipes (data), rendering (DOM), and filtering (utils)
4. **Refactor Existing Code:** Take any large single-file project from earlier weeks and split it into modules

---

## 🔗 Further Reading

- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [JavaScript.info: Modules](https://javascript.info/modules)
- [Eloquent JavaScript: Chapter 10 — Modules](https://eloquentjavascript.net/10_modules.html)

---

*Self-Study Document 5 of 5 — BCA IV Semester Client Side Scripting*
