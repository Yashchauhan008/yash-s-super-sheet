# Encapsulation

## Concept

Encapsulation is one of the fundamental principles of Object-Oriented Programming (OOP). It refers to the bundling of data (attributes or properties) and the methods (functions or behaviors) that operate on that data into a single unit, known as a **class**.

More importantly, encapsulation also involves **restricting direct access** to some of an object's components. This means that the internal state of an object is hidden from the outside world, and interactions with the object's data can only happen through its defined public interface (i.e., its methods).

Think of it like a capsule: it contains everything necessary for its function, and its contents are protected from external interference.

## Key Aspects

1.  **Data Hiding (Information Hiding)**: This is the core of encapsulation. The internal details of a class are kept private, meaning they cannot be directly accessed or modified from outside the class. This protects the data from accidental corruption or unauthorized manipulation.
2.  **Bundling**: Attributes and methods that logically belong together are grouped into a single class. This promotes modularity and makes the code easier to understand and manage.
3.  **Controlled Access**: Access to the private data is provided through public methods, often called **getters** (to retrieve data) and **setters** (to modify data). These methods can include validation logic to ensure that the data remains in a valid state.

## Why is Encapsulation Important?

*   **Data Integrity**: By controlling how data is accessed and modified, encapsulation helps maintain the consistency and validity of an object's state.
*   **Modularity**: Classes become self-contained units, making the system more modular. Changes inside a class don't necessarily affect other parts of the system, as long as the public interface remains consistent.
*   **Flexibility and Maintainability**: If the internal implementation of a class needs to change, as long as the public methods behave the same way, the external code that uses the class doesn't need to be modified. This makes the system easier to maintain and evolve.
*   **Reduced Complexity**: Users of a class only need to understand its public interface, not its intricate internal workings. This simplifies the use of complex systems.

## Tricky Aspects and Common Pitfalls

1.  **Over-exposure (Ignoring `private`/`protected`)**: A common mistake for beginners is to make all class members `public`. This defeats the purpose of encapsulation, exposing internal state and leading to tight coupling. Any change to the internal data structure would then require changes in all external code that directly accesses it.
2.  **Anemic Domain Model**: This occurs when classes primarily contain data (attributes) and very little behavior (methods). All the logic for manipulating this data resides in separate "service" classes. This can lead to a less object-oriented design where data and behavior are separated, making it harder to manage.
3.  **"God Object"**: The opposite of an anemic model, where a single class tries to encapsulate too much data and too many responsibilities, violating the Single Responsibility Principle (SRP) and making the class hard to understand, test, and maintain.
4.  **Improper Use of Getters/Setters**: While getters and setters are common, overusing them for every private attribute can sometimes lead to a "JavaBean" anti-pattern, where objects become mere data holders without much behavior. The goal is to expose *behavior* that operates on data, not just the data itself.

## Code Example (Pseudocode)

Let's consider a `BankAccount` class. We want to ensure that the `balance` can only be changed through valid deposit and withdrawal operations, not directly.

