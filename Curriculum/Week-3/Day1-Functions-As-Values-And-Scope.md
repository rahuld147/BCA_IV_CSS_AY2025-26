# Week 3, Day 1: Functions as Values and Scope

**Duration:** 180 minutes (90 min theory + 90 min practical)  
**Date:** February 17, 2026  
**Learning Outcome:** Understand functions as values, scope concepts, and function parameters

---

## 📚 THEORY SESSION (90 minutes)

### 1. Functions as Values

In JavaScript, **functions are values** - they can be stored in variables, passed as arguments, and returned from other functions.

```javascript
// ============================================
// Traditional: Function is a statement
// ============================================
function greet(name) {
    return "Hello, " + name + "!";
}


// ============================================
// As a Value: Store function in variable
// ============================================
const greetFunc = function(name) {
    return "Hello, " + name + "!";
};

console.log(greetFunc("Alice"));  // Hello, Alice!


// Function in a variable has no name (anonymous)
const add = function(a, b) {
    return a + b;
};

console.log(add(5, 3));  // 8
```

---

### 1B. Declaration Notation: Function Declarations vs Expressions

There are two main ways to create a function in JavaScript, and they behave differently:

**Function Declaration** (also called **declaration notation**) — uses the `function` keyword at the start of a statement. A **declaration** is a statement that defines (declares) something for later use.

**Function Expression** — the function is created as part of a larger expression, typically assigned to a variable. An **expression** is any piece of code that produces a value.

```javascript
// FUNCTION DECLARATION
// The function is declared as a standalone statement.
function square(n) {
    return n * n;
}

// FUNCTION EXPRESSION
// The function is created as a value and assigned to a variable.
const cube = function(n) {
    return n * n * n;
};
```

#### Hoisting

**Hoisting** is JavaScript's behavior of moving declarations to the top of their scope before any code runs. Function declarations are hoisted — meaning you can call them *before* their definition appears in your code. Function expressions are **not** hoisted.

```javascript
// ✅ Works! Function declarations are hoisted.
console.log(square(5));  // 25

function square(n) {
    return n * n;
}

// ❌ Error! Function expressions are NOT hoisted.
// console.log(cube(3));  // TypeError: Cannot access 'cube' before initialization

const cube = function(n) {
    return n * n * n;
};

console.log(cube(3));  // 27  — works only AFTER the definition
```

> **Why does this matter?** 
> Hoisting lets you organize your code so that helper functions are defined at the bottom while the main logic is at the top. But many developers prefer function expressions because they make the order of definition explicit, avoiding surprises.

#### When to Use Which

| Feature | Declaration | Expression |
|---------|------------|------------|
| Hoisted? | ✅ Yes | ❌ No |
| Has a name? | Always named | Can be anonymous |
| Can be conditional? | ❌ Avoid in if/else | ✅ Can assign conditionally |
| Use as a value? | Not typical | ✅ Designed for it |

```javascript
// Conditional function creation — use expressions
let operation;
if (userWantsAddition) {
    operation = function(a, b) { return a + b; };
} else {
    operation = function(a, b) { return a - b; };
}
```

---

### 2. Functions Taking Functions as Arguments (Callbacks)

**Callback**: A function that is passed as an argument to another function, and then gets called (executed) by that function at a later time. Callbacks are fundamental to asynchronous programming and functional approaches in JavaScript.

Functions can accept other functions as parameters:

```javascript
// Simple example: Custom operation on numbers
function performOperation(a, b, operation) {
    return operation(a, b);  // Call the operation function
}

// Create different operations
const add = function(x, y) {
    return x + y;
};

const subtract = function(x, y) {
    return x - y;
};

const multiply = function(x, y) {
    return x * y;
};

// Use the same function with different operations
console.log(performOperation(10, 5, add));       // 15
console.log(performOperation(10, 5, subtract));  // 5
console.log(performOperation(10, 5, multiply));  // 50
```

---

### 3. Understanding Scope

**Scope** determines where a variable is accessible. JavaScript has:
- **Global scope** - Everywhere
- **Function scope** - Inside the function
- **Block scope** - Inside {} (with let/const)

**Lexical environment** (also "static scope"): The set of variable bindings available at a specific location in the code, determined by the code's physical structure. A function's lexical environment is set when the function is defined, not when it's called. This is why closures work — they "remember" the lexical environment they were defined in.

```javascript
// ============================================
// GLOBAL SCOPE
// ============================================
const globalVar = "I'm global";

function showGlobal() {
    console.log(globalVar);  // Can access global
}

showGlobal();  // Output: I'm global


// ============================================
// FUNCTION SCOPE
// ============================================
function myFunction() {
    const localVar = "I'm local";
    console.log(localVar);   // ✅ Can access
}

myFunction();          // Output: I'm local
// console.log(localVar);  // ❌ Error! Not accessible here


// ============================================
// BLOCK SCOPE (let/const)
// ============================================
if (true) {
    let blockVar = "Only in block";
    console.log(blockVar);  // ✅ Can access
}

// console.log(blockVar);  // ❌ Error! Not accessible


// ============================================
// Important: var leaks out of blocks
// ============================================
if (true) {
    var oldVar = "Uses var";
}
console.log(oldVar);   // ✅ Accessible (leaked!)

// This is why we prefer let/const!
```

---

### 4. Scope Chain

Inner scopes can access outer scopes:

```javascript
const outerVar = "Outer";

function outer() {
    const outerLocal = "Outer Function";
    
    function inner() {
        const innerLocal = "Inner Function";
        
        // Can access all:
        console.log(outerVar);      // "Outer"
        console.log(outerLocal);    // "Outer Function"
        console.log(innerLocal);    // "Inner Function"
    }
    
    inner();
    
    // Cannot access innerLocal
    // console.log(innerLocal);  // ❌ Error
}

outer();
```

---

### 5. Parameters as Local Variables

Function parameters are local to that function:

```javascript
const globalValue = 100;

function calculate(x, y) {  // x and y are parameters (local)
    const result = x + y;   // result is local
    return result;
}

console.log(calculate(5, 3));  // 8

// x, y, result don't exist here
// console.log(x);      // ❌ Error
// console.log(y);      // ❌ Error
// console.log(result); // ❌ Error
```

---

### 6. Variable Shadowing

A local variable can have the same name as a global one:

```javascript
const message = "Global Message";

function test() {
    const message = "Local Message";  // Shadows global
    console.log(message);  // Local Message
}

test();
console.log(message);  // Global Message

// The local one takes priority!
```

---

### 7. The Call Stack

The **call stack** is a data structure that JavaScript uses internally to keep track of function calls. A **data structure** is a way of organizing data so that it can be used efficiently — the call stack organizes function calls in a specific order.

When a function is called, JavaScript creates a **stack frame** (a record containing the function's local variables, parameters, and the location it was called from) and pushes it onto the stack. When the function returns, its frame is popped off.

**Analogy:** Think of the call stack like a stack of plates in a cafeteria — you add plates on top and remove from the top. The last plate added is the first one removed. This is called **Last In, First Out (LIFO)**.

```javascript
function multiply(a, b) {
    return a * b;
}

function square(n) {
    return multiply(n, n);
}

function printSquare(n) {
    const result = square(n);
    console.log(result);
}

printSquare(5);  // 25
```

**Call Stack Trace (step by step):**

```
Step 1: printSquare(5) is called
        Stack: [ printSquare ]

Step 2: printSquare calls square(5)
        Stack: [ printSquare, square ]

Step 3: square calls multiply(5, 5)
        Stack: [ printSquare, square, multiply ]

Step 4: multiply returns 25
        Stack: [ printSquare, square ]  ← multiply popped off

Step 5: square returns 25
        Stack: [ printSquare ]          ← square popped off

Step 6: printSquare logs 25 and returns
        Stack: [ ]                      ← printSquare popped off
```

#### Stack Overflow

A **stack overflow** occurs when the call stack grows too large — usually because a function calls itself endlessly without a way to stop. The stack has a limited size, and exceeding it causes a **RangeError**.

```javascript
function infinite() {
    return infinite();  // Calls itself forever — no stopping condition!
}

// infinite();  // ❌ RangeError: Maximum call stack size exceeded
```

> **Key Insight:** Understanding the call stack helps you read error messages. When JavaScript displays an error "stack trace," it's showing you the state of the call stack at the moment the error occurred — which function was running, which function called it, and so on.

---

### 8. Optional Arguments and Default Parameters

In JavaScript, you can call a function with **more or fewer arguments** than it declares. Extra arguments are silently ignored. Missing arguments receive the value `undefined`.

```javascript
function greet(name, greeting) {
    console.log(greeting + ", " + name + "!");
}

greet("Alice", "Hello");    // "Hello, Alice!"
greet("Bob");               // "undefined, Bob!"  — greeting is undefined
greet("Charlie", "Hi", 42); // "Hi, Charlie!"     — 42 is ignored
```

#### Handling Missing Arguments Manually

Before default parameters existed, developers used `||` or explicit checks:

```javascript
function greet(name, greeting) {
    // If greeting is undefined, use "Hello" as fallback
    greeting = greeting || "Hello";
    console.log(greeting + ", " + name + "!");
}

greet("Alice");          // "Hello, Alice!"
greet("Bob", "Hey");     // "Hey, Bob!"
```

#### Default Parameters (Modern — ES6+)

**Default parameters** allow you to define fallback values directly in the function signature. If an argument is not provided (or is `undefined`), the default value is used instead.

```javascript
function greet(name, greeting = "Hello") {
    console.log(greeting + ", " + name + "!");
}

greet("Alice", "Hi");   // "Hi, Alice!"
greet("Bob");            // "Hello, Bob!"  — uses default
```

**Practical Example:**

```javascript
function calculatePrice(price, taxRate = 0.18, discount = 0) {
    const taxAmount = price * taxRate;
    const total = price + taxAmount - discount;
    return total;
}

console.log(calculatePrice(1000));              // 1180 (18% tax, no discount)
console.log(calculatePrice(1000, 0.05));        // 1050 (5% tax, no discount)
console.log(calculatePrice(1000, 0.18, 100));   // 1080 (18% tax, ₹100 off)
```

> **Note:** Default parameters are evaluated left to right. A later default can use an earlier parameter's value:
> ```javascript
> function createRange(start, end, step = (start < end ? 1 : -1)) {
>     // step defaults based on start and end
> }
> ```

---

### 9. Recursion

**Recursion** is a programming technique where a function calls itself to solve a problem. A **recursive function** must have two essential parts:

1. **Base case** — the condition under which the function stops calling itself. Without this, the function would run forever (causing a stack overflow).
2. **Recursive case** — the part where the function calls itself with a **smaller** or **simpler** version of the original problem, moving closer to the base case.

**Analogy:** Imagine you are standing in a long queue and want to know your position. You ask the person in front of you, "What's your position?" That person asks the person in front of them, and so on. The first person in the queue says "1" — that's the **base case**. Each person then adds 1 to the answer they received — that's the **recursive case**. The answer travels back to you.

#### Example 1: Factorial

**Factorial** of a number $n$ (written $n!$) is the product of all positive integers up to $n$:
$$n! = n \times (n-1) \times (n-2) \times \ldots \times 1$$

```javascript
function factorial(n) {
    if (n === 0 || n === 1) {   // Base case
        return 1;
    }
    return n * factorial(n - 1); // Recursive case
}

console.log(factorial(5));   // 120  (5 × 4 × 3 × 2 × 1)
console.log(factorial(0));   // 1
console.log(factorial(1));   // 1
```

**Tracing the call stack:**

```
factorial(5)
  → 5 * factorial(4)
    → 4 * factorial(3)
      → 3 * factorial(2)
        → 2 * factorial(1)
          → 1              ← base case reached!
        → 2 * 1 = 2
      → 3 * 2 = 6
    → 4 * 6 = 24
  → 5 * 24 = 120
```

#### Example 2: Fibonacci Sequence

The **Fibonacci sequence** is a series of numbers where each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

$$F(n) = F(n-1) + F(n-2)$$

```javascript
function fibonacci(n) {
    if (n <= 0) return 0;        // Base case 1
    if (n === 1) return 1;       // Base case 2
    return fibonacci(n - 1) + fibonacci(n - 2);  // Recursive case
}

console.log(fibonacci(0));  // 0
console.log(fibonacci(1));  // 1
console.log(fibonacci(6));  // 8  (sequence: 0, 1, 1, 2, 3, 5, 8)
console.log(fibonacci(10)); // 55
```

#### Example 3: Power (Exponentiation)

```javascript
function power(base, exponent) {
    if (exponent === 0) return 1;  // Base case: any number to the power 0 is 1
    return base * power(base, exponent - 1);
}

console.log(power(2, 10));  // 1024
console.log(power(3, 3));   // 27
```

#### Recursion vs Loops

Any recursive function can be rewritten using a loop, and vice versa. Recursion is often more elegant for **tree-structured** or **divide-and-conquer** problems, while loops tend to be more efficient for simple repetition.

```javascript
// Countdown — Recursive version
function countdownRecursive(n) {
    if (n <= 0) {
        console.log("Done!");
        return;
    }
    console.log(n);
    countdownRecursive(n - 1);
}

// Countdown — Loop version (same behavior)
function countdownLoop(n) {
    while (n > 0) {
        console.log(n);
        n--;
    }
    console.log("Done!");
}
```

> **⚠️ Common Mistake: Missing Base Case**
> Without a base case, recursion becomes infinite and causes a stack overflow:
> ```javascript
> // ❌ BAD: No base case!
> function badRecursion(n) {
>     return n * badRecursion(n - 1);  // Never stops!
> }
> ```

---

### 10. Rest Parameters

**Rest parameters** allow a function to accept an indefinite number of arguments and collect them into an **array**. The syntax uses three dots (`...`) before the parameter name.

```javascript
function sum(...numbers) {
    let total = 0;
    for (let num of numbers) {
        total += num;
    }
    return total;
}

console.log(sum(1, 2));          // 3
console.log(sum(1, 2, 3, 4));   // 10
console.log(sum(5));             // 5
console.log(sum());              // 0
```

#### Rules for Rest Parameters

The rest parameter **must be the last parameter** in the function definition. You can have regular parameters before it:

```javascript
function introduce(greeting, ...names) {
    for (let name of names) {
        console.log(greeting + ", " + name + "!");
    }
}

introduce("Hello", "Alice", "Bob", "Charlie");
// Hello, Alice!
// Hello, Bob!
// Hello, Charlie!
```

#### Rest Parameters vs Spread Operator

They use the same `...` syntax but serve **opposite** purposes:

| | Rest Parameters | Spread Operator |
|---|---|---|
| **Where used** | In function **definition** | In function **calls** or array/object literals |
| **What it does** | **Collects** multiple arguments into one array | **Expands** an array into individual elements |

```javascript
// REST: Collecting multiple arguments into an array
function logAll(...items) {
    console.log(items);  // items is an array
}
logAll(1, 2, 3);  // [1, 2, 3]

// SPREAD: Expanding an array into individual arguments
const numbers = [5, 10, 15];
console.log(Math.max(...numbers));  // 15
// Equivalent to: Math.max(5, 10, 15)
```

---

### 11. Growing Functions

**Growing functions** is a principle about how to design functions as your program becomes more complex. The key ideas are:

1. **Start simple** — write a function that does one specific thing
2. **Identify repetition** — when you see similar logic appearing in multiple places, extract it into a reusable function
3. **Keep functions focused** — each function should do **one thing** well (the **Single Responsibility Principle**)

#### Example: Evolution of a Function

```javascript
// ============================================
// VERSION 1: Very specific, repetitive
// ============================================
function printFarmInventory(cows, chickens) {
    let cowString = String(cows);
    while (cowString.length < 3) {
        cowString = "0" + cowString;
    }
    console.log(cowString + " Cows");

    let chickenString = String(chickens);
    while (chickenString.length < 3) {
        chickenString = "0" + chickenString;
    }
    console.log(chickenString + " Chickens");
}

// Problem: What if we also need pigs?
// We'd have to copy-paste the padding logic again!


// ============================================
// VERSION 2: Extract the repeated logic into a helper
// ============================================
function zeroPad(number, width) {
    let string = String(number);
    while (string.length < width) {
        string = "0" + string;
    }
    return string;
}

function printFarmInventory(cows, chickens, pigs) {
    console.log(zeroPad(cows, 3) + " Cows");
    console.log(zeroPad(chickens, 3) + " Chickens");
    console.log(zeroPad(pigs, 3) + " Pigs");
}

printFarmInventory(7, 16, 3);
// Output: 007 Cows
//         016 Chickens
//         003 Pigs
```

> **Key Principle:** If you find yourself copying and pasting code with minor changes, it's time to extract a function. A good function has a clear name that describes what it does, takes inputs as parameters, and returns a result — without side effects when possible.

---

## ✅ PRACTICAL SESSION (90 minutes)

### Exercise 1.1: Functions as Values

**Objective:** Store and use functions as values

```javascript
console.log("=== Exercise 1.1: Functions as Values ===");

// Store calculator functions
const square = function(n) {
    return n * n;
};

const cube = function(n) {
    return n * n * n;
};

const doubleIt = function(n) {
    return n * 2;
};

// Store them in an array
const operations = [square, cube, doubleIt];

// Use each one
console.log("5 squared: " + operations[0](5));  // 25
console.log("5 cubed: " + operations[1](5));    // 125
console.log("5 doubled: " + operations[2](5));  // 10

// Function taking function as argument
function applyOperation(num, func) {
    return func(num);
}

console.log("Apply square: " + applyOperation(7, square));  // 49
```

---

### Exercise 1.2: Understanding Scope

**Objective:** Practice scope concepts

```javascript
console.log("=== Exercise 1.2: Scope Examples ===");

const GLOBAL_CONSTANT = 1000;

function bankAccount() {
    const balance = 5000;  // Function scope
    
    function deposit(amount) {  // Nested function
        const newBalance = balance + amount;  // Can access balance
        return newBalance;
    }
    
    function withdraw(amount) {
        return balance - amount;
    }
    
    console.log("Initial balance: " + balance);
    console.log("After deposit 1000: " + deposit(1000));
    console.log("After withdraw 500: " + withdraw(500));
    
    // Can't access deposit/withdraw here
}

bankAccount();

// console.log(deposit(1000));  // ❌ Error
```

---

### Exercise 1.3: Higher-Order Functions

**Objective:** Functions that take/return functions

```javascript
console.log("=== Exercise 1.3: Higher-Order Functions ===");

// Function that returns a function
function createMultiplier(factor) {
    return function(num) {
        return num * factor;
    };
}

// Create specific multipliers
const double = createMultiplier(2);     // Returns function
const triple = createMultiplier(3);
const tenTimes = createMultiplier(10);

console.log("5 doubled: " + double(5));      // 10
console.log("5 tripled: " + triple(5));      // 15
console.log("5 × 10: " + tenTimes(5));       // 50

// Function that processes with a filter
function processNumbers(numbers, filter) {
    const result = [];
    
    for (let i = 0; i < numbers.length; i++) {
        if (filter(numbers[i])) {
            result.push(numbers[i]);
        }
    }
    
    return result;
}

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const isEven = function(n) {
    return n % 2 === 0;
};

const isGreaterThan5 = function(n) {
    return n > 5;
};

console.log("Even numbers: " + processNumbers(nums, isEven));           // 2,4,6,8,10
console.log("Greater than 5: " + processNumbers(nums, isGreaterThan5)); // 6,7,8,9,10
```

---

### Exercise 1.4: Practical Application - Payment Processor

**Objective:** Use functions as values in a real-world scenario

```javascript
console.log("=== Exercise 1.4: Payment Processor ===");

// Different payment methods
const creditCard = function(amount) {
    const fee = amount * 0.02;  // 2% fee
    return {
        method: "Credit Card",
        total: amount + fee,
        fee: fee.toFixed(2)
    };
};

const debitCard = function(amount) {
    const fee = amount * 0.01;  // 1% fee
    return {
        method: "Debit Card",
        total: amount + fee,
        fee: fee.toFixed(2)
    };
};

const upi = function(amount) {
    const fee = amount * 0.005;  // 0.5% fee
    return {
        method: "UPI",
        total: amount + fee,
        fee: fee.toFixed(2)
    };
};

const cash = function(amount) {
    return {
        method: "Cash",
        total: amount,
        fee: "0.00"
    };
};

// Process payment with any method
function processPayment(amount, paymentMethod) {
    const result = paymentMethod(amount);
    
    console.log("Payment Method: " + result.method);
    console.log("Amount: ₹" + amount);
    console.log("Fee: ₹" + result.fee);
    console.log("Total: ₹" + result.total.toFixed(2));
    console.log("─────────────────────");
}

// Test different methods
processPayment(1000, creditCard);
processPayment(1000, debitCard);
processPayment(1000, upi);
processPayment(1000, cash);
```

---

### Exercise 1.5: Closures (Deep Dive)

**Objective:** Understand closures — one of JavaScript's most important concepts

#### What is a Closure?

A **closure** is created when a function "remembers" and continues to access variables from its **outer (enclosing) scope**, even after the outer function has finished executing. In other words, the inner function **closes over** the variables it references from outside.

Every function in JavaScript forms a closure. But the term is most meaningful when a function is returned from another function or passed around as a value, carrying its scope with it.

**Formal Definition:** A closure is the combination of a function and the **lexical environment** (the set of variable bindings) within which that function was defined.

#### Basic Closure Example

```javascript
console.log("=== Exercise 1.5: Introduction to Closures ===");

// A closure is a function with access to outer scope
function createCounter() {
    let count = 0;  // Outer scope variable
    
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();

console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3
console.log(counter());  // 4

// Each counter is independent
const counter2 = createCounter();
console.log(counter2());  // 1 (fresh start)

// Practical example: Secret password
function createPasswordChecker(correctPassword) {
    let attempts = 0;
    
    return function(guess) {
        attempts++;
        
        if (guess === correctPassword) {
            return "Correct! (Attempts: " + attempts + ")";
        } else {
            return "Wrong! (Attempt " + attempts + "/3)";
        }
    };
}

const checker = createPasswordChecker("secret123");

console.log("\nPassword Login:");
console.log(checker("admin"));      // Wrong! (Attempt 1/3)
console.log(checker("password"));   // Wrong! (Attempt 2/3)
console.log(checker("secret123"));  // Correct! (Attempts: 3)
```

#### The Loop-Closure Pitfall

One of the most common closure bugs occurs when using `var` in a loop. Because `var` is **function-scoped** (not block-scoped), all iterations share the same variable:

```javascript
// ❌ BUG: All functions share the same `i`
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);  // Prints 3, 3, 3 (not 0, 1, 2!)
    }, 100);
}
// By the time setTimeout runs, the loop has finished and i === 3

// ✅ FIX: Use `let` instead of `var`
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);  // Prints 0, 1, 2 ✅
    }, 100);
}
// `let` creates a new scope for each iteration
```

#### Closure for Data Privacy

Closures let you create **private variables** — values that can only be accessed through specific functions, not directly:

```javascript
function createWallet(initialBalance) {
    let balance = initialBalance;  // Private! Cannot access from outside

    return {
        deposit: function(amount) {
            if (amount > 0) {
                balance += amount;
                return "Deposited ₹" + amount + ". Balance: ₹" + balance;
            }
            return "Invalid amount";
        },
        withdraw: function(amount) {
            if (amount > balance) return "Insufficient funds";
            balance -= amount;
            return "Withdrew ₹" + amount + ". Balance: ₹" + balance;
        },
        getBalance: function() {
            return balance;
        }
    };
}

const myWallet = createWallet(1000);
console.log(myWallet.deposit(500));    // Deposited ₹500. Balance: ₹1500
console.log(myWallet.withdraw(200));   // Withdrew ₹200. Balance: ₹1300
console.log(myWallet.getBalance());    // 1300
// console.log(myWallet.balance);      // undefined — balance is private!
```

#### Memoization with Closures

**Memoization** is an optimization technique where a function "remembers" results of previous calls, so it doesn't recalculate them. Closures make this possible by storing the cache in the enclosing scope.

```javascript
function createMemoizedSquare() {
    const cache = {};  // Closure remembers this cache

    return function(n) {
        if (n in cache) {
            console.log("From cache: " + n);
            return cache[n];
        }
        console.log("Calculating: " + n);
        cache[n] = n * n;
        return cache[n];
    };
}

const memoSquare = createMemoizedSquare();
console.log(memoSquare(5));  // Calculating: 5 → 25
console.log(memoSquare(5));  // From cache: 5 → 25 (no recalculation!)
console.log(memoSquare(7));  // Calculating: 7 → 49
```

---

## 🎯 Key Concepts Summary

### Function as Value
```javascript
const func = function() { return 42; };
```

### Function Taking Function
```javascript
function apply(f) {
    return f();
}
apply(function() { return 42; });
```

### Scope Rules
```javascript
const global = 1;
function test() {
    const local = 2;
    // Can use: global, local
    // Can't use: anything declared in other functions
}
```

---

## 📋 Practice Challenges

### Challenge 1: Calculator with Operations
Create functions for +, -, ×, ÷  
Store in array, apply to numbers

### Challenge 2: Logger Function
Create function that creates logging functions  
Each logs with timestamp

### Challenge 3: Rate Limiter
Create function that limits how often another function runs

---

## ✅ Checklist

- [ ] Understand functions as values
- [ ] Can pass functions to other functions
- [ ] Understand global/function/block scope
- [ ] Know variable shadowing
- [ ] Can use higher-order functions
- [ ] Basic closure understanding
- [ ] Completed all exercises
- [ ] Challenge questions attempted

---

## 📚 Summary

| Concept | Meaning |
|---------|---------|
| Functions as values | Functions stored in variables, passed as arguments |
| Declaration notation | `function name(){}` — hoisted to top of scope |
| Function expression | `const f = function(){}` — not hoisted |
| Higher-order | Functions that take or return other functions |
| Global scope | Accessible everywhere in the program |
| Function scope | Accessible only inside the function |
| Block scope | Accessible only inside `{}` (with let/const) |
| Call stack | LIFO structure tracking active function calls |
| Optional arguments | Missing args become `undefined`; use defaults |
| Recursion | A function that calls itself with a base case |
| Rest parameters | `...args` collects extra arguments into an array |
| Growing functions | Design principle: extract repeated logic into helpers |
| Closure | Function that remembers its enclosing scope |

---

## 📖 Today's Learning Path

**09:00-09:30 (30 min):** Theory - Functions as Values  
**09:30-10:00 (30 min):** Theory - Scope & Closures  
**10:00-10:30 (30 min):** Practice - Exercises 1.1-1.3  
**10:30-11:00 (30 min):** Practice - Exercises 1.4-1.5  
**11:00-11:30 (30 min):** Challenges & Wrap-up  

**Next Day Preview:** Arrays - Storing multiple values!

---

**File:** `Curriculum/Week-3/Day1-Functions-As-Values-And-Scope.md`  
**Status:** Complete ✅  
**Last Updated:** February 2026
