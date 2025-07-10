# Strings and Arrays - DSA Patterns

Understanding string and array patterns is crucial for cracking coding interviews and mastering data structures and algorithms (DSA).

## Key Concepts

* **Array Types**: 1D, 2D, dynamic arrays
* **String Types**: Mutable, Immutable, Character arrays
* **Indexing & Traversal**: Forward, backward, sliding window
* **Time & Space Complexity**: Know trade-offs for each pattern

## Important Patterns

### 1. **Two Pointer Technique**

* Used for problems like reversing arrays, removing duplicates, or detecting palindromes.
* Moves from both ends toward the center or vice versa.

### 2. **Sliding Window**

* Dynamic window that adjusts size/position while scanning the array/string.
* Used for substring problems, max sum subarrays, etc.

### 3. **Prefix Sum / Suffix Sum**

* Precomputes cumulative sums for quick range queries or optimizations.

### 4. **Hashing / Frequency Counting**

* Maps characters or values to counts for quick lookup.
* Useful in anagram detection, duplicates, majority elements.

### 5. **Stack-Based Parsing**

* Used in problems involving matching brackets, removing adjacent duplicates, and decoding strings.

### 6. **Binary Search on Arrays**

* Classic for sorted arrays, also used on answer ranges in advanced problems.

### 7. **In-Place Modification**

* Requires careful element shifting with minimal extra space.

### 8. **Reversal Algorithms**

* For rotating arrays, reversing words in a string, etc.

## Formula Shortcuts & Tips

* Reversing string: `str.split('').reverse().join('')`
* Find middle of array: `Math.floor((start + end)/2)`
* For palindrome: check if `str[i] == str[n-1-i]`
* Substring of string in JS: `str.substring(start, end)`

## Examples

**1. Reverse a String**

* **Question**: Reverse the string "hello world"
* **Solution**:

```js
let str = "hello world";
let reversed = str.split('').reverse().join('');
console.log(reversed); // Output: "dlrow olleh"
```

**2. Check Palindrome**

* **Question**: Is "madam" a palindrome?
* **Solution**:

```js
function isPalindrome(str) {
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++; right--;
  }
  return true;
}
```

**3. Max Sum Subarray (Kadane's Algorithm)**

* **Question**: Find max sum subarray of \[1, -3, 2, 1, -1]
* **Solution**:

```js
function maxSubArray(arr) {
  let maxSoFar = arr[0], currMax = arr[0];
  for (let i = 1; i < arr.length; i++) {
    currMax = Math.max(arr[i], currMax + arr[i]);
    maxSoFar = Math.max(maxSoFar, currMax);
  }
  return maxSoFar;
}
```

**4. Anagram Check**

* **Question**: Are "listen" and "silent" anagrams?
* **Solution**:

```js
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;
  let count = {};
  for (let ch of s1) count[ch] = (count[ch] || 0) + 1;
  for (let ch of s2) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}
```

## Reference Sites

* **GeeksforGeeks**: [https://www.geeksforgeeks.org/data-structures/strings/](https://www.geeksforgeeks.org/data-structures/strings/)
* **LeetCode String Problems**: [https://leetcode.com/tag/string/](https://leetcode.com/tag/string/)
* **InterviewBit Arrays**: [https://www.interviewbit.com/array-interview-questions/](https://www.interviewbit.com/array-interview-questions/)
* **Khan Academy (Intro)**: [https://www.khanacademy.org/computing/computer-science/algorithms](https://www.khanacademy.org/computing/computer-science/algorithms)
