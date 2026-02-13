# Week 3: Data Structures - Arrays, Objects & Strings ✅

**Duration:** 5 Days | **Hours:** 15 (90 min theory + 90 min practical per day)  
**Status:** ✅ COMPLETE | **Audit Status:** ✅ Content Consistency Verified  
**Experiments:** 4/4 Complete | **Code Examples:** 70+

---

## 🔍 Audit & Quality Assurance Notes

This Week 3 curriculum has been audited for:
✅ **Content Consistency:** Cross-day references verified, no orphaned explanations  
✅ **Jargon Clarity:** All technical terms defined at first use (Callback, Lexical Environment, Index, Reference, etc.)  
✅ **Terminology Consolidation:** See [Day 5](./Day5-Objects-And-Integration.md#-week-3-terminology-reference) for complete terminology reference table  
✅ **No Duplicate Experiments:** Experiments 13-16 properly distributed across Days 3-4  

---

## 📚 Week Overview

Week 3 teaches you how to organize and manipulate data using arrays, objects, and strings. These are the core data structures you'll use in virtually every program. You'll learn how to store multiple values, access them, transform them, and work with text efficiently.

**Learning Outcomes:**
- Evaluate functions, data structures, and recursion for problem-solving
- Create and manipulate arrays effectively
- Work with objects to organize complex data
- Master string manipulation techniques
- Use array methods to process data

---

## 📖 Daily Breakdown

### **Day 1: Functions as Values & Scope**
**File:** [`Day1-Functions-As-Values-And-Scope.md`](./Day1-Functions-As-Values-And-Scope.md)

**Topics Covered:**
- Functions as first-class values
- Declaration notation: function declarations vs expressions
- Hoisting behavior
- Higher-order functions
- The call stack (stack frames, stack overflow)
- Closures deep dive (loop pitfalls, data privacy, memoization)
- Function scope vs block scope
- Variable shadowing
- Lexical scoping
- Optional arguments and default parameters
- Recursion (factorial, Fibonacci, power, recursion vs loops)
- Rest parameters and spread operator
- Growing functions (design principles)

**Practice Examples:** 12+ working programs  
**Key Concept:** Understanding that functions are values, enabling powerful programming patterns

---

### **Day 2: Arrays & Array Methods**
**File:** [`Day2-Arrays-And-Array-Methods.md`](./Day2-Arrays-And-Array-Methods.md)

**Topics Covered:**
- Understanding data sets
- Creating arrays
- Accessing array elements (indexing)
- Array properties (length)
- Adding/removing elements (push, pop, shift, unshift)
- Array iteration
- Mutating vs non-mutating methods
- Common array methods (slice, splice, includes, indexOf)
- Further arrayology (concat, find, findIndex, some, every, flat, flatMap)

**Practice Examples:** 15+ working programs  
**Mini-Project:** Shopping Cart System with array operations

---

### **Day 3: String Operations & Methods**
**File:** [`Day3-Strings-And-String-Methods.md`](./Day3-Strings-And-String-Methods.md)

**Topics Covered:**
- String basics and immutability
- Accessing characters in strings
- String methods (toUpperCase, toLowerCase, substring, slice)
- String searching (indexOf, includes, search)
- String templates
- Character codes

**Experiments:**
- ✅ **Experiment 13:** JavaScript Program to Check Whether a String is Palindrome or Not
- ✅ **Experiment 14:** JavaScript Program to Replace Characters of a String

**Practice Examples:** 14+ working programs  
**Mini-Project:** Text Toolkit with palindrome checker

---

### **Day 4: Advanced String Operations**
**File:** [`Day4-Advanced-String-Operations.md`](./Day4-Advanced-String-Operations.md)

**Topics Covered:**
- Split and join operations
- String replace and replaceAll
- Trim and whitespace handling
- String comparison
- Pattern matching basics
- String formatting techniques

**Experiments:**
- ✅ **Experiment 15:** JavaScript Program to Reverse a String
- ✅ **Experiment 16:** JavaScript Program to Convert the First Letter of a String into Uppercase

**Practice Examples:** 12+ working programs  
**Mini-Project:** String Utilities Library

---

### **Day 5: Objects & Integration**
**File:** [`Day5-Objects-And-Integration.md`](./Day5-Objects-And-Integration.md)

**Topics Covered:**
- Creating objects with literals
- Accessing properties (dot notation, bracket notation)
- Adding and modifying properties
- Methods inside objects
- Object iteration (for...in, Object.keys())
- Nested objects and arrays
- Object mutability (references vs values, identity, shallow copy)
- Computing correlation (phi coefficient, 2×2 frequency tables)

**Practice Examples:** 10+ working programs  
**Integration Project:** ⭐ **Contact Manager System**
- Store contacts as objects in an array
- Add/edit/delete/search contacts
- Display formatted contact information
- Export/display contact lists
- 250+ lines of production code
- Real-world application combining arrays, objects, and strings

---

## 📊 Experiments Checklist

| # | Title | Status | File | Difficulty |
|----|-------|--------|------|-----------|
| 13 | Check String is Palindrome | ✅ | Day 3 | ⭐⭐⭐ |
| 14 | Replace Characters in String | ✅ | Day 3 | ⭐⭐ |
| 15 | Reverse a String | ✅ | Day 4 | ⭐⭐ |
| 16 | Capitalize First Letter | ✅ | Day 4 | ⭐⭐ |

**All 4 Experiments:** COMPLETE ✅

---

## 🎯 Key Concepts Summary

### Arrays
```javascript
// Create arrays
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];

// Access elements (0-indexed)
console.log(fruits[0]);           // 'apple'
console.log(numbers[numbers.length - 1]); // 5

// Add elements
fruits.push('mango');              // Add to end
fruits.unshift('grape');           // Add to start

// Remove elements
fruits.pop();                       // Remove from end
fruits.shift();                     // Remove from start

// Search
console.log(fruits.includes('apple')); // true
console.log(fruits.indexOf('apple')); // 0

// Slice (non-mutating)
const copy = fruits.slice();       // Shallow copy
const partial = fruits.slice(0, 2); // First 2 items
```

### Strings
```javascript
// Create strings
const text = "Hello World";

// Access characters
console.log(text[0]);               // 'H'
console.log(text.charAt(0));        // 'H'

// Get length
console.log(text.length);           // 11

// Case operations
console.log(text.toUpperCase());    // "HELLO WORLD"
console.log(text.toLowerCase());    // "hello world"

// Extract parts
console.log(text.substring(0, 5));  // "Hello"
console.log(text.slice(6));         // "World"

// Search
console.log(text.indexOf('o'));     // 4
console.log(text.includes('World')); // true

// Replace
console.log(text.replace('World', 'JS')); // "Hello JS"

// Split
const words = text.split(' ');     // ['Hello', 'World']

// Template literals
const name = "Alice";
const greeting = `Hello, ${name}!`; // "Hello, Alice!"
```

### Objects
```javascript
// Create objects
const person = {
    name: 'Alice',
    age: 30,
    city: 'Mumbai'
};

// Access properties
console.log(person.name);          // 'Alice'
console.log(person['age']);        // 30

// Modify properties
person.age = 31;
person.city = 'Delhi';

// Add new properties
person.email = 'alice@email.com';

// Methods in objects
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};
console.log(calculator.add(5, 3));  // 8

// Object iteration
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Get all keys
console.log(Object.keys(person));
```

---

## 💡 Real-World Projects Completed

1. **Shopping Cart** - Add/remove items, calculate total
2. **Palindrome Checker** - Check if word reads same forwards/backwards
3. **Text Replacer** - Replace characters in text
4. **String Reverser** - Reverse string with multiple approaches
5. **Capitalization Tool** - Capitalize first letter or all words
6. **Contact Manager** - Full integration project with all Week 3 concepts

---

## 📊 Data Structure Comparison

| Feature | Array | Object | String |
|---------|-------|--------|--------|
| **Ordered** | Yes | No | Yes (sequence of chars) |
| **Indexed** | 0-based | Key-based | 0-based |
| **Mutable** | Yes | Yes | No (create new) |
| **Use Case** | Lists, collections | Key-value data | Text data |
| **Example** | `[1, 2, 3]` | `{name, age}`| `'Hello'` |

---

## 📚 Method Reference Cheat Sheet

### Important Array Methods
```javascript
push(), pop(), shift(), unshift()    // Add/remove elements
slice(), splice()                    // Extract/modify
includes(), indexOf()                // Search
join(), reverse()                    // Combine/reverse
```

### Important String Methods
```javascript
toUpperCase(), toLowerCase()         // Case conversion
substring(), slice()                 // Extract
split(), join()                      // Split/combine
indexOf(), includes()                // Search
replace(), replaceAll()              // Substitute
trim()                               // Remove whitespace
```

### Important Object Methods
```javascript
Object.keys()                        // Get all keys
Object.values()                      // Get all values
Object.entries()                     // Get key-value pairs
Object.assign()                      // Copy/merge objects
```

---

## 🔄 Progression from Week 2

**Week 2 Recap:**
- You learned control flow with conditionals and loops
- You learned to write functions

**Week 3 New Skills:**
- Organize multiple values in arrays
- Group related data in objects
- Manipulate text with string methods
- Combine Week 2 loops with Week 3 data structures

**Pattern:** Arrays of objects (very common!)
```javascript
const contacts = [
    { name: 'Alice', phone: '123-456' },
    { name: 'Bob', phone: '987-654' }
];

// Loop through array of objects
for (let contact of contacts) {
    console.log(contact.name);
}
```

---

## 🚀 How to Get Started

1. **Start with Day 1:**
   ```bash
   cd Curriculum/Week-3
   cat Day1-Functions-As-Values-And-Scope.md
   ```

2. **Build as You Learn:**
   - Day 1: Understand closures and scope
   - Day 2: Master arrays and array operations
   - Day 3-4: Build string manipulation skills
   - Day 5: Combine everything in Contact Manager

3. **Complete All Experiments:**
   - Test each solution multiple times
   - Try edge cases (empty strings, single chars, etc.)
   - Write clean, readable code

4. **Create the Contact Manager:**
   - Use an array to store contacts
   - Each contact is an object
   - Implement add, delete, search functions
   - Display formatted output

5. **Submit Your Work:**
   - Create `Week3_Submissions/` folder
   - Include all experiment solutions
   - Include Contact Manager project
   - Commit: `git add . && git commit -m "Week 3 Complete"`

---

## ⚠️ Common Mistakes to Avoid

1. **Confusing array indices**
   ```javascript
   ❌ const arr = [1, 2, 3];
      console.log(arr[3]);    // undefined (no index 3)
   ✅ console.log(arr[2]);    // 3 (correct index)
   ```

2. **Strings are immutable**
   ```javascript
   ❌ const str = "hello";
      str[0] = "H";          // Doesn't work!
   ✅ const str = "H" + "hello".slice(1); // Create new string
   ```

3. **Modifying during iteration**
   ```javascript
   ❌ array.forEach(item => array.push(item)); // Infinite!
   ✅ const copy = [...array];
      copy.forEach(item => array.push(item));
   ```

4. **Object vs Array**
   ```javascript
   ❌ const person = ['Alice', 30];      // What's what?
   ✅ const person = {name: 'Alice', age: 30}; // Clear!
   ```

5. **String methods vs Array methods**
   ```javascript
   ❌ const text = "hello";
      text.push('!');         // Strings don't have push!
   ✅ const newText = text + '!'; // Concatenate instead
   ```

---

## 📊 Complexity Guide

**Easy (Day 1-2):**
- Basic array operations
- Simple string methods
- Object creation

**Medium (Day 3-4):**
- String manipulation chains
- Array searching and filtering
- Nested objects and arrays

**Hard (Day 5):**
- Contact Manager system
- Complex object structures
- Multi-step operations

---

## 🎓 Chapter Outcomes

After Week 3, you should be able to:

✅ Create and manipulate arrays efficiently  
✅ Use objects to store structured data  
✅ Perform complex string operations  
✅ Combine arrays and objects effectively  
✅ Iterate through data structures  
✅ Apply methods appropriately  
✅ Build practical data-driven applications  

---

## 📈 Progress Tracking

| Week | Status | Experiments | Code Quality |
|------|--------|-------------|--------------|
| Week 1 | ✅ | 7/7 | Excellent |
| Week 2 | ✅ | 5/5 | Excellent |
| **Week 3** | ✅ | **4/4** | **Excellent** |
| Week 4 | ⏳ Pending | - | - |

**Cumulative Progress:** 16/24 experiments complete (67%)

---

## 🚀 Next Steps

After completing Week 3:

✅ **Week 3 is complete!**  
👉 **Move to [Week 4: Higher-Order Functions](../Week-4/README.md)**

Week 4 will teach you powerful functional programming patterns using map(), filter(), and reduce() to transform data elegantly.

---

**Week 3 Status:** ✅ COMPLETE  
**Ready for Week 4?** Yes! Move to [Week 4](../Week-4/README.md)  
**Experiment Coverage:** 4/4 (100%)

