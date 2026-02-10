# Week 5, Day 3: File Operations and Type Checking (Experiments 23-24)

**Duration:** 180 minutes (90 min theory + 90 min practical)  
**Date:** March 5, 2026  
**Learning Outcome:** Master file operations and type checking - the final two experiments

---

## 📚 THEORY SESSION (90 minutes)

### 1. File Extension Operations

Files have extensions that tell us the type of file:
- `.txt` - Text file
- `.jpg`, `.png` - Image files
- `.pdf` - Document
- `.js` - JavaScript file

```javascript
// Getting file extension
const filename = "document.pdf";
const parts = filename.split(".");
const extension = parts[parts.length - 1];
console.log(extension);  // "pdf"

// More efficient way
function getFileExtension(filename) {
    return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
}

console.log(getFileExtension("image.JPG"));     // "jpg"
console.log(getFileExtension("data.csv"));      // "csv"
console.log(getFileExtension("archive.tar.gz"));// "gz" (only gets last)
```

---

### 2. File Type Detection

```javascript
function getFileType(filename) {
    const ext = getFileExtension(filename);
    
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const documentExtensions = ["pdf", "doc", "docx", "xls", "xlsx"];
    const codeExtensions = ["js", "py", "java", "cpp", "html"];
    const videoExtensions = ["mp4", "avi", "mkv", "mov"];
    
    if (imageExtensions.includes(ext)) return "image";
    if (documentExtensions.includes(ext)) return "document";
    if (codeExtensions.includes(ext)) return "code";
    if (videoExtensions.includes(ext)) return "video";
    return "unknown";
}

console.log(getFileType("photo.jpg"));      // "image"
console.log(getFileType("script.js"));      // "code"
console.log(getFileType("report.pdf"));     // "document"
```

---

### 3. Type Checking and undefined/null

JavaScript has several ways to check types:

```javascript
// typeof operator
console.log(typeof 42);           // "number"
console.log(typeof "hello");      // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (quirk!)
console.log(typeof [1, 2, 3]);    // "object"

// instanceof operator
console.log([] instanceof Array);  // true
console.log({} instanceof Object); // true

// Checking for undefined/null
let x;
console.log(x === undefined);     // true (no value assigned)
console.log(x === null);          // false (explicitly set to null)

// Nullish coalescing
const name = null ?? "Guest";
console.log(name);                // "Guest"

const count = 0 ?? 10;
console.log(count);               // 0 (0 is not nullish)
```

---

### 4. Safe Property Access

```javascript
// Accessing nested properties can throw errors
const user = { name: "Alice", address: { city: "NY" } };

// Unsafe
console.log(user.address.country);  // undefined

// Safe with optional chaining
console.log(user.address?.country); // undefined (no error)

// Default values
function getCity(user) {
    return user?.address?.city ?? "Unknown";
}

console.log(getCity(user));         // "NY"
console.log(getCity(null));         // "Unknown"
```

---

## ✅ PRACTICAL SESSION (90 minutes)

### Experiment 23: Get File Extension

**Objective:** Extract and analyze file extensions

```javascript
console.log("═══════════════════════════════════════");
console.log("    EXPERIMENT 23: Get File Extension");
console.log("═══════════════════════════════════════\n");

// Utility functions
function getFileExtension(filename) {
    if (!filename || typeof filename !== 'string') {
        return "invalid";
    }
    
    const lastDot = filename.lastIndexOf(".");
    if (lastDot === -1) return "no extension";
    
    return filename.substring(lastDot + 1).toLowerCase();
}

function getFileName(filename) {
    const lastDot = filename.lastIndexOf(".");
    return lastDot === -1 ? filename : filename.substring(0, lastDot);
}

function getFileType(filename) {
    const ext = getFileExtension(filename);
    
    const types = {
        "jpg": "Image", "jpeg": "Image", "png": "Image", "gif": "Image", "bmp": "Image",
        "pdf": "Document", "doc": "Document", "docx": "Document", "xls": "Spreadsheet",
        "js": "Code", "py": "Code", "java": "Code", "html": "Code", "css": "Code",
        "mp4": "Video", "avi": "Video", "mkv": "Video", "mov": "Video",
        "mp3": "Audio", "wav": "Audio", "flac": "Audio",
        "zip": "Archive", "rar": "Archive", "gz": "Archive", "7z": "Archive",
        "txt": "Text", "md": "Text", "json": "Text"
    };
    
    return types[ext] || "Unknown";
}

// ============================================
// TEST CASES
// ============================================

console.log("📋 Test Case 1: Simple Extensions");
console.log("─────────────────────────────────────");
const files1 = ["document.pdf", "image.jpg", "script.js", "data.csv"];

for (let file of files1) {
    const ext = getFileExtension(file);
    const type = getFileType(file);
    console.log(file + " → ." + ext + " (" + type + ")");
}

console.log("\n📋 Test Case 2: Case Insensitive");
console.log("─────────────────────────────────────");
const files2 = ["photo.JPG", "Document.PDF", "code.JS"];

for (let file of files2) {
    const ext = getFileExtension(file);
    console.log(file + " → ." + ext);
}

console.log("\n📋 Test Case 3: No Extension");
console.log("─────────────────────────────────────");
const files3 = ["README", "Makefile", "LICENSE"];

for (let file of files3) {
    const ext = getFileExtension(file);
    console.log(file + " → " + ext);
}

console.log("\n📋 Test Case 4: Double Endings");
console.log("─────────────────────────────────────");
const files4 = ["archive.tar.gz", "backup.tar.bz2", "image.tar"];

for (let file of files4) {
    const ext = getFileExtension(file);
    const name = getFileName(file);
    console.log(file + " → Name: " + name + ", Ext: ." + ext);
}

console.log("\n📋 Test Case 5: File Classification");
console.log("─────────────────────────────────────");
const files5 = [
    "photo.png", "data.xlsx", "movie.mp4", "song.mp3",
    "backup.zip", "message.txt", "app.js"
];

const filesByType = {};

for (let file of files5) {
    const type = getFileType(file);
    if (!filesByType[type]) {
        filesByType[type] = [];
    }
    filesByType[type].push(file);
}

for (let type in filesByType) {
    console.log(type + ": " + filesByType[type].join(", "));
}

console.log("\n✅ Experiment 23 Complete!");
```

---

### Experiment 24: Check undefined or null

**Objective:** Comprehensive type checking and validation

```javascript
console.log("\n═══════════════════════════════════════");
console.log("  EXPERIMENT 24: Check undefined/null");
console.log("═══════════════════════════════════════\n");

// Utility functions
function isUndefined(value) {
    return value === undefined;
}

function isNull(value) {
    return value === null;
}

function isNullish(value) {
    return value === null || value === undefined;
}

function isValid(value) {
    return value !== null && value !== undefined;
}

function isEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === "";
    if (typeof value === 'number') return false;  // 0 is valid
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
}

function getValueOrDefault(value, defaultValue) {
    return isNullish(value) ? defaultValue : value;
}

// ============================================
// TEST CASES
// ============================================

console.log("📋 Test Case 1: Type Checks");
console.log("─────────────────────────────────────");

const testValues = [
    undefined, null, 0, "", "hello", false, true, [], {}
];

for (let val of testValues) {
    const display = val === undefined ? "undefined" : 
                   val === null ? "null" : 
                   JSON.stringify(val);
    
    console.log(
        display + 
        " | isUndefined: " + isUndefined(val) +
        " | isNull: " + isNull(val) +
        " | isValid: " + isValid(val)
    );
}

console.log("\n📋 Test Case 2: Empty Check");
console.log("─────────────────────────────────────");

const testEmpty = [
    undefined, null, "", "  ", 0, [], {}, [1], {a: 1}
];

for (let val of testEmpty) {
    const display = typeof val === 'string' ? 
                   '"' + val + '"' : 
                   JSON.stringify(val);
    
    console.log(display + " → isEmpty: " + isEmpty(val));
}

console.log("\n📋 Test Case 3: Default Values");
console.log("─────────────────────────────────────");

const values = [undefined, null, "Alice", 0, ""];

for (let val of values) {
    const result = getValueOrDefault(val, "default");
    console.log(
        (val === undefined ? "undefined" : val === null ? "null" : val) + 
        " → " + result
    );
}

console.log("\n📋 Test Case 4: API Response Handling");
console.log("─────────────────────────────────────");

function handleUserData(userData) {
    if (!userData) {
        return "No user data provided";
    }
    
    const name = getValueOrDefault(userData.name, "Anonymous");
    const email = userData.email || "No email";
    const age = userData.age ?? "Not specified";
    
    return name + " (" + email + ") - Age: " + age;
}

const responses = [
    undefined,
    null,
    { name: "Alice", email: "alice@example.com", age: 25 },
    { name: "Bob", email: null },
    { name: null, email: "test@example.com" }
];

for (let response of responses) {
    console.log("Input: " + JSON.stringify(response));
    console.log("Output: " + handleUserData(response));
    console.log();
}

console.log("\n📋 Test Case 5: Form Validation");
console.log("─────────────────────────────────────");

function validateForm(formData) {
    const errors = [];
    
    if (isEmpty(formData.username)) {
        errors.push("Username is required");
    }
    
    if (isEmpty(formData.email)) {
        errors.push("Email is required");
    }
    
    if (isEmpty(formData.password)) {
        errors.push("Password is required");
    } else if (formData.password.length < 6) {
        errors.push("Password must be at least 6 characters");
    }
    
    if (!isValid(formData.age)) {
        errors.push("Age is required");
    } else if (formData.age < 18) {
        errors.push("Must be 18 or older");
    }
    
    return errors;
}

const forms = [
    {},
    { username: "alice", email: "alice@ex.com", password: "123", age: 25 },
    { username: "bob", email: null, password: "password123", age: 30 },
    { username: "", email: "test@ex.com", password: "password123", age: 16 }
];

for (let form of forms) {
    const errors = validateForm(form);
    
    console.log("Form: " + JSON.stringify(form));
    if (errors.length === 0) {
        console.log("✓ Valid");
    } else {
        console.log("✗ Errors:");
        for (let error of errors) {
            console.log("  - " + error);
        }
    }
    console.log();
}

console.log("✅ Experiment 24 Complete!");

/*
EXPECTED OUTPUT:
═══════════════════════════════════════
  EXPERIMENT 24: Check undefined/null
═══════════════════════════════════════

📋 Test Case 1: Type Checks
─────────────────────────────────────
undefined | isUndefined: true | isNull: false | isValid: false
null | isUndefined: false | isNull: true | isValid: false
0 | isUndefined: false | isNull: false | isValid: true
... [more cases]

📋 Test Case 2: Empty Check
─────────────────────────────────────
undefined → isEmpty: true
null → isEmpty: true
"" → isEmpty: true
"  " → isEmpty: true
[List of all values...]

... [additional test cases] ...

✅ Experiment 24 Complete!
*/
```

---

## 🔬 MANDATORY PRACTICAL EXPERIMENTS

### ✅ **Experiment 22: JavaScript Program to Get File Extension**

**MANDATORY PRACTICAL REQUIREMENT:** Official Experiment #22 (Unit 5)

Extract and identify file extensions from filenames to determine file type.

<details>
<summary><b>Solution: Method 1 - Using split() and Array Index</b></summary>

```javascript
/*
 * Experiment 22: Get File Extension (Manual string manipulation)
 * Extract file extension and categorize files
 */

function getFileExtension(filename) {
    // Split by dot and get the last part
    const parts = filename.split(".");
    
    if (parts.length < 2) {
        return "";  // No extension found
    }
    
    // Get last element and convert to lowercase
    return parts[parts.length - 1].toLowerCase();
}

function getFileType(filename) {
    const ext = getFileExtension(filename);
    
    // Categorize by extension
    if (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "gif" || ext === "bmp") {
        return "Image";
    } else if (ext === "pdf" || ext === "doc" || ext === "docx" || ext === "xls" || ext === "xlsx") {
        return "Document";
    } else if (ext === "js" || ext === "py" || ext === "java" || ext === "cpp" || ext === "html") {
        return "Code";
    } else if (ext === "mp4" || ext === "avi" || ext === "mkv" || ext === "mov") {
        return "Video";
    } else if (ext === "mp3" || ext === "wav" || ext === "flac" || ext === "m4a") {
        return "Audio";
    } else {
        return "Unknown";
    }
}

function getFileInfo(filename) {
    const extension = getFileExtension(filename);
    const type = getFileType(filename);
    
    return {
        filename: filename,
        extension: extension,
        type: type
    };
}

// TEST CASES
console.log("--- Test Case 1: Image files ---");
const files1 = ["photo.jpg", "picture.PNG", "diagram.gif"];
files1.forEach(f => {
    const info = getFileInfo(f);
    console.log("File: " + info.filename + " | Ext: " + info.extension + " | Type: " + info.type);
});

console.log("\n--- Test Case 2: Document files ---");
const files2 = ["report.pdf", "Resume.DOCX", "data.xlsx"];
files2.forEach(f => {
    const info = getFileInfo(f);
    console.log("File: " + info.filename + " | Ext: " + info.extension + " | Type: " + info.type);
});

console.log("\n--- Test Case 3: Code files ---");
const files3 = ["script.js", "program.py", "webpage.html"];
files3.forEach(f => {
    const info = getFileInfo(f);
    console.log("File: " + info.filename + " | Ext: " + info.extension + " | Type: " + info.type);
});

console.log("\n--- Test Case 4: Files with no extension ---");
console.log("Makefile extension: '" + getFileExtension("Makefile") + "'");
console.log("README extension: '" + getFileExtension("README") + "'");

console.log("\n--- Test Case 5: Files with multiple dots ---");
console.log("archive.tar.gz extension: '" + getFileExtension("archive.tar.gz") + "'");
console.log("backup.old.zip extension: '" + getFileExtension("backup.old.zip") + "'");
```

</details>

<details>
<summary><b>Solution: Method 2 - Using lastIndexOf() with substring()</b></summary>

```javascript
/*
 * Experiment 22: Get File Extension (Using lastIndexOf - Smart approach)
 * More efficient extraction of file extensions
 */

function getFileExtension(filename) {
    // Find last dot position
    const lastDotIndex = filename.lastIndexOf(".");
    
    // If no dot found, return empty string
    if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
        return "";
    }
    
    // Extract from after the last dot
    return filename.substring(lastDotIndex + 1).toLowerCase();
}

// With Optional Chaining and modern approach
function getFileTypeModern(filename) {
    const ext = getFileExtension(filename);
    
    const typeMap = {
        jpg: "Image", jpeg: "Image", png: "Image", gif: "Image", bmp: "Image",
        pdf: "Document", doc: "Document", docx: "Document", xls: "Document", xlsx: "Document",
        js: "Code", py: "Code", java: "Code", cpp: "Code", html: "Code",
        mp4: "Video", avi: "Video", mkv: "Video", mov: "Video",
        mp3: "Audio", wav: "Audio", flac: "Audio", m4a: "Audio"
    };
    
    return typeMap[ext] || "Unknown";
}

function getFileInfoModern(filename) {
    return {
        filename: filename,
        extension: getFileExtension(filename),
        type: getFileTypeModern(filename),
        name: filename.substring(0, filename.lastIndexOf(".") || filename.length)
    };
}

// TEST CASES
console.log("--- Test Case 1: Various file types ---");
const testFiles = [
    "photo.jpg",
    "resume.DOCX",
    "script.js",
    "video.mp4",
    "music.mp3",
    "archive.tar.gz",
    "Makefile",
    "README.md"
];

testFiles.forEach(f => {
    const info = getFileInfoModern(f);
    console.log("File: " + info.filename + 
                " | Ext: '" + info.extension + "'" + 
                " | Type: " + info.type);
});

console.log("\n--- Test Case 2: Edge cases ---");
console.log("Hidden file (.bashrc): ext='" + getFileExtension(".bashrc") + "'");
console.log("Dot at end (file.): ext='" + getFileExtension("file.") + "'");
console.log("Multi-dot (data.backup.sql): ext='" + getFileExtension("data.backup.sql") + "'");
```

</details>

**Key Learning Points:**
- Use `split()` with array access to extract extension (Method 1)
- Use `lastIndexOf()` to find last occurrence more efficiently (Method 2)
- Case-insensitive comparison important for consistency
- Handle edge cases: no extension, multiple dots, hidden files
- Object/Map useful for extension-type mapping

---

## 🎯 Experiments Summary

✅ **Experiment 22:** Extract and categorize file extensions

---

## 📚 Key Functions Created

| Function | Purpose | Example |
|----------|---------|---------|
| `getFileExtension()` | Extract file type | `"file.pdf"` → `"pdf"` |
| `getFileType()` | Classify file | `"photo.jpg"` → `"Image"` |
| `isUndefined()` | Check undefined | `undefined` → `true` |
| `isNull()` | Check null | `null` → `true` |
| `isEmpty()` | Check empty values | `""` → `true` |
| `getValueOrDefault()` | Provide fallback | `null, "default"` → `"default"` |

---

## ✅ All 24 Experiments Complete!

- [x] Week 1 Experiments: 1-7 ✅
- [x] Week 2 Experiments: 8-12 ✅
- [x] Week 3 Experiments: 13-16 ✅
- [x] Week 4 Experiments: 17-22 ✅
- [x] Week 5 Experiments: 23-24 ✅

**Status:** 24/24 Experiments Complete! 🎉

---

**File:** `Curriculum/Week-5/Day3-File-Operations-Experiments23-24.md`  
**Status:** Complete ✅  
**Last Updated:** March 2026

---

## 📋 Week 5 Progress

- [x] Day 1: OOP Fundamentals ✅
- [x] Day 2: Inheritance and Polymorphism ✅
- [x] Day 3: Experiments 23-24 ✅
- [ ] Day 4: File Manager Project
- [ ] Day 5: Type Validator & Final Integration

