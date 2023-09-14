# @aliemir/dom-to-fiber-utils

A simple set of utilities to convert DOM elements to React Fiber elements.

## Installation

```bash
npm install @aliemir/dom-to-fiber-utils
```

## Demo

Example App: https://dom-to-fiber-utils-example.vercel.app

## Exported functions

### `getFiberFromElement(element: HTMLElement): Fiber | null`

Given a dom element, return the fiber associated with it.

### `getNameFromFiber(fiber: FiberNode): string | null`

Given a fiber, return the name of the component.

### `getParentOfFiber(fiber: FiberNode): Fiber | null`

Given a fiber, return the parent fiber. Looks up the tree.

### `getFirstStateNodeOfFiber(fiber: FiberNode): Fiber | null`

Given a fiber, return the first fiber with a state node. Looks up the tree.

### `getDebugOwner(fiber: FiberNode): Fiber | null`

Given a fiber, return the owner fiber.

### `getDebugSource(fiber: FiberNode): Source | null`

Given a fiber, return the source of the component.

### `getNthParentOfFiber(fiber: FiberNode, n: number): Fiber | null`

Given a fiber, return the nth parent of the fiber.

### `getElementFromFiber(fiber: FiberNode): HTMLElement | null`

Given a fiber, return the dom element associated with it.

### `getFirstFiberHasName(fiber: FiberNode, name: string): Fiber | null`

Given a fiber, return the first fiber with a name. Looks up the tree.

## Note

All PRs are welcome. This is a very simple set of utilities that I needed for a project. If you need more, please open an issue or a PR.
