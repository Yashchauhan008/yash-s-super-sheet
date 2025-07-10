# Linked List - DSA Patterns

Linked lists are linear data structures where elements (nodes) point to the next node. They're foundational for dynamic memory and pointer-based logic.

## Key Concepts

* **Node Structure**: Contains data and a pointer/reference to the next node.
* **Singly Linked List**: One-way links between nodes.
* **Doubly Linked List**: Nodes have links to both next and previous nodes.
* **Circular Linked List**: Last node points back to the head.
* **Head and Tail**: Head points to the first node; tail may or may not be tracked.

## Important Operations

### 1. **Traversal**

Walk through the list from head to end.

### 2. **Insertion**

* At beginning
* At end
* After a given node

### 3. **Deletion**

* From beginning
* From end
* A specific value or position

### 4. **Search**

Find whether a value exists in the list.

### 5. **Reversal**

Change the direction of all next pointers.

### 6. **Detect Cycle**

Use Floyd's cycle-finding algorithm (slow & fast pointer).

## Code Snippets

**1. Node Definition in Java**

```java
class Node {
  int data;
  Node next;

  Node(int data) {
    this.data = data;
    this.next = null;
  }
}
```

**2. Insert at Beginning in Java**

```java
Node insertAtBeginning(Node head, int data) {
  Node newNode = new Node(data);
  newNode.next = head;
  return newNode;
}
```

**3. Reverse a Linked List (Iterative)**

```java
Node reverse(Node head) {
  Node prev = null;
  Node curr = head;
  while (curr != null) {
    Node next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
```

## Examples

**1. Insert and Print a List**

```java
Node head = null;
head = insertAtBeginning(head, 30);
head = insertAtBeginning(head, 20);
head = insertAtBeginning(head, 10);
printList(head);
```

**2. Detect Loop in Linked List**

```java
boolean hasCycle(Node head) {
  Node slow = head, fast = head;
  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) return true;
  }
  return false;
}
```

## Visual Resources

* [Linked List GFG](https://www.geeksforgeeks.org/data-structures/linked-list/)
* [Khan Academy Linked List](https://www.khanacademy.org/computing/computer-science/data-structures)
* [YouTube: Linked List in 10 Minutes](https://www.youtube.com/watch?v=njTh_OwMljA)
