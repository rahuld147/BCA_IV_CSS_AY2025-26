# Week 3, Day 5: Objects and Week 3 Integration Project

**Duration:** 180 minutes (90 min theory + 90 min practical)  
**Date:** February 21, 2026  
**Learning Outcome:** Understand objects as data containers and build comprehensive Week 3 project

---

## 📚 THEORY SESSION (90 minutes)

### 1. What is an Object?

**Object literal**: The syntax for creating an object by directly writing its properties and values in curly braces `{ }`. Example: `const person = { name: "Alice", age: 25 };` — the entire expression is an object literal.

**This** (keyword): A special keyword that refers to the object on which a method is being called. Inside an object's method, `this` gives you access to other properties of that same object. Example: In a `greet()` method, `this.name` refers to the name property of the object.

An **object** is a collection of related properties and their values, grouped together.

**Real-World Analogy:** Object is like a person
- Properties: name, age, email, phone
- Methods: sayHello(), getAge()

```javascript
// Creating an object (object literal)
const person = {
    name: "Alice",
    age: 25,
    email: "alice@example.com",
    city: "New York"
};

// Access properties
console.log(person.name);     // "Alice"
console.log(person.age);      // 25
console.log(person.email);    // "alice@example.com"

// Alternative access (bracket notation)
console.log(person["name"]);  // "Alice"
console.log(person["age"]);   // 25
```

---

### 2. Object Properties

```javascript
const student = {
    firstName: "John",
    lastName: "Doe",
    studentId: 12345,
    marks: [95, 87, 92],
    isActive: true
};

// Access properties
console.log(student.firstName);     // "John"
console.log(student.marks[1]);      // 87

// Modify properties
student.firstName = "Jane";
student.marks[0] = 98;

// Add new property
student.email = "jane@example.com";

// Delete property
delete student.isActive;

// Check if property exists
console.log("email" in student);    // true
console.log("phone" in student);    // false
```

---

### 3. Object Methods

Methods are functions stored as object properties:

```javascript
const calculator = {
    value: 0,
    
    add: function(num) {
        this.value = this.value + num;
        return this.value;
    },
    
    subtract: function(num) {
        this.value = this.value - num;
        return this.value;
    },
    
    reset: function() {
        this.value = 0;
    }
};

// Call methods
calculator.add(5);           // Returns 5
calculator.add(3);           // Returns 8
calculator.subtract(2);      // Returns 6
calculator.reset();          // value is now 0

// Using 'this' keyword
const person = {
    name: "Alice",
    age: 25,
    
    greet: function() {
        return "Hello, I'm " + this.name + " and I'm " + this.age;
    }
};

console.log(person.greet()); // "Hello, I'm Alice and I'm 25"
```

---

### 4. Iterating Over Objects

```javascript
const user = {
    name: "Bob",
    age: 30,
    city: "London"
};

// Using for...in loop
for (let key in user) {
    console.log(key + ": " + user[key]);
}
// Output:
// name: Bob
// age: 30
// city: London

// Get all keys
const keys = Object.keys(user);
console.log(keys);  // ["name", "age", "city"]

// Get all values
const values = Object.values(user);
console.log(values);  // ["Bob", 30, "London"]
```

---

### 5. Objects vs Arrays

```javascript
// Array - for ordered lists
const fruits = ["Apple", "Banana", "Orange"];
console.log(fruits[0]);  // "Apple"

// Object - for named properties
const person = {
    name: "Alice",
    age: 25
};
console.log(person.name);  // "Alice"

// Array of objects - best of both
const people = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 30},
    {name: "Charlie", age: 35}
];

console.log(people[0].name);  // "Alice"
```

---

### 6. Nested Objects

Objects can contain other objects. This is called **nesting** — when one data structure is placed inside another.

```javascript
const company = {
    name: "TechCorp",
    address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
    },
    employees: [
        {name: "Alice", role: "Manager"},
        {name: "Bob", role: "Developer"}
    ]
};

// Access nested properties
console.log(company.name);                    // "TechCorp"
console.log(company.address.city);            // "New York"
console.log(company.employees[0].name);       // "Alice"
```

---

### 7. Object Mutability

**Mutability** means the ability to be changed after creation. In JavaScript, understanding mutability is critical because objects and arrays behave very differently from primitive values (numbers, strings, booleans).

**Immutable** (or "immutability"): Unable to be changed. Primitive values like numbers and strings are immutable — once created, they cannot be modified. String methods like `.toUpperCase()` don't change the original string; they return a new string. Objects and arrays, on the other hand, are mutable — you can change their contents without creating new ones.

#### Primitives are Immutable

**Primitive values** (numbers, strings, booleans, `null`, `undefined`) are **immutable** — they cannot be changed. When you "modify" a primitive, you are actually creating a new value and reassigning the variable.

```javascript
let name = "Alice";
name = "Bob";  // Not modifying "Alice" — creating a new string "Bob"

// Strings are immutable — you cannot change individual characters
let str = "hello";
str[0] = "H";          // ❌ Silently fails
console.log(str);      // "hello" — unchanged
```

#### Objects are Mutable

**Objects** (including arrays) are **mutable** — their contents can be changed after creation. More importantly, **object variables store references** (memory addresses), not the actual data.

```javascript
const person = { name: "Alice", age: 25 };
person.age = 26;         // ✅ Modifying the object's contents
person.email = "a@b.com"; // ✅ Adding a new property
console.log(person);     // { name: "Alice", age: 26, email: "a@b.com" }

// Notice: we used `const` but still changed the object!
// `const` prevents reassigning the variable, NOT modifying the object's contents.
```

#### Reference vs Value: Identity

When you assign an object to another variable, both variables **point to the same object** in memory. This is called a **reference**:

```javascript
const a = { value: 10 };
const b = a;            // b is NOT a copy — it's a reference to the same object

b.value = 20;
console.log(a.value);   // 20  — a was also affected!

// Because a and b point to the SAME object:
console.log(a === b);   // true  — same identity
```

**Comparison:**

```javascript
// Objects: identity comparison (are they the same object?)
const obj1 = { x: 1 };
const obj2 = { x: 1 };
console.log(obj1 === obj2);  // false — different objects, even with same content!

// Primitives: value comparison
const num1 = 42;
const num2 = 42;
console.log(num1 === num2);  // true — same value
```

#### Shallow Copy

To create an independent copy of an object (so changes to one don't affect the other), you need to make a **shallow copy**. A **shallow copy** copies the top-level properties but does not clone nested objects — those still share references.

```javascript
const original = { name: "Alice", age: 25, hobbies: ["reading"] };

// Method 1: Spread operator
const copy1 = { ...original };

// Method 2: Object.assign()
const copy2 = Object.assign({}, original);

copy1.name = "Bob";
console.log(original.name);  // "Alice"  — original unchanged ✅

// ⚠️ WARNING: Nested objects are still shared!
copy1.hobbies.push("coding");
console.log(original.hobbies);  // ["reading", "coding"] — also changed! ❌
```

> **Deep copy** (copying nested objects too) can be done with `JSON.parse(JSON.stringify(obj))` for simple objects, or `structuredClone(obj)` in modern JavaScript.

---

### 8. Computing Correlation

A practical application of arrays and objects together is **computing correlation** — measuring how strongly two things are related. This example comes from the textbook *Eloquent JavaScript* (Chapter 4).

**Scenario:** Jacques keeps a daily journal recording events (what he ate, whether he exercised, etc.) and whether he turned into a squirrel that day. He wants to find which events correlate with his transformation.

#### Phi Coefficient (φ)

The **phi coefficient** is a measure of correlation between two Boolean (true/false) variables. It ranges from $-1$ (perfectly inversely related) to $1$ (perfectly directly related), with $0$ meaning no relation.

The formula uses a **2×2 frequency table**:

|                 | No Squirrel | Squirrel |
|-----------------|-------------|----------|
| **No Event**    | $n_{00}$    | $n_{01}$ |
| **Event**       | $n_{10}$    | $n_{11}$ |

$$\phi = \frac{n_{11} \cdot n_{00} - n_{10} \cdot n_{01}}{\sqrt{(n_{10}+n_{11})(n_{00}+n_{01})(n_{01}+n_{11})(n_{00}+n_{10})}}$$

```javascript
// Computing phi coefficient from a frequency table
// table = [n00, n01, n10, n11]
function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt(
            (table[2] + table[3]) *
            (table[0] + table[1]) *
            (table[1] + table[3]) *
            (table[0] + table[2])
        );
}

// Example: Does eating pizza correlate with squirrel transformation?
// 76 days: no pizza, no squirrel
// 9 days: no pizza, yes squirrel
// 4 days: yes pizza, no squirrel
// 1 day: yes pizza, yes squirrel
console.log(phi([76, 9, 4, 1]));  // 0.069 — very weak correlation
```

This example shows how arrays (the frequency table), objects (journal entries), and loops (processing entries) work together to solve a real problem.

---

## ✅ PRACTICAL SESSION (90 minutes)

### Exercise 5.1: Basic Objects

**Objective:** Create and use objects

```javascript
console.log("=== Exercise 5.1: Basic Objects ===");

// Book object
const book = {
    title: "JavaScript Basics",
    author: "John Doe",
    pages: 350,
    published: 2020,
    
    getInfo: function() {
        return this.title + " by " + this.author + " (" + this.pages + " pages)";
    }
};

console.log(book.title);           // "JavaScript Basics"
console.log(book.getInfo());       // Full description

// Modify and add properties
book.language = "English";
book.isbn = "978-1234567890";

console.log(book);  // Full object
```

---

### Exercise 5.2: Array of Objects

**Objective:** Work with multiple structured data

```javascript
console.log("=== Exercise 5.2: Array of Objects ===");

const movies = [
    {
        title: "Inception",
        year: 2010,
        rating: 8.8,
        director: "Christopher Nolan"
    },
    {
        title: "The Matrix",
        year: 1999,
        rating: 8.7,
        director: "Wachowski Brothers"
    },
    {
        title: "Interstellar",
        year: 2014,
        rating: 8.6,
        director: "Christopher Nolan"
    }
];

// Display all movies
for (let i = 0; i < movies.length; i++) {
    const m = movies[i];
    console.log(m.title + " (" + m.year + ") - " + m.rating + "/10");
}

// Find movie by director
const nolanMovies = movies.filter(m => m.director === "Christopher Nolan");
console.log("\nChristopher Nolan movies:", nolanMovies.length);
```

---

### Exercise 5.3: Object Methods and this

**Objective:** Use methods to operate on object data

```javascript
console.log("=== Exercise 5.3: Object Methods ===");

const bankAccount = {
    accountHolder: "Alice",
    balance: 10000,
    
    deposit: function(amount) {
        this.balance = this.balance + amount;
        console.log("Deposited ₹" + amount + ". New balance: ₹" + this.balance);
    },
    
    withdraw: function(amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds!");
            return false;
        }
        this.balance = this.balance - amount;
        console.log("Withdrew ₹" + amount + ". New balance: ₹" + this.balance);
        return true;
    },
    
    getStatement: function() {
        return this.accountHolder + " - Balance: ₹" + this.balance;
    }
};

// Use the methods
bankAccount.deposit(5000);       // Deposited ₹5000. New balance: ₹15000
bankAccount.withdraw(2000);      // Withdrew ₹2000. New balance: ₹13000
bankAccount.withdraw(15000);     // Insufficient funds!
console.log(bankAccount.getStatement());  // Alice - Balance: ₹13000
```

---

### Exercise 5.4: Practical - User Profile Manager

**Objective:** Manage user data with objects

```javascript
console.log("=== Exercise 5.4: User Profile Manager ===");

const users = [
    {
        userId: 1,
        username: "alice123",
        email: "alice@example.com",
        profile: {
            fullName: "Alice Johnson",
            bio: "JavaScript Developer",
            posts: 45
        }
    },
    {
        userId: 2,
        username: "bob_dev",
        email: "bob@example.com",
        profile: {
            fullName: "Bob Smith",
            bio: "Web Developer",
            posts: 32
        }
    }
];

// Display user profile
function displayProfile(user) {
    console.log("\n=== User Profile ===");
    console.log("Username: " + user.username);
    console.log("Email: " + user.email);
    console.log("Name: " + user.profile.fullName);
    console.log("Bio: " + user.profile.bio);
    console.log("Posts: " + user.profile.posts);
}

displayProfile(users[0]);
displayProfile(users[1]);

// Find user by username
function findUser(username) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return users[i];
        }
    }
    return null;
}

const found = findUser("bob_dev");
if (found) {
    displayProfile(found);
}
```

---

## 🎉 WEEK 3 INTEGRATION PROJECT

### Project: Contact Management System

**Objective:** Combine all Week 3 concepts - functions, arrays, strings, and objects

```javascript
/*
 * ================================
 * Contact Management System
 * ================================
 * 
 * Features:
 * 1. Add/remove contacts
 * 2. Search contacts
 * 3. Display formatted contact info
 * 4. Validate contact data
 * 5. Generate reports
 */

// Contacts database
let contacts = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "9876543210",
        city: "New York"
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phone: "9123456789",
        city: "London"
    }
];

let nextId = 3;

// ============================================
// UTILITY FUNCTIONS
// ============================================

function capitalizeeName(firstName, lastName) {
    const first = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
    const last = lastName[0].toUpperCase() + lastName.slice(1).toLowerCase();
    return first + " " + last;
}

function validateEmail(email) {
    return email.includes("@") && email.includes(".");
}

function validatePhone(phone) {
    return phone.length >= 10 && /^[0-9]+$/.test(phone);
}

// ============================================
// CRUD OPERATIONS
// ============================================

function addContact(firstName, lastName, email, phone, city) {
    // Validate
    if (!firstName || !lastName) {
        console.log("❌ First and last name are required!");
        return false;
    }
    
    if (!validateEmail(email)) {
        console.log("❌ Invalid email format!");
        return false;
    }
    
    if (!validatePhone(phone)) {
        console.log("❌ Invalid phone number!");
        return false;
    }
    
    // Create contact
    const contact = {
        id: nextId++,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        city: city || "Not specified"
    };
    
    contacts.push(contact);
    console.log("✓ Contact added successfully!");
    return true;
}

function removeContact(id) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
            const removed = contacts.splice(i, 1);
            console.log("✓ Removed: " + removed[0].firstName + " " + removed[0].lastName);
            return true;
        }
    }
    console.log("❌ Contact not found!");
    return false;
}

function findContact(id) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
            return contacts[i];
        }
    }
    return null;
}

function searchByName(searchTerm) {
    const results = [];
    const term = searchTerm.toLowerCase();
    
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const fullName = (contact.firstName + " " + contact.lastName).toLowerCase();
        
        if (fullName.includes(term)) {
            results.push(contact);
        }
    }
    
    return results;
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================

function displayContact(contact) {
    const fullName = capitalizeeName(contact.firstName, contact.lastName);
    
    console.log("╔════════════════════════════════════╗");
    console.log("║        CONTACT DETAILS             ║");
    console.log("╚════════════════════════════════════╝");
    console.log("Name: " + fullName);
    console.log("Email: " + contact.email);
    console.log("Phone: " + contact.phone);
    console.log("City: " + contact.city);
    console.log("────────────────────────────────────");
}

function displayAllContacts() {
    console.log("\n╔════════════════════════════════════╗");
    console.log("║      ALL CONTACTS (" + contacts.length + ")            ║");
    console.log("╚════════════════════════════════════╝");
    
    for (let i = 0; i < contacts.length; i++) {
        const c = contacts[i];
        const fullName = capitalizeeName(c.firstName, c.lastName);
        console.log(c.id + ". " + fullName + " - " + c.email);
    }
    console.log("────────────────────────────────────");
}

// ============================================
// REPORTING FUNCTIONS
// ============================================

function generateReport() {
    console.log("\n╔════════════════════════════════════╗");
    console.log("║      CONTACT REPORT               ║");
    console.log("╚════════════════════════════════════╝");
    console.log("Total Contacts: " + contacts.length);
    
    // Count by city
    const cityCounts = {};
    for (let i = 0; i < contacts.length; i++) {
        const city = contacts[i].city;
        cityCounts[city] = (cityCounts[city] || 0) + 1;
    }
    
    console.log("\nContacts by City:");
    for (let city in cityCounts) {
        console.log("  " + city + ": " + cityCounts[city]);
    }
    console.log("────────────────────────────────────");
}

// ============================================
// DEMONSTRATION
// ============================================

console.log("═══════════════════════════════════════");
console.log("  CONTACT MANAGEMENT SYSTEM - WEEK 3");
console.log("═══════════════════════════════════════\n");

// Display existing contacts
displayAllContacts();

// Add new contacts
console.log("\n>>> Adding new contacts:");
addContact("Alice", "Johnson", "alice@example.com", "9988776655", "Tokyo");
addContact("Bob", "Wilson", "bob@example.com", "9876543210", "New York");

// Display all
displayAllContacts();

// Search
console.log("\n>>> Searching for 'ali':");
const searchResults = searchByName("ali");
for (let i = 0; i < searchResults.length; i++) {
    displayContact(searchResults[i]);
}

// Display single contact
console.log("\n>>> Viewing contact #1:");
const contact = findContact(1);
if (contact) {
    displayContact(contact);
}

// Remove contact
console.log("\n>>> Removing contact #2:");
removeContact(2);

// Final report
displayAllContacts();
generateReport();

console.log("\n=== System Ready for Use ===");
```

---

## #🎯 Week 3 Achievements

✅ **Concepts Learned:**
- Functions as values (Day 1)
- Scope and closures (Day 1)
- Arrays and methods (Day 2)
- String manipulation techniques (Days 3-4)
- Objects and methods (Day 5)

✅ **Experiments Completed:**
- Experiment 13: Palindrome Checker ✅
- Experiment 14: Character Replacement ✅
- Experiment 15: String Reversal ✅  
- Experiment 16: Capitalize First Letter ✅

✅ **Skills Mastered:**
- Creating and manipulating arrays
- Processing strings in multiple ways
- Organizing data with objects
- Writing reusable functions
- Building practical applications

---

## 📋 Week 3 Checklist

- [ ] Day 1: Functions as Values & Scope
- [ ] Day 2: Arrays and Array Methods
- [ ] Day 3: String Methods (Exp 13-14)
- [ ] Day 4: Advanced Strings (Exp 15-16)
- [ ] Day 5: Objects and Integration Project
- [ ] All Experiments 13-16 completed
- [ ] Contact Manager project working
- [ ] Code follows best practices
- [ ] Submitted to GitHub Classroom

---

## 📚 Week 3 Summary

| Concept | Key Points |
|---------|-----------|
| Functions | Can be stored and passed around |
| Scope | Variables accessible only in certain areas |
| Arrays | Ordered list of values, indexed 0-n |
| Strings | Immutable sequence of characters |
| Objects | Collections of properties and methods |
| this | Refers to the object calling the method |

---

## 🚀 Next Week Preview: Week 4

When ready for Week 4:
- **Theme:** Higher-Order Functions
- **Focus:** map(), filter(), reduce()
- **Experiments:** 17-22 (Array & Date Operations)
- **Major Project:** Data Processing Pipeline

---

## 📚 Week 3 Terminology Reference

For consistency, all key terms introduced in Week 3 are defined at first use across the five days:

| Term | Day Introduced | Definition | Example |
|------|---|---|---|
| **Functions as Values** | Day 1 | Functions can be stored in variables and passed around like any other value | `const add = function(a, b) { return a + b; };` |
| **Declaration Notation** | Day 1 | Statement that creates a function with the `function` keyword at the start | `function greet(name) { }` |
| **Hoisting** | Day 1 | Behavior of moving declarations to top of scope before code runs | Function declarations can be called before they're defined |
| **Callback** | Day 1 | Function passed as argument to another function, to be called later | `performOperation(10, 5, add)` |
| **Scope** | Day 1 | Region where a variable can be accessed | Global, function, or block scope |
| **Lexical Environment** | Day 1 | Set of variable bindings available at a location (defines closure) | Closure "remembers" lexical environment |
| **Closure** | Day 1 | Function that "remembers" variables from its outer scope | Inner function accessing outer function's variables |
| **Data Set** | Day 2 | Structured collection of related data | List of student names, product prices |
| **Data Structure** | Day 2 | Special format for organizing and storing collections | Arrays and objects |
| **Array** | Day 2 | Ordered list of values accessed by numeric index (0-based) | `const fruits = ["Apple", "Banana"];` |
| **Index** / **Indexing** | Day 2 | Numeric position in array (starting at 0) | `array[0]` accesses first element |
| **Reference** (vs Value) | Day 2 | Objects/arrays are accessed by reference (same object); primitives by value (copied) | Assigning array creates reference, not copy |
| **Immutable** | Day 5 | Unable to be changed after creation; strings are immutable | String methods return new string |
| **Mutable** | Day 2/5 | Able to be changed after creation; objects and arrays are mutable | Can modify array elements directly |
| **Object Literal** | Day 5 | Syntax for creating object by writing properties in curly braces | `const person = { name: "Alice", age: 25 };` |
| **Property** | Day 5 | Named piece of information in an object | `person.name` or `student.studentId` |
| **Method** | Day 5 | Function stored as object property | `person.greet()` method |
| **This** (keyword) | Day 5 | Refers to the object on which a method is being called | Inside method: `this.property` accesses object's property |
| **Nesting** | Day 5 | One data structure placed inside another | Object containing objects or arrays |
| **Memoization** | Day 1 | Optimization technique where function "remembers" previous results | Cache stores computed values |
| **Mutability** | Day 5 | Ability to be changed after creation | Strings immutable, objects/arrays mutable |

---

## 🔗 Week 3 Content Organization Map

**Day 1: Functions as Values**
- Functions can be stored in variables and passed around
- Understanding declaration notation vs expressions
- Learning closures and scope chains
- Using functions as callbacks/parameters

**Day 2: Arrays**
- Understanding data sets and data structures
- Creating and accessing arrays with indexes
- Modifying arrays with push, pop, shift, unshift
- Array methods: slice, splice, find, indexOf

**Day 3: Strings**
- Strings as sequences of characters
- String case conversion
- Finding and extracting substrings
- String methods: includes, indexOf, substring, slice

**Day 4: Advanced Strings**
- Reversing strings (3 approaches)
- Capitalizing strings
- Template literals for interpolation
- String validation and searching

**Day 5: Objects & Integration**
- Objects as key-value collections
- Object properties and methods
- Using `this` keyword in methods
- Understanding mutability and references
- Building comprehensive integration project

---

**File:** `Curriculum/Week-3/Day5-Objects-And-Integration.md`  
**Status:** Complete ✅  
**Last Updated:** February 2026  
**Audit Status:** Terminology consolidated, all terms defined at first use ✅

---

## 📝 WEEK 3 ASSIGNMENT SUBMISSION GUIDE

### File Naming Convention:
```
Week3/
├── Experiment_13_PalindromeChecker.js
├── Experiment_14_CharacterReplacement.js
├── Experiment_15_ReverseString.js
├── Experiment_16_CapitalizeFirst.js
└── Week3_Integration_ContactManager.js
```

### Commit and Push:
```bash
git add Week3/
git commit -m "[Week3-Complete] All string experiments and integration project"
git push origin main
```

---

**Week 3 Complete! All 4 String Experiments + Integration Project Done! 🎉**
