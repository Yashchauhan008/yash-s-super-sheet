# Permutation & Combination

Permutation is about arrangements (order matters), and Combination is about selections (order doesn't matter).

## Key Concepts
*   **Factorial**: `n! = n × (n-1) × ... × 1`
*   **Permutation (nPr)**: Arranging 'r' items from 'n'.
*   **Combination (nCr)**: Selecting 'r' items from 'n'.

## Formula Shortcuts
*   **Permutation Formula (nPr)**: `n! / (n-r)!`
*   **Combination Formula (nCr)**: `n! / (r! * (n-r)!)`
*   **Circular Permutations**: `(n-1)!` for 'n' distinct items.

## Examples

**1. Permutation (Arrangement)**
*   **Question**: In how many different ways can the letters of the word 'JUDGE' be arranged?
*   **Solution**:
    *   The word 'JUDGE' has 5 distinct letters.
    *   The number of arrangements is `5! = 5 × 4 × 3 × 2 × 1 = 120`.

**2. Combination (Selection)**
*   **Question**: A committee of 3 members is to be formed from a group of 5 men and 4 women. In how many ways can this be done?
*   **Solution**:
    *   Total people = 5 + 4 = 9.
    *   We need to select 3 people from 9. Order doesn't matter.
    *   Number of ways = `9C3 = 9! / (3! * (9-3)!)`
    *   `= 9! / (3! * 6!) = (9 × 8 × 7) / (3 × 2 × 1) = 3 × 4 × 7 = 84`.

## Reference Sites
*   **GeeksforGeeks**: [https://www.geeksforgeeks.org/permutation-and-combination/](https://www.geeksforgeeks.org/permutation-and-combination/ ) [11]
*   **Math is Fun**: [https://www.mathsisfun.com/combinatorics/combinations-permutations.html](https://www.mathsisfun.com/combinatorics/combinations-permutations.html )
*   **Byju's**: [https://byjus.com/maths/permutation-and-combination/](https://byjus.com/maths/permutation-and-combination/ )
