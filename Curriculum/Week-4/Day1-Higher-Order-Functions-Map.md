# Week 4, Day 1: Introduction to Higher-Order Functions and map()

**Duration:** 180 minutes (90 min theory + 90 min practical)  
**Date:** February 24, 2026  
**Learning Outcome:** Understand and apply higher-order functions, particularly the map() method

---

## 📚 THEORY SESSION (90 minutes)

### 0. Abstraction and Abstracting Repetition

Before learning higher-order functions, we need to understand the concept of **abstraction** — one of the most important ideas in programming.

**Abstraction** means hiding complex details behind a simpler interface. When you use `console.log("Hello")`, you don't need to know how your computer sends pixels to the screen — that complexity is **abstracted away**. Abstraction lets you think at a higher level, focusing on *what* you want to do rather than *how* every detail works.

#### Abstracting Repetition

Consider a common pattern: doing something $N$ times.

```javascript
// Without abstraction — repetitive code
console.log(0);
console.log(1);
console.log(2);

// Slight abstraction — a loop
for (let i = 0; i < 3; i++) {
    console.log(i);
}

// Better abstraction — a function
function repeatLog(n) {
    for (let i = 0; i < n; i++) {
        console.log(i);
    }
}
repeatLog(3);
```

But what if we don't always want to `console.log`? What if sometimes we want to do different things? This is where **higher-order functions** come in — we can abstract the **action** itself by passing it as a parameter:

```javascript
// Full abstraction — the action is a parameter
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

// Now we can do ANYTHING n times:
repeat(3, console.log);           // Logs 0, 1, 2
repeat(3, i => console.log("*".repeat(i + 1)));  // Logs *, **, ***

// We can even collect results:
const labels = [];
repeat(5, i => labels.push("Unit " + (i + 1)));
console.log(labels);  // ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
```

> **Key insight:** Higher-order functions are the natural next step in abstraction. Instead of abstracting over *values*, they abstract over **actions** (functions). This is the foundation of functional programming.

---

### 1. What is a Higher-Order Function?

A **higher-order function** is a function that either:
- Takes one or more functions as arguments, OR
- Returns a function as a result

It's a core concept in functional programming.

```javascript
// Regular function
function add(a, b) {
    return a + b;
}

// Higher-order function (takes a function as parameter)
function executeOperation(a, b, operation) {
    return operation(a, b);
}

console.log(executeOperation(5, 3, add));  // 8

// Another operator
function multiply(a, b) {
    return a * b;
}

console.log(executeOperation(5, 3, multiply));  // 15
```

---

### 2. Callbacks

A **callback** is a function passed to another function, which calls it at a later time.

```javascript
// Function that uses a callback
function processArray(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}

// Example 1: Print each number squared
function printSquare(num) {
    console.log(num * num);
}

const numbers = [1, 2, 3, 4];
processArray(numbers, printSquare);
// Output: 1, 4, 9, 16

// Example 2: Print each string in uppercase
function printUpper(str) {
    console.log(str.toUpperCase());
}

const words = ["apple", "banana", "orange"];
processArray(words, printUpper);
// Output: APPLE, BANANA, ORANGE
```

---

### 3. Introduction to map()

The **map()** method creates a NEW array by transforming each element.

**Syntax:**
```javascript
const newArray = originalArray.map(function(element, index, array) {
    // Return transformed element
});
```

**Real-World Analogy:** Factory assembly line transforming raw materials into products.

```javascript
// Example 1: Double each number
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(num) {
    return num * 2;
});

console.log(doubled);  // [2, 4, 6, 8, 10]
console.log(numbers);  // [1, 2, 3, 4, 5] - UNCHANGED

// Example 2: Get lengths of strings
const words = ["apple", "banana", "orange"];
const lengths = words.map(function(word) {
    return word.length;
});

console.log(lengths);  // [5, 6, 6]

// Example 3: Extract properties from objects
const students = [
    {name: "Alice", age: 20},
    {name: "Bob", age: 21},
    {name: "Charlie", age: 22}
];

const names = students.map(function(student) {
    return student.name;
});

console.log(names);  // ["Alice", "Bob", "Charlie"]
```

---

### 4. Arrow Functions with map()

Arrow functions make map() cleaner:

```javascript
// Traditional function
const doubled1 = numbers.map(function(num) {
    return num * 2;
});

// Arrow function
const doubled2 = numbers.map(num => num * 2);

// Both produce the same result: [2, 4, 6, 8, 10]

// More examples
const numbers = [1, 2, 3, 4, 5];

// Square each number
const squared = numbers.map(n => n * n);  // [1, 4, 9, 16, 25]

// Convert to strings
const strings = numbers.map(n => "Number: " + n);
// ["Number: 1", "Number: 2", ...]

// Complex transformation
const doubled = numbers.map(n => {
    const result = n * 2;
    return result + 10;
});
// [12, 14, 16, 18, 20]
```

---

### 5. Using map() with Objects

```javascript
// Array of objects
const products = [
    {name: "Laptop", price: 50000},
    {name: "Phone", price: 30000},
    {name: "Tablet", price: 20000}
];

// Get all product names
const productNames = products.map(p => p.name);
console.log(productNames);
// ["Laptop", "Phone", "Tablet"]

// Get prices with 10% discount
const discountedPrices = products.map(p => p.price * 0.9);
console.log(discountedPrices);
// [45000, 27000, 18000]

// Create formatted strings
const descriptions = products.map(p => 
    p.name + " costs ₹" + p.price
);
console.log(descriptions);
// ["Laptop costs ₹50000", "Phone costs ₹30000", ...]
```

---

### 6. Common map() Patterns

**Pattern 1: Simple Transformation**
```javascript
const celsius = [0, 10, 20, 30, 40];
const fahrenheit = celsius.map(c => (c * 9/5) + 32);
console.log(fahrenheit);  // [32, 50, 68, 86, 104]
```

**Pattern 2: Type Conversion**
```javascript
const stringNumbers = ["1", "2", "3", "4"];
const numbers = stringNumbers.map(Number);
console.log(numbers);  // [1, 2, 3, 4]

const numbers2 = [1, 2, 3, 4];
const strings = numbers2.map(String);
console.log(strings);  // ["1", "2", "3", "4"]
```

**Pattern 3: Extract and Transform**
```javascript
const users = [
    {id: 1, name: "Alice", email: "alice@example.com"},
    {id: 2, name: "Bob", email: "bob@example.com"}
];

const userEmails = users.map(u => u.email);
console.log(userEmails);
// ["alice@example.com", "bob@example.com"]

const userInfo = users.map(u => ({
    fullName: u.name,
    contact: u.email
}));
console.log(userInfo);
// [{fullName: "Alice", contact: "alice@example.com"}, ...]
```

---

### 7. Strings and Character Codes

Strings in JavaScript are sequences of **Unicode characters**. Each character has a numeric code called a **code point** — a unique number assigned to every character in the Unicode standard (which covers characters from virtually every writing system in the world).

#### Character Codes

```javascript
// charCodeAt() — returns the UTF-16 code unit at a given index
console.log("A".charCodeAt(0));    // 65
console.log("B".charCodeAt(0));    // 66
console.log("a".charCodeAt(0));    // 97
console.log("0".charCodeAt(0));    // 48
console.log("@".charCodeAt(0));    // 64

// String.fromCharCode() — creates a character from its code
console.log(String.fromCharCode(65));   // "A"
console.log(String.fromCharCode(97));   // "a"
console.log(String.fromCharCode(9786)); // "☺"
```

#### codePointAt() — For Full Unicode Support

Some characters (like emojis and characters from non-Latin scripts) require more than one UTF-16 code unit. `codePointAt()` handles these correctly:

```javascript
// Regular characters — same as charCodeAt
console.log("A".codePointAt(0));      // 65

// Emoji characters (beyond basic plane)
const emoji = "🐴";
console.log(emoji.charCodeAt(0));     // 55357 (incorrect — only half)
console.log(emoji.codePointAt(0));    // 128052 (correct full code point)

// String.fromCodePoint() creates from full code point
console.log(String.fromCodePoint(128052));  // "🐴"
```

#### Practical: ROT13 Cipher Using Character Codes

**ROT13** is a simple cipher that shifts each letter 13 positions in the alphabet. It uses character codes and `map()` together:

```javascript
function rot13(text) {
    return [...text].map(char => {
        const code = char.charCodeAt(0);
        // Uppercase letters (A=65 to Z=90)
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + 13) % 26) + 65);
        }
        // Lowercase letters (a=97 to z=122)
        if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + 13) % 26) + 97);
        }
        return char;  // Non-letter characters unchanged
    }).join("");
}

console.log(rot13("Hello World"));   // "Uryyb Jbeyq"
console.log(rot13("Uryyb Jbeyq"));   // "Hello World"  — applying twice reverses it!
```

> **Connection to Higher-Order Functions:** Notice how `map()` is used on an array of characters (`[...text]` spreads a string into individual characters). This is a real-world example of combining string manipulation with higher-order functions.

---

## ✅ PRACTICAL SESSION (90 minutes)

### Exercise 1.1: Basic map() with Numbers

**Objective:** Transform numeric arrays

```javascript
console.log("=== Exercise 1.1: Basic map() ===");

const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.map(n => n * 2);
console.log("Original: " + numbers);
console.log("Doubled: " + doubled);

// Square each number
const squared = numbers.map(n => n * n);
console.log("Squared: " + squared);

// Add 10 to each
const addTen = numbers.map(n => n + 10);
console.log("Plus 10: " + addTen);

// Calculate percentage of 100
const percentages = numbers.map(n => (n / 100) * 100);
console.log("As percentage: " + percentages);
```

**Expected Output:**
```
Original: 1,2,3,4,5
Doubled: 2,4,6,8,10
Squared: 1,4,9,16,25
Plus 10: 11,12,13,14,15
As percentage: 1,2,3,4,5
```

---

### Exercise 1.2: map() with Strings

**Objective:** Transform string arrays

```javascript
console.log("=== Exercise 1.2: map() with Strings ===");

const words = ["apple", "banana", "cherry", "date"];

// Convert to uppercase
const upper = words.map(w => w.toUpperCase());
console.log("Uppercase: " + upper);

// Get lengths
const lengths = words.map(w => w.length);
console.log("Lengths: " + lengths);

// Add exclamation mark
const excited = words.map(w => w + "!");
console.log("Excited: " + excited);

// Reverse each word
const reversed = words.map(w => {
    let result = "";
    for (let i = w.length - 1; i >= 0; i--) {
        result = result + w[i];
    }
    return result;
});
console.log("Reversed: " + reversed);

// Get first letter
const firstLetters = words.map(w => w[0]);
console.log("First letters: " + firstLetters);
```

**Expected Output:**
```
Uppercase: APPLE,BANANA,CHERRY,DATE
Lengths: 5,6,6,4
Excited: apple!,banana!,cherry!,date!
Reversed: elppa,ananab,yrrehc,etad
First letters: a,b,c,d
```

---

### Exercise 1.3: map() with Objects

**Objective:** Extract and transform object properties

```javascript
console.log("=== Exercise 1.3: map() with Objects ===");

const students = [
    {name: "Alice", marks: 85},
    {name: "Bob", marks: 92},
    {name: "Charlie", marks: 78},
    {name: "Diana", marks: 95}
];

// Get all names
const names = students.map(s => s.name);
console.log("Names: " + names);

// Calculate grades (90+ = A, 80+ = B, etc.)
const grades = students.map(s => {
    if (s.marks >= 90) return "A";
    if (s.marks >= 80) return "B";
    if (s.marks >= 70) return "C";
    return "F";
});
console.log("Grades: " + grades);

// Create student summary strings
const summaries = students.map(s => 
    s.name + " scored " + s.marks + " marks"
);
console.log("Summaries:");
for (let summary of summaries) {
    console.log("  " + summary);
}

// Create new objects with calculated properties
const studentData = students.map(s => ({
    studentName: s.name,
    score: s.marks,
    isPassing: s.marks >= 40,
    percentage: (s.marks / 100) * 100
}));
console.log("New structure:", studentData);
```

**Expected Output:**
```
Names: Alice,Bob,Charlie,Diana
Grades: B,A,C,A
Summaries:
  Alice scored 85 marks
  Bob scored 92 marks
  Charlie scored 78 marks
  Diana scored 95 marks
New structure: [{studentName: "Alice", score: 85, ...}, ...]
```

---

### Exercise 1.4: Chaining map() Calls

**Objective:** Apply multiple transformations in sequence

```javascript
console.log("=== Exercise 1.4: Chaining map() ===");

const numbers = [1, 2, 3, 4, 5];

// Chain multiple operations
const result = numbers
    .map(n => n * 2)        // Double: [2, 4, 6, 8, 10]
    .map(n => n + 5)        // Add 5: [7, 9, 11, 13, 15]
    .map(n => n * n);       // Square: [49, 81, 121, 169, 225]

console.log("Result: " + result);

// Practical example: e-commerce price calculation
const prices = [100, 200, 300, 400];

const finalPrices = prices
    .map(p => p * 0.9)       // 10% discount
    .map(p => p * 1.18)      // Add 18% tax
    .map(p => Math.round(p)) // Round to nearest integer
    .map(p => "₹" + p);      // Add currency

console.log("Final prices:", finalPrices);
// Output: ["₹106", "₹213", "₹319", "₹425"]
```

---

### Exercise 1.5: Practical - Temperature Converter

**Objective:** Use map() to convert temperature values

```javascript
console.log("=== Exercise 1.5: Temperature Converter ===");

// Temperature conversion functions
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

// Database of temperatures in Celsius
const temperaturesCelsius = [0, 10, 20, 30, 40, 100];

// Convert to Fahrenheit
const fahrenheit = temperaturesCelsius.map(celsiusToFahrenheit);
console.log("Celsius:    " + temperaturesCelsius);
console.log("Fahrenheit: " + fahrenheit.map(f => f.toFixed(1)));

// Convert to Kelvin
const kelvin = temperaturesCelsius.map(celsiusToKelvin);
console.log("Kelvin:     " + kelvin.map(k => k.toFixed(2)));

// Create temperature report objects
const temperatureReport = temperaturesCelsius.map(c => ({
    celsius: c,
    fahrenheit: (c * 9/5) + 32,
    kelvin: c + 273.15,
    description: c < 0 ? "Freezing" : c < 25 ? "Cold" : "Hot"
}));

console.log("\nTemperature Report:");
for (let temp of temperatureReport) {
    console.log(`${temp.celsius}°C = ${temp.fahrenheit.toFixed(1)}°F = ${temp.kelvin.toFixed(2)}K (${temp.description})`);
}
```

**Expected Output:**
```
Celsius:    0,10,20,30,40,100
Fahrenheit: 32.0,50.0,68.0,86.0,104.0,212.0
Kelvin:     273.15,283.15,293.15,303.15,313.15,373.15

Temperature Report:
0°C = 32.0°F = 273.15K (Freezing)
10°C = 50.0°F = 283.15K (Cold)
20°C = 68.0°F = 293.15K (Cold)
...
```

---

## 🎯 Key Takeaways

✅ **map() creates a NEW array**
✅ **map() doesn't modify the original array**
✅ **Every element gets transformed**
✅ **Similar length: input and output have same length**
✅ **Returns same type of transformation for all elements**
✅ **Can be chained for multiple transformations**

---

## 🔍 Common Mistakes

```javascript
// ❌ Mistake 1: Forgetting to return
const numbers = [1, 2, 3];
const doubled = numbers.map(n => {
    n * 2;  // No return!
});
console.log(doubled);  // [undefined, undefined, undefined]

// ✅ Correct
const doubled = numbers.map(n => {
    return n * 2;
});

// ❌ Mistake 2: Using map() when you want to modify original
const numbers = [1, 2, 3];
numbers.map(n => n * 2);  // Doesn't modify numbers
console.log(numbers);  // Still [1, 2, 3]

// ✅ Correct (if you really need to modify)
for (let i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * 2;
}

// ❌ Mistake 3: Forgetting callback parameter in arrow function
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);  // ✅ Correct
const doubled = numbers.map(() => 2);     // ❌ Ignores each element
```

---

## 📚 Summary Table

| Concept | Description | Example |
|---------|-------------|---------|
| Higher-order function | Function that takes or returns functions | `forEach`, `map` |
| Callback | Function passed to another function | `map(num => num * 2)` |
| map() | Transforms each element | `[1,2,3].map(x => x*2)` |
| Arrow function | Shorthand for functions | `x => x * 2` |
| Chaining | Multiple transformations | `arr.map().map().map()` |

---

## 📝 PRACTICE ASSIGNMENT

**Assignment: Currency Converter**

Create a currency converter using map():

```javascript
/*
 * Task: Convert prices from INR to USD, EUR, GBP
 * 
 * Exchange rates:
 * 1 INR = 0.012 USD
 * 1 INR = 0.011 EUR
 * 1 INR = 0.0095 GBP
 */

const inrPrices = [100, 500, 1000, 5000, 10000];

// Convert to USD
const usdPrices = inrPrices.map(inr => inr * 0.012);

// Convert to EUR
const eurPrices = inrPrices.map(inr => inr * 0.011);

// Convert to GBP
const gbpPrices = inrPrices.map(inr => inr * 0.0095);

// Display results
console.log("INR:  " + inrPrices);
console.log("USD:  " + usdPrices.map(p => p.toFixed(2)));
console.log("EUR:  " + eurPrices.map(p => p.toFixed(2)));
console.log("GBP:  " + gbpPrices.map(p => p.toFixed(2)));
```

---

**File:** `Curriculum/Week-4/Day1-Higher-Order-Functions-Map.md`  
**Status:** Complete ✅  
**Last Updated:** February 2026

---

## 🚀 Next: Day 2 - filter() and reduce()

---

## 📋 Week 4 Progress

- [x] Day 1: map() ✅
- [ ] Day 2: filter() and reduce()
- [ ] Day 3: Dates and Timers (Exp 17-19)
- [ ] Day 4: Advanced Array Operations (Exp 20-22)
- [ ] Day 5: Integration Project
