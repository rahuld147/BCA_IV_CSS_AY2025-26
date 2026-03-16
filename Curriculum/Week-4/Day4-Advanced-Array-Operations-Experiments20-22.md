# Week 4, Day 4: Advanced Array Operations (Experiments 20-22)

**Duration:** 180 minutes (90 min theory + 90 min practical)  
**Date:** February 27, 2026  
**Learning Outcome:** Master advanced array operations using higher-order functions (Experiments 20-22)

---

## 📚 THEORY SESSION (90 minutes)

### 1. Removing Elements from Arrays

```javascript
// Method 1: filter() - Non-destructive
const numbers = [1, 2, 3, 4, 5];
const without3 = numbers.filter(n => n !== 3);
console.log(without3);  // [1, 2, 4, 5]
console.log(numbers);   // [1, 2, 3, 4, 5] - unchanged

// Method 2: splice() - Destructive
const arr = [1, 2, 3, 4, 5];
arr.splice(2, 1);  // Remove 1 element at index 2
console.log(arr);  // [1, 2, 4, 5] - modified

// Method 3: Remove by value
function removeByValue(arr, value) {
    return arr.filter(item => item !== value);
}

const fruits = ["apple", "banana", "cherry", "banana"];
console.log(removeByValue(fruits, "banana"));
// ["apple", "cherry"] - removes ALL occurrences

// Method 4: Remove first occurrence
function removeFirstOccurrence(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }
    return arr;
}

const fruits2 = ["apple", "banana", "cherry", "banana"];
console.log(removeFirstOccurrence(fruits2, "banana"));
// ["apple", "cherry", "banana"]
```

---

### 2. Merging Arrays

```javascript
// Method 1: concat()
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = arr1.concat(arr2);
console.log(merged);  // [1, 2, 3, 4, 5, 6]

// Method 2: spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];
console.log(merged);  // [1, 2, 3, 4, 5, 6]

// Method 3: Multiple arrays
const result = [...arr1, ...arr2, ...[7, 8]];
console.log(result);  // [1, 2, 3, 4, 5, 6, 7, 8]
```

---

### 3. Removing Duplicates

**Set**: A built-in JavaScript object that stores unique values. A Set automatically removes duplicates — if you try to add a value that already exists, it won't be added again. Sets are useful for eliminating duplicate items from arrays. You can convert a Set back to an array using the spread operator `[...set]`.

```javascript
// Method 1: Using Set
const numbers = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(numbers)];
console.log(unique);  // [1, 2, 3, 4, 5]

// Method 2: Using filter()
const numbers = [1, 2, 2, 3, 4, 4, 5];
const unique = numbers.filter((num, index) => 
    numbers.indexOf(num) === index
);
console.log(unique);  // [1, 2, 3, 4, 5]

// Method 3: Using reduce()
const numbers = [1, 2, 2, 3, 4, 4, 5];
const unique = numbers.reduce((acc, num) => {
    if (!acc.includes(num)) {
        acc.push(num);
    }
    return acc;
}, []);
console.log(unique);  // [1, 2, 3, 4, 5]

// With strings
const words = ["apple", "apple", "banana", "cherry", "banana"];
const unique = [...new Set(words)];
console.log(unique);  // ["apple", "banana", "cherry"]
```

---

### 4. Sorting Arrays

**Comparator** (or **comparison function**): A function passed to the `sort()` method that defines the sort order. The comparator takes two elements (a and b) and returns:
- A negative number if a should come before b
- Zero if they're equal
- A positive number if a should come after b

For numbers, `(a, b) => a - b` sorts ascending, and `(a, b) => b - a` sorts descending.

#### Understanding `localeCompare()`

The `localeCompare()` method is a built-in JavaScript String function used to compare two strings in a locale-aware way. It's essential for proper alphabetical sorting, especially when dealing with strings that contain special characters, uppercase/lowercase letters, or non-English characters.

**What does it do?**
- Compares two strings and returns a number:
  - **Negative number** (-1): First string comes before the second string alphabetically
  - **Zero** (0): Both strings are equal
  - **Positive number** (1): First string comes after the second string alphabetically

**Why use it instead of simple comparison operators?**
- Simple operators (`<`, `>`) compare character codes directly, which doesn't handle uppercase/lowercase properly
- `localeCompare()` respects alphabetical order according to language rules
- It handles accented characters and special characters correctly

**Syntax:**
```javascript
string1.localeCompare(string2)
```

**Examples:**
```javascript
// Example 1: Basic alphabetical comparison
"apple".localeCompare("banana");        // returns -1 (apple comes before banana)
"zebra".localeCompare("apple");         // returns 1 (zebra comes after apple)
"apple".localeCompare("apple");         // returns 0 (they are equal)

// Example 2: Case-insensitive comparison
"Apple".localeCompare("banana");        // returns -1 (correct alphabetical order)
"APPLE".localeCompare("apple");         // returns -1 (uppercase comes first by default)

// Example 3: For sorting with proper alphabetical order
const words = ["Zebra", "apple", "Banana"];
const sorted = words.sort((a, b) => a.localeCompare(b));
console.log(sorted);  // ["apple", "Banana", "Zebra"]

// Example 4: Case-insensitive sorting
const words = ["Zebra", "apple", "Banana"];
const sorted = words.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(sorted);  // ["apple", "Banana", "Zebra"] - all treated equally
```

Now let's look at practical sorting examples:

```javascript
// Numeric sorting (numbers)
const numbers = [3, 1, 4, 1, 5, 9, 2];
const sorted = numbers.sort((a, b) => a - b);
console.log(sorted);  // [1, 1, 2, 3, 4, 5, 9]

// Reverse order
const descending = numbers.sort((a, b) => b - a);
console.log(descending);  // [9, 5, 4, 3, 2, 1, 1]

// String sorting (alphabetical)
const words = ["zebra", "apple", "banana"];
const sorted = words.sort();
console.log(sorted);  // ["apple", "banana", "zebra"]

// Case-insensitive
const words = ["Zebra", "apple", "Banana"];
const sorted = words.sort((a, b) => 
    a.toLowerCase().localeCompare(b.toLowerCase())
);
console.log(sorted);  // ["apple", "Banana", "Zebra"]
```

---

### 5. Sorting Objects

```javascript
// Sort by property
const students = [
    {name: "Alice", marks: 85},
    {name: "Bob", marks: 92},
    {name: "Charlie", marks: 78}
];

// Sort by marks ascending
const byMarks = students.sort((a, b) => a.marks - b.marks);
console.log(byMarks);
// [{name: "Charlie", marks: 78}, {name: "Alice", marks: 85}, {name: "Bob", marks: 92}]

// Sort by name
const byName = students.sort((a, b) => 
    a.name.localeCompare(b.name)
);
console.log(byName);
// [{name: "Alice", marks: 85}, {name: "Bob", marks: 92}, {name: "Charlie", marks: 78}]
```

---

## ✅ PRACTICAL SESSION (90 minutes)

### Experiment 20: Remove Specific Item from Array

**Objective:** Create functions to remove items from arrays

```javascript
console.log("═══════════════════════════════════════");
console.log("  EXPERIMENT 20: Remove Item from Array");
console.log("═══════════════════════════════════════\n");

// Function 1: Remove all occurrences
function removeAllOccurrences(arr, value) {
    return arr.filter(item => item !== value);
}

// Function 2: Remove first occurrence only
function removeFirstOccurrence(arr, value) {
    const index = arr.indexOf(value);
    if (index === -1) return arr;
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

// Function 3: Remove at specific index
function removeAtIndex(arr, index) {
    if (index < 0 || index >= arr.length) return arr;
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

// Function 4: Remove multiple values
function removeMultiple(arr, valuesToRemove) {
    return arr.filter(item => !valuesToRemove.includes(item));
}

// ============================================
// TEST CASES
// ============================================

console.log("📋 Test Case 1: Remove all occurrences");
console.log("─────────────────────────────────────");
const numbers1 = [1, 2, 3, 2, 4, 2, 5];
console.log("Original: " + numbers1);
console.log("Remove 2: " + removeAllOccurrences(numbers1, 2));

console.log("\n📋 Test Case 2: Remove first occurrence");
console.log("─────────────────────────────────────");
const numbers2 = [1, 2, 3, 2, 4, 2, 5];
console.log("Original: " + numbers2);
console.log("Remove first 2: " + removeFirstOccurrence(numbers2, 2));

console.log("\n📋 Test Case 3: Remove at index");
console.log("─────────────────────────────────────");
const numbers3 = [10, 20, 30, 40, 50];
console.log("Original: " + numbers3);
console.log("Remove at index 2: " + removeAtIndex(numbers3, 2));

console.log("\n📋 Test Case 4: Remove multiple values");
console.log("─────────────────────────────────────");
const numbers4 = [1, 2, 3, 4, 5, 6, 7, 8];
console.log("Original: " + numbers4);
console.log("Remove [2, 4, 6]: " + removeMultiple(numbers4, [2, 4, 6]));

console.log("\n📋 Test Case 5: With strings");
console.log("─────────────────────────────────────");
const fruits = ["apple", "banana", "apple", "cherry", "apple"];
console.log("Original: " + fruits);
console.log("Remove 'apple': " + removeAllOccurrences(fruits, "apple"));

/*
EXPECTED OUTPUT:
═══════════════════════════════════════
  EXPERIMENT 20: Remove Item from Array
═══════════════════════════════════════

📋 Test Case 1: Remove all occurrences
─────────────────────────────────────
Original: 1,2,3,2,4,2,5
Remove 2: 1,3,4,5

📋 Test Case 2: Remove first occurrence
─────────────────────────────────────
Original: 1,2,3,2,4,2,5
Remove first 2: 1,3,2,4,2,5

📋 Test Case 3: Remove at index
─────────────────────────────────────
Original: 10,20,30,40,50
Remove at index 2: 10,20,40,50

📋 Test Case 4: Remove multiple values
─────────────────────────────────────
Original: 1,2,3,4,5,6,7,8
Remove [2, 4, 6]: 1,3,5,7,8

📋 Test Case 5: With strings
─────────────────────────────────────
Original: apple,banana,apple,cherry,apple
Remove 'apple': banana,cherry
*/
```

---

## 🔬 MANDATORY PRACTICAL EXPERIMENTS

### ✅ **Experiment 20: JavaScript Program to Merge Two Arrays and Remove Duplicate Items**

**MANDATORY PRACTICAL REQUIREMENT:** Official Experiment #20 (Unit 4)

Combine two or more arrays and eliminate duplicate values.

<details>
<summary><b>Solution: Method 1 - Using Loop and Condition Check</b></summary>

```javascript
/*
 * Experiment 20: Merge Arrays and Remove Duplicates (Manual approach)
 * Combine arrays and eliminate duplicates using loop
 */

function mergeAndRemoveDuplicates(array1, array2) {
    // Create result array starting with array1
    const result = [];
    
    // Add elements from array1
    for (let i = 0; i < array1.length; i++) {
        if (!result.includes(array1[i])) {
            result.push(array1[i]);
        }
    }
    
    // Add elements from array2 if not already in result
    for (let i = 0; i < array2.length; i++) {
        if (!result.includes(array2[i])) {
            result.push(array2[i]);
        }
    }
    
    return result;
}

function mergeMultipleArrays(...arrays) {
    const result = [];
    
    // Iterate through each array
    for (let arr of arrays) {
        // Add each element if not already present
        for (let item of arr) {
            if (!result.includes(item)) {
                result.push(item);
            }
        }
    }
    
    return result;
}

// TEST CASES
console.log("--- Test Case 1: Merge two numeric arrays ---");
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const merged1 = mergeAndRemoveDuplicates(arr1, arr2);
console.log("Array 1: " + arr1);
console.log("Array 2: " + arr2);
console.log("Merged (no dupes): " + merged1);

console.log("\n--- Test Case 2: Merge string arrays ---");
const fruits1 = ["apple", "banana", "cherry"];
const fruits2 = ["banana", "date", "apple"];
const merged2 = mergeAndRemoveDuplicates(fruits1, fruits2);
console.log("Fruits 1: " + fruits1);
console.log("Fruits 2: " + fruits2);
console.log("Merged: " + merged2);

console.log("\n--- Test Case 3: Merge multiple arrays ---");
const m1 = [1, 2, 3];
const m2 = [2, 3, 4];
const m3 = [4, 5, 6];
const merged3 = mergeMultipleArrays(m1, m2, m3);
console.log("Array 1: " + m1);
console.log("Array 2: " + m2);
console.log("Array 3: " + m3);
console.log("Merged all: " + merged3);
```

</details>

<details>
<summary><b>Solution: Method 2 - Using Set with Spread Operator</b></summary>

```javascript
/*
 * Experiment 20: Merge Arrays (Using Set - Smart approach)
 * Leverages JavaScript Set for automatic duplicate handling
 */

// Method 2a: Two arrays using Set
function mergeAndRemoveDuplicates(array1, array2) {
    // Spread both arrays into a Set, which auto-removes duplicates
    return [...new Set([...array1, ...array2])];
}

// Method 2b: Multiple arrays using Set
function mergeMultipleArrays(...arrays) {
    // Flatten all arrays, convert to Set, spread back to array
    const flattened = arrays.reduce((acc, arr) => [...acc, ...arr], []);
    return [...new Set(flattened)];
}

// Method 2c: Using concat instead of spread
function mergeWithConcat(array1, array2) {
    return [...new Set(array1.concat(array2))];
}

// TEST CASES
console.log("--- Test Case 1: Merge numeric arrays ---");
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const merged1 = mergeAndRemoveDuplicates(arr1, arr2);
console.log("Array 1: " + arr1);
console.log("Array 2: " + arr2);
console.log("Merged (Set method): " + merged1);

console.log("\n--- Test Case 2: Merge string arrays ---");
const fruits1 = ["apple", "banana", "cherry"];
const fruits2 = ["banana", "date", "apple"];
const merged2 = mergeAndRemoveDuplicates(fruits1, fruits2);
console.log("Fruits 1: " + fruits1);
console.log("Fruits 2: " + fruits2);
console.log("Merged: " + merged2);

console.log("\n--- Test Case 3: Merge multiple arrays ---");
const m1 = [1, 2, 3];
const m2 = [2, 3, 4];
const m3 = [4, 5, 6];
const merged3 = mergeMultipleArrays(m1, m2, m3);
console.log("Array 1: " + m1);
console.log("Array 2: " + m2);
console.log("Array 3: " + m3);
console.log("Merged all: " + merged3);

console.log("\n--- Test Case 4: Large arrays ---");
const large1 = Array.from({length: 100}, (_, i) => i % 10);  // 0-9 repeated
const large2 = Array.from({length: 100}, (_, i) => (i + 5) % 15);  // 5-19 repeated, wrapping
const mergedLarge = mergeAndRemoveDuplicates(large1, large2);
console.log("Large array 1 length: " + large1.length);
console.log("Large array 2 length: " + large2.length);
console.log("Merged unique count: " + mergedLarge.length);
console.log("Merged unique values: " + mergedLarge.sort((a, b) => a - b));
```

</details>

**Key Learning Points:**
- Set automatically removes duplicates
- `...new Set(array)` converts Set back to array
- Method 1 teaches the logic explicitly
- Method 2 is cleaner and more efficient for large arrays
- Both preserve insertion order for duplicates

---

### Experiment 21: Merge Arrays and Remove Duplicates

**Objective:** Combine multiple arrays and eliminate duplicate values

```javascript
console.log("\n═══════════════════════════════════════");
console.log("  EXPERIMENT 21: Merge Arrays & Duplicates");
console.log("═══════════════════════════════════════\n");

// Function 1: Merge and remove duplicates (numbers)
function mergeUnique(arr1, arr2) {
    const merged = [...arr1, ...arr2];
    return [...new Set(merged)];
}

// Function 2: Merge multiple arrays and remove duplicates
function mergeMultipleUnique(...arrays) {
    const merged = arrays.reduce((acc, arr) => [...acc, ...arr], []);
    return [...new Set(merged)];
}

// Function 3: Merge strings and remove duplicates
function mergeUniqueStrings(arr1, arr2) {
    return [...new Set(arr1.concat(arr2))];
}

// Function 4: Merge objects based on property
function mergeUniqueObjects(arr1, arr2, property) {
    const merged = [...arr1, ...arr2];
    return merged.reduce((acc, obj) => {
        if (!acc.find(item => item[property] === obj[property])) {
            acc.push(obj);
        }
        return acc;
    }, []);
}

// ============================================
// TEST CASES
// ============================================

console.log("📋 Test Case 1: Merge numeric arrays");
console.log("─────────────────────────────────────");
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
console.log("Array 1: " + arr1);
console.log("Array 2: " + arr2);
console.log("Merged: " + mergeUnique(arr1, arr2));

console.log("\n📋 Test Case 2: Merge string arrays");
console.log("─────────────────────────────────────");
const fruits1 = ["apple", "banana", "cherry"];
const fruits2 = ["banana", "date", "apple"];
console.log("Fruits 1: " + fruits1);
console.log("Fruits 2: " + fruits2);
console.log("Merged: " + mergeUniqueStrings(fruits1, fruits2));

console.log("\n📋 Test Case 3: Merge multiple arrays");
console.log("─────────────────────────────────────");
const nums1 = [1, 2, 3];
const nums2 = [2, 3, 4];
const nums3 = [4, 5, 6];
console.log("Array 1: " + nums1);
console.log("Array 2: " + nums2);
console.log("Array 3: " + nums3);
console.log("Merged: " + mergeMultipleUnique(nums1, nums2, nums3));

console.log("\n📋 Test Case 4: Merge objects");
console.log("─────────────────────────────────────");
const users1 = [
    {id: 1, name: "Alice"},
    {id: 2, name: "Bob"}
];
const users2 = [
    {id: 2, name: "Bob"},
    {id: 3, name: "Charlie"}
];
console.log("Users 1:", users1);
console.log("Users 2:", users2);
const merged = mergeUniqueObjects(users1, users2, "id");
console.log("Merged (unique by id):", merged);

/*
EXPECTED OUTPUT:
═══════════════════════════════════════
  EXPERIMENT 21: Merge Arrays & Duplicates
═══════════════════════════════════════

📋 Test Case 1: Merge numeric arrays
─────────────────────────────────────
Array 1: 1,2,3,4
Array 2: 3,4,5,6
Merged: 1,2,3,4,5,6

📋 Test Case 2: Merge string arrays
─────────────────────────────────────
Fruits 1: apple,banana,cherry
Fruits 2: banana,date,apple
Merged: apple,banana,cherry,date

📋 Test Case 3: Merge multiple arrays
─────────────────────────────────────
Array 1: 1,2,3
Array 2: 2,3,4
Array 3: 4,5,6
Merged: 1,2,3,4,5,6

📋 Test Case 4: Merge objects
─────────────────────────────────────
Users 1: [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]
Users 2: [{id: 2, name: "Bob"}, {id: 3, name: "Charlie"}]
Merged (unique by id): [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}, {id: 3, name: "Charlie"}]
*/
```

---

### Experiment 22: Sort Array of Objects by Property Values

**Objective:** Sort complex data structures by different criteria

```javascript
console.log("\n═══════════════════════════════════════");
console.log("  EXPERIMENT 22: Sort Objects");
console.log("═══════════════════════════════════════\n");

// Function 1: Sort by numeric property
function sortByNumberic(arr, property, ascending = true) {
    const sorted = [...arr].sort((a, b) => 
        ascending ? a[property] - b[property] : b[property] - a[property]
    );
    return sorted;
}

// Function 2: Sort by string property
function sortByString(arr, property, ascending = true) {
    const sorted = [...arr].sort((a, b) => {
        const comparison = a[property].localeCompare(b[property]);
        return ascending ? comparison : -comparison;
    });
    return sorted;
}

// Function 3: Sort by multiple properties
function sortByMultiple(arr, sortFunctions) {
    return [...arr].sort((a, b) => {
        for (let sortFn of sortFunctions) {
            const result = sortFn(a, b);
            if (result !== 0) return result;
        }
        return 0;
    });
}

// ============================================
// TEST CASES
// ============================================

const students = [
    {name: "Alice", marks: 85, grade: "B"},
    {name: "Bob", marks: 92, grade: "A"},
    {name: "Charlie", marks: 78, grade: "C"},
    {name: "Diana", marks: 92, grade: "A"},
    {name: "Eve", marks: 88, grade: "B"}
];

console.log("📋 Original Data:");
console.log("─────────────────────────────────────");
console.log("Students: ", students);

console.log("\n📋 Test Case 1: Sort by marks (ascending)");
console.log("─────────────────────────────────────");
const byMarksAsc = sortByNumberic(students, "marks", true);
byMarksAsc.forEach(s => 
    console.log("  " + s.name + " - " + s.marks)
);

console.log("\n📋 Test Case 2: Sort by marks (descending)");
console.log("─────────────────────────────────────");
const byMarksDesc = sortByNumberic(students, "marks", false);
byMarksDesc.forEach(s => 
    console.log("  " + s.name + " - " + s.marks)
);

console.log("\n📋 Test Case 3: Sort by name");
console.log("─────────────────────────────────────");
const byName = sortByString(students, "name", true);
byName.forEach(s => 
    console.log("  " + s.name)
);

console.log("\n📋 Test Case 4: Sort by grade, then by name");
console.log("─────────────────────────────────────");
const byGradeThenName = sortByMultiple(students, [
    (a, b) => a.grade.localeCompare(b.grade),
    (a, b) => a.name.localeCompare(b.name)
]);
byGradeThenName.forEach(s => 
    console.log("  " + s.grade + " - " + s.name)
);

console.log("\n📋 Test Case 5: Complex sorting");
console.log("─────────────────────────────────────");
const products = [
    {name: "Laptop", price: 50000, rating: 4.5},
    {name: "Phone", price: 30000, rating: 4.8},
    {name: "Tablet", price: 20000, rating: 4.2},
    {name: "Monitor", price: 15000, rating: 4.6}
];

// Sort by rating (descending)
const byRating = [...products].sort((a, b) => b.rating - a.rating);
console.log("By rating (high to low):");
byRating.forEach(p => 
    console.log("  " + p.name + " - Rating: " + p.rating)
);

/*
EXPECTED OUTPUT:
═══════════════════════════════════════
  EXPERIMENT 22: Sort Objects
═══════════════════════════════════════

📋 Original Data:
─────────────────────────────────────
Students: [
  {name: "Alice", marks: 85, ...},
  {name: "Bob", marks: 92, ...},
  ...
]

📋 Test Case 1: Sort by marks (ascending)
─────────────────────────────────────
  Charlie - 78
  Alice - 85
  Eve - 88
  Bob - 92
  Diana - 92

📋 Test Case 2: Sort by marks (descending)
─────────────────────────────────────
  Bob - 92
  Diana - 92
  Eve - 88
  Alice - 85
  Charlie - 78

📋 Test Case 3: Sort by name
─────────────────────────────────────
  Alice
  Bob
  Charlie
  Diana
  Eve

📋 Test Case 4: Sort by grade, then by name
─────────────────────────────────────
  A - Bob
  A - Diana
  B - Alice
  B - Eve
  C - Charlie

📋 Test Case 5: Complex sorting
─────────────────────────────────────
By rating (high to low):
  Phone - Rating: 4.8
  Laptop - Rating: 4.5
  Monitor - Rating: 4.6
  Tablet - Rating: 4.2
*/
```

---

## 🔬 MANDATORY PRACTICAL EXPERIMENTS

### ✅ **Experiment 21: JavaScript Program to Sort Array of Objects by Property Values**

**MANDATORY PRACTICAL REQUIREMENT:** Official Experiment #21 (Unit 4)

Sort an array of objects based on a specific property (numeric or alphabetical).

<details>
<summary><b>Solution: Method 1 - Manual Comparison Function</b></summary>

```javascript
/*
 * Experiment 21: Sort Array of Objects (Manual comparator)
 * Sort objects by numeric or string properties
 */

function sortByNumericProperty(array, property, ascending = true) {
    // Create copy to avoid modifying original
    const sorted = [];
    for (let i = 0; i < array.length; i++) {
        sorted.push(array[i]);
    }
    
    // Manual bubble sort implementation
    for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = 0; j < sorted.length - i - 1; j++) {
            const shouldSwap = ascending 
                ? sorted[j][property] > sorted[j + 1][property]
                : sorted[j][property] < sorted[j + 1][property];
            
            if (shouldSwap) {
                // Swap elements
                const temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
            }
        }
    }
    
    return sorted;
}

function sortByStringProperty(array, property, ascending = true) {
    const sorted = array.slice();  // Copy array
    
    // Custom bubble sort for strings
    for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = 0; j < sorted.length - i - 1; j++) {
            const comparison = sorted[j][property].localeCompare(sorted[j + 1][property]);
            const shouldSwap = ascending ? comparison > 0 : comparison < 0;
            
            if (shouldSwap) {
                const temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
            }
        }
    }
    
    return sorted;
}

// TEST CASES
const students = [
    {name: "Alice", marks: 85, grade: "B"},
    {name: "Bob", marks: 92, grade: "A"},
    {name: "Charlie", marks: 78, grade: "C"},
    {name: "Diana", marks: 92, grade: "A"},
    {name: "Eve", marks: 88, grade: "B"}
];

console.log("--- Test Case 1: Sort by marks (ascending) ---");
const byMarksAsc = sortByNumericProperty(students, "marks", true);
byMarksAsc.forEach(s => console.log("  " + s.name + " - " + s.marks));

console.log("\n--- Test Case 2: Sort by marks (descending) ---");
const byMarksDesc = sortByNumericProperty(students, "marks", false);
byMarksDesc.forEach(s => console.log("  " + s.name + " - " + s.marks));

console.log("\n--- Test Case 3: Sort by name ---");
const byName = sortByStringProperty(students, "name", true);
byName.forEach(s => console.log("  " + s.name));

console.log("\n--- Original array unchanged ---");
console.log("First student: " + students[0].name + " (" + students[0].marks + ")");
```

</details>

<details>
<summary><b>Solution: Method 2 - Using JavaScript's sort() with Comparators</b></summary>

```javascript
/*
 * Experiment 21: Sort Array of Objects (Using .sort() - Smart approach)
 * Leveraging JavaScript's built-in sort method
 */

// Method 2a: Sort by numeric property
function sortByNumericProperty(array, property, ascending = true) {
    return [...array].sort((a, b) => {
        if (ascending) {
            return a[property] - b[property];
        } else {
            return b[property] - a[property];
        }
    });
}

// Method 2b: Sort by string property
function sortByStringProperty(array, property, ascending = true) {
    return [...array].sort((a, b) => {
        const comparison = a[property].localeCompare(b[property]);
        return ascending ? comparison : -comparison;
    });
}

// Method 2c: Sort by multiple properties
function sortByMultiple(array, sortRules) {
    return [...array].sort((a, b) => {
        for (let rule of sortRules) {
            const comparison = rule.property ? 
                (a[rule.property] < b[rule.property] ? -1 : 
                 a[rule.property] > b[rule.property] ? 1 : 0) : 0;
            
            if (comparison !== 0) {
                return rule.ascending ? comparison : -comparison;
            }
        }
        return 0;
    });
}

// TEST CASES
const students = [
    {name: "Alice", marks: 85, grade: "B"},
    {name: "Bob", marks: 92, grade: "A"},
    {name: "Charlie", marks: 78, grade: "C"},
    {name: "Diana", marks: 92, grade: "A"},
    {name: "Eve", marks: 88, grade: "B"}
];

console.log("--- Test Case 1: Sort by marks (ascending) ---");
const byMarksAsc = sortByNumericProperty(students, "marks", true);
byMarksAsc.forEach(s => console.log("  " + s.name + " - " + s.marks));

console.log("\n--- Test Case 2: Sort by marks (descending) ---");
const byMarksDesc = sortByNumericProperty(students, "marks", false);
byMarksDesc.forEach(s => console.log("  " + s.name + " - " + s.marks));

console.log("\n--- Test Case 3: Sort by name ---");
const byName = sortByStringProperty(students, "name", true);
byName.forEach(s => console.log("  " + s.name));

console.log("\n--- Test Case 4: Sort by grade then by marks ---");
const byGrandThenMarks = sortByMultiple(students, [
    {property: "grade", ascending: true},
    {property: "marks", ascending: false}
]);
console.log("Sorted by Grade (A-Z), then Marks (High-Low):");
byGrandThenMarks.forEach(s => console.log("  " + s.grade + " - " + s.name + " (" + s.marks + ")"));

console.log("\n--- Original array unchanged ---");
console.log("First student: " + students[0].name + " (" + students[0].marks + ")");
```

</details>

**Key Learning Points:**
- Method 1 shows the underlying algorithm (bubble sort)
- Method 2 uses JavaScript's optimized built-in sort
- Numeric comparison: `a - b` (ascending), `b - a` (descending)
- String comparison: `localeCompare()` for proper alphabetical sorting
- Spread operator `[...array]` prevents modifying the original array

---

## 🎯 Experiments Summary

✅ **Experiment 20:** Remove items from arrays using filter
✅ **Experiment 21:** Merge arrays and eliminate duplicates

---

## 📚 Key Concepts

| Operation | Method | Destructive? | Use Case |
|-----------|--------|-------------|----------|
| Remove items | filter() | No | Remove based on condition |
| Merge | concat(), spread | No | Combine arrays |
| Unique | Set, filter() | No | Remove duplicates |
| Sort | sort() | Yes | Order elements |

---

## 🔍 Common Pitfalls

```javascript
// ❌ sort() modifies original array!
const numbers = [3, 1, 4];
const sorted = numbers.sort((a, b) => a - b);
console.log(numbers);  // [1, 3, 4] - modified!

// ✅ Create a copy first
const sorted = [...numbers].sort((a, b) => a - b);

// ❌ String comparison for numbers
const numbers = [1, 20, 3, 100];
numbers.sort();  // [1, 100, 20, 3] - wrong!

// ✅ Use numeric comparison
numbers.sort((a, b) => a - b);  // [1, 3, 20, 100]
```

---

**File:** `Curriculum/Week-4/Day4-Advanced-Array-Operations-Experiments20-22.md`  
**Status:** Complete ✅  
**Last Updated:** February 2026

---

## ✅ Experiments 20-22 Complete!

- [x] Experiment 20: Remove Specific Item from Array ✅
- [x] Experiment 21: Merge Arrays and Remove Duplicates ✅
- [x] Experiment 22: Sort Array of Objects ✅

---

## 📋 Week 4 Progress

- [x] Day 1: map() ✅
- [x] Day 2: filter() and reduce() ✅
- [x] Day 3: Dates and Timers (Exp 17-19) ✅
- [x] Day 4: Advanced Array Operations (Exp 20-22) ✅
- [ ] Day 5: Week 4 Integration Project
