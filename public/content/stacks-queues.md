# Stack and Queue - DSA Patterns

Stacks and Queues are fundamental linear data structures used widely in algorithms and systems programming.

## Stack

A **Stack** is a Last-In-First-Out (LIFO) structure where the last inserted element is the first to be removed.

### Key Operations

* **push(x)**: Add element x to the top.
* **pop()**: Remove the top element.
* **peek() / top()**: View the top element.
* **isEmpty()**: Check if stack is empty.

### Applications

* Function Call Stack
* Expression Evaluation (Postfix/Infix/Prefix)
* Undo Mechanism in Editors
* Backtracking (Maze, Recursion)

### Java Example

```java
import java.util.Stack;

Stack<Integer> stack = new Stack<>();
stack.push(10);
stack.push(20);
System.out.println(stack.peek()); // 20
stack.pop();
System.out.println(stack.peek()); // 10
```

### Without Java Collections (Array Implementation)

```java
class StackArray {
  int top = -1;
  int[] arr = new int[100];

  void push(int x) {
    if (top < arr.length - 1) arr[++top] = x;
  }

  int pop() {
    return (top >= 0) ? arr[top--] : -1;
  }

  int peek() {
    return (top >= 0) ? arr[top] : -1;
  }

  boolean isEmpty() {
    return top == -1;
  }
}
```

---

## Queue

A **Queue** is a First-In-First-Out (FIFO) structure where the first inserted element is the first to be removed.

### Key Operations

* **enqueue(x)**: Add x to rear.
* **dequeue()**: Remove element from front.
* **peek() / front()**: View the front element.
* **isEmpty()**: Check if queue is empty.

### Applications

* Task Scheduling
* Breadth-First Search (BFS)
* CPU & IO Scheduling
* Print Queues

### Java Example

```java
import java.util.LinkedList;
import java.util.Queue;

Queue<Integer> queue = new LinkedList<>();
queue.offer(10);
queue.offer(20);
System.out.println(queue.peek()); // 10
queue.poll();
System.out.println(queue.peek()); // 20
```

### Without Java Collections (Array Implementation)

```java
class QueueArray {
  int front = 0, rear = 0;
  int[] arr = new int[100];

  void enqueue(int x) {
    if (rear < arr.length) arr[rear++] = x;
  }

  int dequeue() {
    return (front < rear) ? arr[front++] : -1;
  }

  int peek() {
    return (front < rear) ? arr[front] : -1;
  }

  boolean isEmpty() {
    return front == rear;
  }
}
```

---

## Reference Sites

* [Stack - GeeksforGeeks](https://www.geeksforgeeks.org/stack-data-structure/)
* [Queue - GeeksforGeeks](https://www.geeksforgeeks.org/queue-data-structure/)
* [Khan Academy - Stacks and Queues](https://www.khanacademy.org/computing/computer-science/algorithms/)
