# Self-Study: Web APIs — localStorage & Fetch

**Estimated Time:** 4-5 hours  
**Prerequisites:** Weeks 1-5 complete, DOM Manipulation and Event Handling self-study  
**Goal:** Learn to persist data in the browser and fetch data from external servers

---

## Part A: Browser Storage (localStorage & sessionStorage)

### What is Web Storage?

Browsers provide a simple **key-value storage** system that lets your JavaScript save data locally on the user's machine — no server needed. There are two types:

| Feature | `localStorage` | `sessionStorage` |
|---------|----------------|-------------------|
| **Persists** | Until manually cleared | Until browser tab/window is closed |
| **Shared** | Across all tabs on the same origin | Only within the same tab |
| **Capacity** | ~5-10 MB per origin | ~5-10 MB per origin |
| **Use case** | User preferences, saved data | Temporary form data, session state |

> **Origin** = protocol + domain + port. For example, `https://example.com:443`.

---

### 1. localStorage Basics

All values stored in localStorage are **strings**. The API is the same for both `localStorage` and `sessionStorage`.

```javascript
// =====================
// SETTING DATA
// =====================
localStorage.setItem("username", "Alice");
localStorage.setItem("theme", "dark");
localStorage.setItem("fontSize", "16");

// =====================
// GETTING DATA
// =====================
const username = localStorage.getItem("username");
console.log(username);  // "Alice"

// Returns null if the key doesn't exist
const missing = localStorage.getItem("nonExistent");
console.log(missing);  // null

// =====================
// REMOVING DATA
// =====================
localStorage.removeItem("fontSize");

// =====================
// CLEARING ALL DATA
// =====================
localStorage.clear();  // Removes everything

// =====================
// CHECKING HOW MANY ITEMS
// =====================
console.log(localStorage.length);  // Number of stored items

// =====================
// GETTING KEY BY INDEX
// =====================
console.log(localStorage.key(0));  // Name of the first key
```

---

### 2. Storing Complex Data (JSON)

Since localStorage only stores strings, we use `JSON.stringify()` to save objects/arrays and `JSON.parse()` to read them back:

```javascript
// =====================
// SAVING AN OBJECT
// =====================
const user = {
    name: "Alice",
    age: 22,
    courses: ["JavaScript", "Python", "Java"]
};

localStorage.setItem("user", JSON.stringify(user));

// =====================
// READING AN OBJECT
// =====================
const stored = localStorage.getItem("user");
const parsedUser = JSON.parse(stored);

console.log(parsedUser.name);      // "Alice"
console.log(parsedUser.courses);   // ["JavaScript", "Python", "Java"]

// =====================
// SAVING AN ARRAY
// =====================
const todos = [
    { id: 1, text: "Learn localStorage", done: true },
    { id: 2, text: "Build a project", done: false }
];

localStorage.setItem("todos", JSON.stringify(todos));

// =====================
// READING AN ARRAY
// =====================
const savedTodos = JSON.parse(localStorage.getItem("todos"));
console.log(savedTodos[0].text);  // "Learn localStorage"
```

### 3. Safe Reading Pattern

Always handle the case where data might not exist or might be corrupted:

```javascript
function loadData(key, defaultValue) {
    try {
        const stored = localStorage.getItem(key);
        if (stored === null) {
            return defaultValue;
        }
        return JSON.parse(stored);
    } catch (error) {
        console.error("Error reading localStorage:", error);
        return defaultValue;
    }
}

// Usage
const settings = loadData("settings", { theme: "light", fontSize: 14 });
```

---

### 4. Practical Example: Persistent Todo List

```html
<!DOCTYPE html>
<html>
<head><title>Persistent Todos</title></head>
<body>
    <h1>My Todo List</h1>
    <input id="todoInput" placeholder="Add a task...">
    <button id="addBtn">Add</button>
    <ul id="todoList"></ul>

    <script>
        // Load saved todos or start with empty array
        let todos = JSON.parse(localStorage.getItem("todos")) || [];

        const input = document.getElementById("todoInput");
        const addBtn = document.getElementById("addBtn");
        const list = document.getElementById("todoList");

        function saveTodos() {
            localStorage.setItem("todos", JSON.stringify(todos));
        }

        function renderTodos() {
            list.innerHTML = "";
            todos.forEach((todo, index) => {
                const li = document.createElement("li");
                li.textContent = todo;

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.addEventListener("click", () => {
                    todos.splice(index, 1);
                    saveTodos();
                    renderTodos();
                });

                li.appendChild(deleteBtn);
                list.appendChild(li);
            });
        }

        addBtn.addEventListener("click", () => {
            const text = input.value.trim();
            if (text) {
                todos.push(text);
                saveTodos();
                renderTodos();
                input.value = "";
            }
        });

        // Load existing todos on page load
        renderTodos();
    </script>
</body>
</html>
```

> **Key insight:** The todos survive page refreshes because they're saved to `localStorage`.

---

## Part B: The Fetch API

### What is Fetch?

The **Fetch API** lets JavaScript make **HTTP requests** to servers — to get data (GET), send data (POST), update data (PUT), or delete data (DELETE). It's the modern replacement for the older `XMLHttpRequest`.

> **HTTP** (HyperText Transfer Protocol) is the protocol browsers use to communicate with servers. Every time you visit a URL, your browser makes an HTTP GET request.

**Key terms:**
- **Request** — the message sent TO the server (includes method, URL, headers, body)
- **Response** — the message returned FROM the server (includes status code, headers, body)
- **JSON** — JavaScript Object Notation, the most common data format for APIs
- **API** (Application Programming Interface) — a server endpoint that returns data (not web pages)
- **Promise** — an object representing a value that will be available in the future (fetch returns a Promise)

---

### 1. Basic GET Request

```javascript
// fetch() returns a Promise
fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
        // response.ok is true if status is 200-299
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.status);
        }
        // .json() also returns a Promise
        return response.json();
    })
    .then(data => {
        // 'data' is now a JavaScript object
        console.log("User name:", data.name);
        console.log("Email:", data.email);
    })
    .catch(error => {
        console.error("Fetch failed:", error);
    });
```

**Breaking down what happens:**
1. `fetch(url)` starts the request and returns a **Promise**
2. `.then(response => ...)` runs when the server responds
3. `response.json()` parses the response body as JSON (also returns a Promise)
4. `.then(data => ...)` runs when parsing is complete — `data` is now a JS object
5. `.catch(error => ...)` runs if anything fails (network error, invalid JSON, etc.)

---

### 2. Using async/await (Cleaner Syntax)

```javascript
async function getUser(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const user = await response.json();
        console.log("User:", user.name);
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

getUser(1);
```

> `async/await` is covered in depth in the Async JavaScript self-study document. For now, know that `await` pauses execution until the Promise resolves.

---

### 3. POST Request (Sending Data)

```javascript
async function createPost(title, body) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newPost = await response.json();
        console.log("Created post with ID:", newPost.id);
        return newPost;
    } catch (error) {
        console.error("Failed to create post:", error);
    }
}

createPost("My First Post", "This is the content of my post.");
```

---

### 4. HTTP Methods Summary

| Method | Purpose | Has Body? | Example |
|--------|---------|-----------|---------|
| `GET` | Read/retrieve data | No | Get a list of users |
| `POST` | Create new data | Yes | Create a new user |
| `PUT` | Replace existing data | Yes | Update entire user record |
| `PATCH` | Partially update data | Yes | Update just the email |
| `DELETE` | Delete data | Usually no | Delete a user |

---

### 5. Response Properties

```javascript
const response = await fetch(url);

console.log(response.status);      // 200, 404, 500, etc.
console.log(response.statusText);  // "OK", "Not Found", etc.
console.log(response.ok);          // true if status is 200-299
console.log(response.headers);     // Headers object
console.log(response.url);         // The final URL (after redirects)

// Reading the body (choose ONE — body can only be read once):
const json = await response.json();   // Parse as JSON
const text = await response.text();   // Read as plain text
const blob = await response.blob();   // Read as binary data (images, files)
```

---

### 6. Handling Errors Properly

```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);
        
        // fetch() only rejects on NETWORK errors
        // HTTP errors (404, 500) do NOT cause rejection
        // So we must check response.ok manually
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Resource not found");
            } else if (response.status === 500) {
                throw new Error("Server error — try again later");
            } else {
                throw new Error(`HTTP error: ${response.status}`);
            }
        }
        
        return await response.json();
    } catch (error) {
        if (error.name === "TypeError") {
            // Network error (no internet, CORS blocked, etc.)
            console.error("Network error:", error.message);
        } else {
            console.error("Error:", error.message);
        }
        return null;
    }
}
```

---

### 7. Practical Example: User Directory

```html
<!DOCTYPE html>
<html>
<head>
    <title>User Directory</title>
    <style>
        .user-card {
            border: 1px solid #ddd;
            padding: 15px;
            margin: 10px;
            border-radius: 8px;
        }
        .loading { color: gray; font-style: italic; }
        .error { color: red; }
    </style>
</head>
<body>
    <h1>User Directory</h1>
    <button id="loadUsers">Load Users</button>
    <div id="users"></div>

    <script>
        const usersDiv = document.getElementById("users");
        const loadBtn = document.getElementById("loadUsers");

        loadBtn.addEventListener("click", async () => {
            usersDiv.innerHTML = '<p class="loading">Loading users...</p>';
            loadBtn.disabled = true;

            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );

                if (!response.ok) {
                    throw new Error("Failed to load users");
                }

                const users = await response.json();
                usersDiv.innerHTML = "";

                users.forEach(user => {
                    const card = document.createElement("div");
                    card.classList.add("user-card");
                    card.innerHTML = `
                        <h3>${user.name}</h3>
                        <p>Email: ${user.email}</p>
                        <p>Company: ${user.company.name}</p>
                        <p>City: ${user.address.city}</p>
                    `;
                    usersDiv.appendChild(card);
                });
            } catch (error) {
                usersDiv.innerHTML = 
                    `<p class="error">Error: ${error.message}</p>`;
            } finally {
                loadBtn.disabled = false;
            }
        });
    </script>
</body>
</html>
```

---

## Part C: Combining Storage and Fetch

A common pattern is to **cache fetched data** in localStorage so it loads instantly on future visits:

```javascript
async function getUsersWithCache() {
    // Check cache first
    const cached = localStorage.getItem("users");
    if (cached) {
        console.log("Loaded from cache");
        return JSON.parse(cached);
    }

    // If not cached, fetch from server
    console.log("Fetching from server...");
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    // Save to cache for next time
    localStorage.setItem("users", JSON.stringify(users));

    return users;
}
```

---

## 📋 Practice Challenges

1. **Theme Switcher:** Save the user's chosen theme (light/dark) in localStorage and apply it on page load
2. **Notes App:** Build a simple notes app that stores notes in localStorage (create, read, delete)
3. **API Explorer:** Fetch and display data from a public API of your choice (weather, jokes, quotes, etc.)
4. **Bookmarks Manager:** Let users save bookmarks (name + URL) to localStorage and display them
5. **Cache with Expiry:** Implement a caching function that stores fetched data in localStorage with a timestamp, and re-fetches if the cache is older than 5 minutes

---

## 🔑 Key Differences: Storage vs Cookies

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|---------------|---------|
| **Capacity** | ~5-10 MB | ~5-10 MB | ~4 KB |
| **Sent to server?** | ❌ No | ❌ No | ✅ Every request |
| **Expires** | Never | On tab close | Configurable |
| **Access** | JavaScript only | JavaScript only | JS + Server |

---

## 🔗 Further Reading

- [MDN: Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [JavaScript.info: Fetch](https://javascript.info/fetch)
- [Public APIs list for practice](https://github.com/public-apis/public-apis)

---

*Self-Study Document 3 of 5 — BCA IV Semester Client Side Scripting*
