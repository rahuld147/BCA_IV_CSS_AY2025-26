// Advance Array operations using Higher-Order Functions

// 1. Removing Elements from Arrays

// Method 1: Using filter() - non-destructive method
const numbers = [1, 5, 9, 3, 8, 34, 87, 54];
const remove = 8;
const without8 = numbers.filter( n => n !== remove );
console.log("Array: ", numbers);
console.log(`Without ${remove}, Array: ${without8}`);

// Method 2: splice() - destructive method - Remove value at index: 5
const arr = [1, 5, 9, 3, 8, 34, 87, 54];
console.log(`Array before removal: ${arr}`);
// arr.splice(5, 1);
console.log(`Removing: ${arr.splice(5, 2)} from array`)
console.log(`Array after removal: ${arr}`);

// Method 3: Remove by value
function removeByValue(arr, value){
    return arr.filter( item => item != value );
}
const fruits = ['cherry', 'apple', 'tomato', 'chilli', 'banana'];
const fruitArr = removeByValue(fruits, 'chilli');
console.log("Original array: ", fruits);
console.log("After removing: chilli ", fruitArr);

// Method 4: Remove first occurrence using slice() method
function removeFirstOccurrence(arr, val){
    const index = arr.indexOf(val);
    if(index > -1) {
        return [...arr.slice(0, index), ...arr.slice(index +1)];
    }
    return arr;
}
const fruits2 = ['cherry', 'banana', 'apple', 'tomato', 'chilli', 'banana'];
console.log("Array before removal of first occurence of 'banana' :", fruits2);
console.log("Array after removal:");
console.log(removeFirstOccurrence(fruits2, "banana"));

// 2. Merging Arrays
const arr1 = [ 67, 45, 23];
const arr2 = [ 53, 75, 26];
// Method 1: using concat()
const merged = arr1.concat(arr2);
console.log("Array 1: ", arr1);
console.log("Array 2: ", arr2);
console.log("Merged Array: ", merged);

// Method 2: spread operator
const merged2 = [...arr1, ...arr2];
console.log("Merged Array using Spread Operator: ", merged2);

// Method 3: Merging multiple Arrays
const merged3 = [...arr1, ...arr2, ...[86, 55, 9, 5]];
console.log("Merged Multiple Arrays: ", merged3);

// 3. Removing Duplicates
const nums = [7, 9, 1, 2, 3, 3, 4, 5, 6, 7, 7, 6, 8, 3, 2, 9]
// Method 1: Using Set
const uniqueSet = new Set(nums);
const uniqueArr = [...uniqueSet];
console.log("Original Array: ", nums);
console.log("Array with only Unique Values: ", uniqueArr);
// Combining the above two lines into one line...
const unique = [...new Set(nums)];
console.log("Unique Values: ", unique);

// Method 2: Using filter()
const unq = nums.filter((num, idx) => nums.indexOf(num) === idx );
console.log("Removed Duplicates using filter() :");
console.log(unq);

// Method 3: Using reduce()
const uniqueUsingReduce = nums.reduce( ( acc, num) => {
    if(!acc.includes(num)){
        acc.push(num);
    }
    return acc;
 }, []);
console.log("Original Array: ", nums);
console.log("Array containig unique values (created using reduce(): ");
console.log(uniqueUsingReduce);
// 4. Sorting Arrays
// Numeric sorting (arrays)
const numArr = [ 54, 4, 7, 3, 87, 2, 67, 9 ];
console.log("Unsorted Numeric Array: ", numArr);
const sortedNumArr = [...numArr].sort((a, b) => a - b);
console.log("Unsorted Numeric Array: ", numArr);
console.log("Numeric Array after sorting in Ascending Order: ", sortedNumArr);
// sortedNumArr.push(90);
console.log("Asc: ", sortedNumArr);

// Reverse order sorting
const sortedNumArrInDesc = [...numArr].sort((a,b) => b - a);
console.log("Numeric Array after sorting in Descending Order: ", sortedNumArrInDesc);
console.log("Desc: ", sortedNumArrInDesc);

// String sorting (alphabetical)
const words = ["potato", "Zebra", "cow", "apple", "Cow", "banana", "FISH"];
console.log("Words before sorting:", words);
const sortedWords = [...words].sort();
const sortedWordsDesc = [...words].sort().reverse();
console.log("Sorted Words in Asc:", sortedWords);
console.log("Sorted Words in Desc:", sortedWordsDesc);

// Case-insensitive sorting
const sortedWordsLC = words.sort((a,b) => a.localeCompare(b));
console.log("Sorted Words using localeCompare() :", sortedWordsLC);
const ciSortedWords = words.sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log("case-insensitive Sorted Words:", ciSortedWords);

// 5. Sorting Objects
const students = [
    {name: "Rajat", marks: 78},
    {name: "Sanjay", marks: 64},
    {name: "Priya", marks: 89},
    {name: "Akash", marks: 75},
];
// Sort by property:
// Sort in ascending order (numbers)
const byMarks = students.sort((a,b) => b.marks - a.marks);
console.log("Sorted object by marks: ",byMarks);
// Sort by name
const byName = students.sort((a,b) => a.name.localeCompare(b.name));
console.log("Sorted object by name: ",byName);