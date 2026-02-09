# Self-Study: Asynchronous JavaScript

**Estimated Time:** 4-5 hours  
**Prerequisites:** Weeks 1-5 complete, Functions (Week 3), Higher-Order Functions (Week 4)  
**Goal:** Understand how JavaScript handles tasks that take time — network requests, timers, file operations — without freezing the page

---

## 📚 Why Asynchronous?

JavaScript is **single-threaded** — it can only do one thing at a time. If a task takes 3 seconds (like fetching data from a server), the browser would freeze for those 3 seconds if JavaScript waited synchronously.

**Asynchronous code** solves this: it starts a long-running task and continues executing other code, then handles the result when the task finishes.

**Analogy:** Imagine ordering food at a restaurant:
- **Synchronous:** You stand at the counter and wait until your food is ready. Nobody else can order.
- **Asynchronous:** You place your order, sit down, and do other things. The waiter brings the food when it's ready.

---

## 1. Callbacks: The Foundation

A **callback** is a function passed to another function, to be called later when something completes.

### Basic Callback Pattern

```javascript
// setTimeout calls the callback after a delay
console.log("Start");

setTimeout(function() {
    console.log("This runs after 2 seconds");
}, 2000);

console.log("End");

// Output order:
// "Start"
// "End"
// "This runs after 2 seconds"  ← runs later!
```

> **Key insight:** `setTimeout` doesn't pause execution. The code after it runs immediately, and the callback fires later.

### setInterval (Repeated Callbacks)

```javascript
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log("Tick:", count);
    if (count === 5) {
        clearInterval(intervalId);  // Stop after 5 ticks
        console.log("Done!");
    }
}, 1000);
```

### Callbacks in Practice

```javascript
function loadUserData(userId, onSuccess, onError) {
    // Simulate a network request with setTimeout
    setTimeout(() => {
        if (userId > 0) {
            onSuccess({ id: userId, name: "Alice", age: 22 });
        } else {
            onError("Invalid user ID");
        }
    }, 1000);
}

loadUserData(
    1,
    user => console.log("User loaded:", user.name),
    error => console.error("Error:", error)
);
```

---

### Callback Hell (The Problem)

When you need to do multiple async steps in sequence, callbacks get deeply nested:

```javascript
// ❌ Callback Hell — deeply nested, hard to read
getUser(1, function(user) {
    getOrders(user.id, function(orders) {
        getOrderDetails(orders[0].id, function(details) {
            getShippingInfo(details.trackingId, function(shipping) {
                console.log("Shipping status:", shipping.status);
                // What if we need more steps? Even more nesting...
            }, handleError);
        }, handleError);
    }, handleError);
}, handleError);
```

This is sometimes called the **"pyramid of doom"** because of its shape. It's:
- Hard to read
- Hard to debug
- Hard to handle errors consistently

**Promises** and **async/await** solve this problem.

---

## 2. Promises: A Better Way

A **Promise** is an object that represents a value that will be available in the future. It's like a receipt from a restaurant — you don't have the food yet, but you have a guarantee that it will come.

### Promise States

A Promise is always in one of three states:

```
┌──────────────────────────────────────────────┐
│                   PENDING                     │
│        (operation not yet complete)           │
│                                              │
│         ┌──────────┐  ┌──────────┐           │
│         │ FULFILLED │  │ REJECTED │           │
│         │ (success) │  │ (failure)│           │
│         └──────────┘  └──────────┘           │
└──────────────────────────────────────────────┘
```

- **Pending** — the operation hasn't completed yet
- **Fulfilled** (resolved) — the operation completed successfully, a value is available
- **Rejected** — the operation failed, a reason (error) is available

Once a Promise is fulfilled or rejected, it is **settled** and cannot change state again.

### Creating a Promise

```javascript
const myPromise = new Promise(function(resolve, reject) {
    // Do some asynchronous work...
    const success = true;
    
    if (success) {
        resolve("Operation completed!");  // Fulfills the promise
    } else {
        reject("Something went wrong");   // Rejects the promise
    }
});
```

### Consuming a Promise: .then(), .catch(), .finally()

```javascript
myPromise
    .then(result => {
        // Runs if the promise is FULFILLED
        console.log("Success:", result);
    })
    .catch(error => {
        // Runs if the promise is REJECTED
        console.error("Error:", error);
    })
    .finally(() => {
        // Runs REGARDLESS of success or failure
        console.log("Operation complete (either way)");
    });
```

### Practical Example: Simulating a Network Request

```javascript
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        console.log("Fetching data for user", userId, "...");
        
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "Alice",
                    email: "alice@example.com"
                });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1500);
    });
}

// Using the Promise
fetchUserData(1)
    .then(user => console.log("Got user:", user.name))
    .catch(error => console.error("Failed:", error.message));
```

---

### Promise Chaining

`.then()` returns a new Promise, so you can chain multiple steps:

```javascript
fetchUserData(1)
    .then(user => {
        console.log("User:", user.name);
        return fetchOrders(user.id);  // Returns another Promise
    })
    .then(orders => {
        console.log("Orders:", orders.length);
        return fetchOrderDetails(orders[0].id);  // Another Promise
    })
    .then(details => {
        console.log("Details:", details);
    })
    .catch(error => {
        // Catches errors from ANY step in the chain
        console.error("Something failed:", error.message);
    });
```

> Compare this to callback hell — flat, readable, with one error handler for the entire chain.

---

### Promise.all() — Run in Parallel

When you need multiple independent async operations, run them simultaneously:

```javascript
const promise1 = fetch("https://api.example.com/users");
const promise2 = fetch("https://api.example.com/posts");
const promise3 = fetch("https://api.example.com/comments");

Promise.all([promise1, promise2, promise3])
    .then(responses => {
        // All three have completed successfully
        console.log("All responses received!");
        return Promise.all(responses.map(r => r.json()));
    })
    .then(([users, posts, comments]) => {
        console.log("Users:", users.length);
        console.log("Posts:", posts.length);
        console.log("Comments:", comments.length);
    })
    .catch(error => {
        // If ANY one fails, the whole thing fails
        console.error("One of the requests failed:", error);
    });
```

### Promise.race() — First One Wins

Returns the result of the first Promise to settle:

```javascript
const fast = new Promise(resolve => setTimeout(() => resolve("Fast!"), 100));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow..."), 2000));

Promise.race([fast, slow])
    .then(result => console.log(result));  // "Fast!"
```

### Promise.allSettled() — Wait for All, Don't Fail

Unlike `Promise.all()`, this waits for ALL promises even if some fail:

```javascript
const p1 = Promise.resolve("Success");
const p2 = Promise.reject("Error");
const p3 = Promise.resolve("Also success");

Promise.allSettled([p1, p2, p3])
    .then(results => {
        results.forEach(result => {
            if (result.status === "fulfilled") {
                console.log("✅", result.value);
            } else {
                console.log("❌", result.reason);
            }
        });
    });
// ✅ Success
// ❌ Error
// ✅ Also success
```

---

## 3. async/await: Promises Made Easy

`async/await` is **syntactic sugar** over Promises — it makes asynchronous code look and behave like synchronous code.

### Basic Syntax

```javascript
// Mark a function as async
async function greet() {
    return "Hello!";
}

// An async function ALWAYS returns a Promise
greet().then(msg => console.log(msg));  // "Hello!"
```

### await — Pause Until Promise Resolves

```javascript
async function loadUser() {
    console.log("Loading...");
    
    // await pauses execution until the Promise resolves
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await response.json();
    
    console.log("User:", user.name);
    return user;
}

loadUser();
```

> **Important:** `await` can only be used inside an `async` function.

### Error Handling with try/catch

```javascript
async function loadUser(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const user = await response.json();
        console.log("User:", user.name);
        return user;
    } catch (error) {
        console.error("Failed to load user:", error.message);
        return null;
    } finally {
        console.log("Request finished (success or failure)");
    }
}
```

### Sequential vs Parallel with async/await

```javascript
// ❌ Sequential — each waits for the previous one (SLOW)
async function loadSequential() {
    const user = await fetch("/api/user").then(r => r.json());       // 1 second
    const posts = await fetch("/api/posts").then(r => r.json());     // 1 second
    const comments = await fetch("/api/comments").then(r => r.json()); // 1 second
    // Total: ~3 seconds
}

// ✅ Parallel — all start at the same time (FAST)
async function loadParallel() {
    const [user, posts, comments] = await Promise.all([
        fetch("/api/user").then(r => r.json()),
        fetch("/api/posts").then(r => r.json()),
        fetch("/api/comments").then(r => r.json())
    ]);
    // Total: ~1 second (as long as the slowest one)
}
```

---

## 4. The Event Loop (How It All Works)

JavaScript uses an **event loop** to manage asynchronous operations:

```
┌──────────────────────────────────────┐
│           Call Stack                  │
│  (currently executing code)          │
│                                      │
│  function main() { ... }            │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│         Web APIs / Node APIs          │
│  (setTimeout, fetch, DOM events)     │
│                                      │
│  Handles async operations in         │
│  the background                      │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│        Task Queue / Callback Queue   │
│  (callbacks waiting to run)          │
│                                      │
│  [callback1] [callback2] ...        │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│          Event Loop                   │
│  "Is the call stack empty?"          │
│  YES → Move next callback to stack   │
│  NO  → Wait                         │
└──────────────────────────────────────┘
```

### Execution Order Example

```javascript
console.log("1: Start");

setTimeout(() => {
    console.log("2: Timeout callback");
}, 0);  // Even with 0ms delay!

Promise.resolve().then(() => {
    console.log("3: Promise callback");
});

console.log("4: End");

// Output:
// "1: Start"       ← synchronous, runs immediately
// "4: End"         ← synchronous, runs immediately
// "3: Promise"     ← microtask, runs before setTimeout
// "2: Timeout"     ← macrotask, runs last
```

> **Why this order?** Promise callbacks (microtasks) have higher priority than setTimeout callbacks (macrotasks). Both wait for synchronous code to finish first.

---

## 5. Real-World Patterns

### Loading Spinner

```javascript
async function loadDataWithSpinner() {
    const spinner = document.getElementById("spinner");
    const content = document.getElementById("content");
    
    spinner.style.display = "block";
    content.style.display = "none";
    
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        
        content.textContent = JSON.stringify(data, null, 2);
        content.style.display = "block";
    } catch (error) {
        content.textContent = "Failed to load data: " + error.message;
        content.style.display = "block";
    } finally {
        spinner.style.display = "none";
    }
}
```

### Retry Logic

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.log(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt === maxRetries) {
                throw new Error(`Failed after ${maxRetries} attempts`);
            }
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => 
                setTimeout(resolve, 1000 * attempt)
            );
        }
    }
}
```

### Debouncing (Rate-Limiting User Input)

```javascript
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Only search after user stops typing for 300ms
const searchInput = document.getElementById("search");
const debouncedSearch = debounce(async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    const results = await response.json();
    displayResults(results);
}, 300);

searchInput.addEventListener("input", (e) => {
    debouncedSearch(e.target.value);
});
```

---

## 📋 Comparison: Callbacks vs Promises vs async/await

| Feature | Callbacks | Promises | async/await |
|---------|-----------|----------|-------------|
| **Readability** | Low (nesting) | Medium (chaining) | High (looks synchronous) |
| **Error handling** | Manual (pass error callbacks) | `.catch()` | `try/catch` |
| **Chaining** | Callback hell | `.then()` chains | Sequential `await` |
| **Parallel** | Manual | `Promise.all()` | `Promise.all()` with `await` |
| **When to use** | Simple, one-off | Multiple steps | Most cases (preferred) |

---

## 📋 Practice Challenges

1. **Countdown Timer:** Use `setInterval` and Promises to create a countdown that resolves when it hits zero
2. **Sequential Loader:** Fetch 3 different API endpoints one after another, passing data from each to the next
3. **Parallel Fetcher:** Fetch 5 different URLs simultaneously using `Promise.all()` and display how long it took
4. **Retry Button:** Create a button that fetches data and automatically retries up to 3 times on failure
5. **Race Condition Demo:** Demonstrate what happens when two `Promise.race()` calls compete

---

## 🔗 Further Reading

- [MDN: Introducing Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)
- [MDN: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [JavaScript.info: Promises, async/await](https://javascript.info/async)
- [What the heck is the Event Loop? (Video)](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

---

*Self-Study Document 4 of 5 — BCA IV Semester Client Side Scripting*
