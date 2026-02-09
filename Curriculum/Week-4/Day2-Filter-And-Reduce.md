# Week 4, Day 2: filter() and reduce() Methods

**Duration:** 180 minutes (90 min theory + 90 min practical)  
**Date:** February 25, 2026  
**Learning Outcome:** Master filter() and reduce() for data filtering and aggregation

---

## 📚 THEORY SESSION (90 minutes)

### 1. Introduction to filter()

The **filter()** method creates a NEW array with only elements that pass a test.

**Syntax:**
```javascript
const newArray = originalArray.filter(function(element, index, array) {
    return true;  // Keep element, false = remove element
});
```

**Real-World Analogy:** Sieve that lets certain items through and catches others.

```javascript
// Example 1: Filter even numbers
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);  // [2, 4, 6, 8, 10]

// Example 2: Filter words longer than 5 characters
const words = ["apple", "banana", "cat", "dragon", "egg"];
const longWords = words.filter(w => w.length > 5);
console.log(longWords);  // ["banana", "dragon"]

// Example 3: Filter objects
const students = [
    {name: "Alice", marks: 85, passed: true},
    {name: "Bob", marks: 45, passed: false},
    {name: "Charlie", marks: 92, passed: true}
];

const passing = students.filter(s => s.marks >= 50);
console.log(passing);  // [Alice, Charlie]
```

---

### 2. Common filter() Patterns

**Pattern 1: Simple Conditions**
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Numbers greater than 5
numbers.filter(n => n > 5);        // [6, 7, 8, 9, 10]

// Odd numbers
numbers.filter(n => n % 2 !== 0);  // [1, 3, 5, 7, 9]

// Divisible by 3
numbers.filter(n => n % 3 === 0);  // [3, 6, 9]
```

**Pattern 2: String Filtering**
```javascript
const words = ["apple", "apply", "appeal", "append"];

// Words containing "ap"
words.filter(w => w.includes("ap"));  // All of them

// Words starting with "app"
words.filter(w => w.startsWith("app"));  // ["apple", "apply", "append"]

// Words ending with "al"
words.filter(w => w.endsWith("al"));  // ["appeal"]
```

**Pattern 3: Object Filtering**
```javascript
const users = [
    {name: "Alice", age: 25, city: "New York"},
    {name: "Bob", age: 17, city: "London"},
    {name: "Charlie", age: 30, city: "New York"}
];

// Adults only
users.filter(u => u.age >= 18);

// From New York
users.filter(u => u.city === "New York");

// Combined conditions
users.filter(u => u.age >= 18 && u.city === "New York");
```

---

### 3. Introduction to reduce()

The **reduce()** method processes array elements and returns a SINGLE value.

**Syntax:**
```javascript
const result = array.reduce(function(accumulator, element, index, array) {
    // Return updated accumulator
}, initialValue);
```

**Real-World Analogy:** Folding items into a box and combining them into one final result.

```javascript
// Example 1: Sum of numbers
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum);  // 15

// Example 2: Product
const product = numbers.reduce((acc, n) => acc * n, 1);
console.log(product);  // 120

// Example 3: Concatenate strings
const words = ["Hello", " ", "World"];
const sentence = words.reduce((acc, w) => acc + w, "");
console.log(sentence);  // "Hello World"
```

---

### 4. Understanding accumulator

The **accumulator** is the running result that gets updated each iteration:

```javascript
const numbers = [1, 2, 3, 4];

// Step-by-step: Sum
const sum = numbers.reduce((acc, n) => {
    console.log(`acc=${acc}, n=${n}, result=${acc + n}`);
    return acc + n;
}, 0);

// Output:
// acc=0, n=1, result=1
// acc=1, n=2, result=3
// acc=3, n=3, result=6
// acc=6, n=4, result=10
// Final: sum = 10
```

---

### 5. reduce() with Objects

```javascript
// Count occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});

console.log(count);
// {apple: 3, banana: 2, orange: 1}

// Group array by property
const students = [
    {name: "Alice", grade: "A"},
    {name: "Bob", grade: "B"},
    {name: "Charlie", grade: "A"},
    {name: "Diana", grade: "A"}
];

const byGrade = students.reduce((acc, student) => {
    if (!acc[student.grade]) {
        acc[student.grade] = [];
    }
    acc[student.grade].push(student.name);
    return acc;
}, {});

console.log(byGrade);
// { A: ["Alice", "Charlie", "Diana"], B: ["Bob"] }
```

---

### 6. Combining filter() and reduce()

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Sum of even numbers
const sumOfEvens = numbers
    .filter(n => n % 2 === 0)    // [2, 4, 6, 8, 10]
    .reduce((sum, n) => sum + n, 0);  // 30

console.log(sumOfEvens);

// Average of numbers greater than 5
const bigNumbers = numbers.filter(n => n > 5);
const average = bigNumbers.reduce((sum, n) => sum + n, 0) / bigNumbers.length;
console.log(average);  // 7.5
```

---

### 7. Script Data Set — Higher-Order Functions in Action

The textbook *Eloquent JavaScript* introduces a concept called the **script data set** — a collection of data about the world's writing systems (scripts). This is a great example of using `filter()`, `map()`, and `reduce()` together on real data.

A **script** (in this context) refers to a writing system like Latin (used for English), Devanagari (used for Hindi), Cyrillic (used for Russian), Han (used for Chinese), etc. Each script has properties like its name, the range of character codes it covers, and the direction it's written in.

#### Working with a Script Data Set

```javascript
// Simplified script data (in real code, this would be a larger dataset)
const SCRIPTS = [
    { name: "Latin",      living: true,  direction: "ltr", ranges: [[65, 90], [97, 122]],    year: -700 },
    { name: "Devanagari", living: true,  direction: "ltr", ranges: [[2304, 2431]],            year: -200 },
    { name: "Arabic",     living: true,  direction: "rtl", ranges: [[1536, 1791]],            year: 400 },
    { name: "Cyrillic",   living: true,  direction: "ltr", ranges: [[1024, 1279]],            year: 800 },
    { name: "Gothic",     living: false, direction: "ltr", ranges: [[66352, 66383]],          year: 350 },
    { name: "Coptic",     living: false, direction: "ltr", ranges: [[994, 1023]],             year: 200 },
    { name: "Han",        living: true,  direction: "ltr", ranges: [[19968, 40959]],          year: -1100 }
];

// Filter: Find living scripts
const living = SCRIPTS.filter(s => s.living);
console.log("Living scripts:", living.map(s => s.name));
// ["Latin", "Devanagari", "Arabic", "Cyrillic", "Han"]

// Filter: Right-to-left scripts
const rtl = SCRIPTS.filter(s => s.direction === "rtl");
console.log("RTL scripts:", rtl.map(s => s.name));
// ["Arabic"]

// Reduce: Find the oldest script
const oldest = SCRIPTS.reduce((a, b) => a.year < b.year ? a : b);
console.log("Oldest script:", oldest.name, "(year:", oldest.year + ")");
// "Han" (year: -1100)

// Reduce: Count scripts by direction
const directionCount = SCRIPTS.reduce((acc, s) => {
    acc[s.direction] = (acc[s.direction] || 0) + 1;
    return acc;
}, {});
console.log("By direction:", directionCount);
// { ltr: 6, rtl: 1 }
```

#### Finding a Script by Character Code

```javascript
function characterScript(code) {
    for (let script of SCRIPTS) {
        for (let [from, to] of script.ranges) {
            if (code >= from && code <= to) {
                return script;
            }
        }
    }
    return null;  // No script found
}

console.log(characterScript(65));    // Latin (A)
console.log(characterScript(2310));  // Devanagari (आ)
console.log(characterScript(1576));  // Arabic (ب)
```

> **Why this matters:** The script data set exercise demonstrates how `filter()`, `map()`, and `reduce()` work together to analyze real-world data — filtering by criteria, transforming entries, and aggregating statistics. This is the same pattern used in data analytics, business intelligence, and API data processing.

---

## ✅ PRACTICAL SESSION (90 minutes)

### Exercise 2.1: Basic filter()

**Objective:** Filter arrays based on conditions

```javascript
console.log("=== Exercise 2.1: Basic filter() ===");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log("Even numbers: " + evens);

// Numbers greater than 5
const greaterThan5 = numbers.filter(n => n > 5);
console.log("Greater than 5: " + greaterThan5);

// Numbers divisible by 3
const divisibleBy3 = numbers.filter(n => n % 3 === 0);
console.log("Divisible by 3: " + divisibleBy3);

// Numbers in range 3-7
const inRange = numbers.filter(n => n >= 3 && n <= 7);
console.log("Between 3 and 7: " + inRange);
```

**Expected Output:**
```
Even numbers: 2,4,6,8,10
Greater than 5: 6,7,8,9,10
Divisible by 3: 3,6,9
Between 3 and 7: 3,4,5,6,7
```

---

### Exercise 2.2: filter() with Strings

**Objective:** Filter string arrays

```javascript
console.log("=== Exercise 2.2: filter() with Strings ===");

const words = ["apple", "apply", "apricot", "banana", "blueberry", "cherry"];

// Words starting with "a"
const startsWithA = words.filter(w => w.startsWith("a"));
console.log("Starting with 'a': " + startsWithA);

// Words containing "pp"
const hasDouble = words.filter(w => w.includes("pp"));
console.log("Containing 'pp': " + hasDouble);

// Words longer than 6 characters
const longWords = words.filter(w => w.length > 6);
console.log("Longer than 6 chars: " + longWords);

// Words with specific first letter (e.g., 'b')
const startsWithB = words.filter(w => w[0] === "b");
console.log("Starting with 'b': " + startsWithB);
```

**Expected Output:**
```
Starting with 'a': apple,apply,apricot
Containing 'pp': apple,apply
Longer than 6 chars: apricot,blueberry
Starting with 'b': banana,blueberry
```

---

### Exercise 2.3: filter() with Objects

**Objective:** Filter arrays of objects

```javascript
console.log("=== Exercise 2.3: filter() with Objects ===");

const employees = [
    {name: "Alice", salary: 50000, department: "IT"},
    {name: "Bob", salary: 45000, department: "HR"},
    {name: "Charlie", salary: 60000, department: "IT"},
    {name: "Diana", salary: 55000, department: "Finance"},
    {name: "Eve", salary: 48000, department: "HR"}
];

// IT department employees
const itEmployees = employees.filter(e => e.department === "IT");
console.log("IT employees:");
for (let emp of itEmployees) {
    console.log("  " + emp.name + " - ₹" + emp.salary);
}

// Employees with salary > 50000
const highEarners = employees.filter(e => e.salary > 50000);
console.log("\nHigh earners:");
for (let emp of highEarners) {
    console.log("  " + emp.name + " - ₹" + emp.salary);
}

// HR employees with salary less than 50000
const lowPaidHR = employees.filter(e => 
    e.department === "HR" && e.salary < 50000
);
console.log("\nLow-paid HR:", lowPaidHR.map(e => e.name));
```

**Expected Output:**
```
IT employees:
  Alice - ₹50000
  Charlie - ₹60000

High earners:
  Charlie - ₹60000
  Diana - ₹55000

Low-paid HR: Bob,Eve
```

---

### Exercise 2.4: Basic reduce()

**Objective:** Aggregate data using reduce()

```javascript
console.log("=== Exercise 2.4: Basic reduce() ===");

const numbers = [1, 2, 3, 4, 5];

// Sum
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum: " + sum);

// Product
const product = numbers.reduce((acc, n) => acc * n, 1);
console.log("Product: " + product);

// Concatenate with commas
const concat = numbers.reduce((acc, n) => acc + ", " + n);
console.log("Concatenated: " + concat);

// Find maximum
const max = numbers.reduce((acc, n) => n > acc ? n : acc);
console.log("Maximum: " + max);

// Find minimum
const min = numbers.reduce((acc, n) => n < acc ? n : acc);
console.log("Minimum: " + min);
```

**Expected Output:**
```
Sum: 15
Product: 120
Concatenated: 1, 2, 3, 4, 5
Maximum: 5
Minimum: 1
```

---

### Exercise 2.5: Combining filter() and reduce()

**Objective:** Use both methods together

```javascript
console.log("=== Exercise 2.5: filter() + reduce() ===");

const transactions = [
    {type: "deposit", amount: 1000},
    {type: "withdraw", amount: 300},
    {type: "deposit", amount: 500},
    {type: "withdraw", amount: 200},
    {type: "deposit", amount: 2000}
];

// Sum of all deposits
const deposits = transactions
    .filter(t => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);

console.log("Total deposits: ₹" + deposits);

// Sum of all withdrawals
const withdrawals = transactions
    .filter(t => t.type === "withdraw")
    .reduce((sum, t) => sum + t.amount, 0);

console.log("Total withdrawals: ₹" + withdrawals);

// Net balance
const net = deposits - withdrawals;
console.log("Net balance: ₹" + net);

// Count transactions by type
const counts = transactions.reduce((acc, t) => {
    acc[t.type] = (acc[t.type] || 0) + 1;
    return acc;
}, {});

console.log("Transaction counts:", counts);
```

**Expected Output:**
```
Total deposits: ₹3500
Total withdrawals: ₹500
Net balance: ₹3000
Transaction counts: {deposit: 3, withdraw: 2}
```

---

### Exercise 2.6: Practical - Student Grade Analysis

**Objective:** Analyze student data using filter() and reduce()

```javascript
console.log("=== Exercise 2.6: Student Grade Analysis ===");

const students = [
    {name: "Alice", marks: 85, subject: "Math"},
    {name: "Bob", marks: 92, subject: "Math"},
    {name: "Charlie", marks: 78, subject: "English"},
    {name: "Diana", marks: 95, subject: "Math"},
    {name: "Eve", marks: 88, subject: "English"},
    {name: "Frank", marks: 72, subject: "Math"}
];

// Students with marks >= 80
const topScorers = students.filter(s => s.marks >= 80);
console.log("Top scorers (>=80):");
for (let s of topScorers) {
    console.log("  " + s.name + " - " + s.marks);
}

// Average marks of all students
const totalMarks = students.reduce((sum, s) => sum + s.marks, 0);
const averageMarks = totalMarks / students.length;
console.log("\nAverage marks: " + averageMarks.toFixed(2));

// Average marks by subject
const bySubject = students.reduce((acc, s) => {
    if (!acc[s.subject]) {
        acc[s.subject] = { total: 0, count: 0 };
    }
    acc[s.subject].total += s.marks;
    acc[s.subject].count += 1;
    return acc;
}, {});

console.log("\nAverage by subject:");
for (let subject in bySubject) {
    const avg = (bySubject[subject].total / bySubject[subject].count).toFixed(2);
    console.log("  " + subject + ": " + avg);
}

// Highest marks
const highest = students.reduce((best, s) => 
    s.marks > best.marks ? s : best
);
console.log("\nHighest marks: " + highest.name + " (" + highest.marks + ")");

// Lowest marks
const lowest = students.reduce((worst, s) => 
    s.marks < worst.marks ? s : worst
);
console.log("Lowest marks: " + lowest.name + " (" + lowest.marks + ")");
```

**Expected Output:**
```
Top scorers (>=80):
  Alice - 85
  Bob - 92
  Diana - 95
  Eve - 88

Average marks: 85.00

Average by subject:
  Math: 86.00
  English: 83.00

Highest marks: Diana (95)
Lowest marks: Frank (72)
```

---

## 🎯 Key Takeaways

✅ **filter() returns elements that PASS a test**
✅ **filter() can return fewer or NO elements**
✅ **reduce() combines all elements into ONE value**
✅ **Accumulator is the running result**
✅ **Both are non-destructive (don't modify original)**
✅ **Can be chained: arr.filter().reduce()**

---

## 🔍 Common Mistakes

```javascript
// ❌ Mistake 1: Not returning boolean in filter
const numbers = [1, 2, 3];
const evens = numbers.filter(n => n % 2);  // Wrong!
// Returns [1, 3] because n % 2 returns 1/0 (truthy/falsy)

// ✅ Correct
const evens = numbers.filter(n => n % 2 === 0);

// ❌ Mistake 2: Forgetting initial value in reduce
const numbers = [1, 2, 3];
const sum = numbers.reduce((acc, n) => acc + n);
// Works but harder to reason about

// ✅ Correct
const sum = numbers.reduce((acc, n) => acc + n, 0);

// ❌ Mistake 3: Modifying original array
const numbers = [1, 2, 3];
numbers.filter(n => n > 1).forEach(n => {
    numbers[i] = n * 2;  // Bad! Modifying array during iteration
});

// ✅ Correct
const newNumbers = numbers.filter(n => n > 1);
```

---

## 📚 Summary

| Method | Purpose | Returns |
|--------|---------|---------|
| map() | Transform elements | Array (same length) |
| filter() | Select elements | Array (may be shorter) |
| reduce() | Combine elements | Single value |

---

**File:** `Curriculum/Week-4/Day2-Filter-And-Reduce.md`  
**Status:** Complete ✅  
**Last Updated:** February 2026

---

## 📋 Week 4 Progress

- [x] Day 1: map() ✅
- [x] Day 2: filter() and reduce() ✅
- [ ] Day 3: Dates and Timers (Exp 17-19)
- [ ] Day 4: Advanced Array Operations (Exp 20-22)
- [ ] Day 5: Integration Project
