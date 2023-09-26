import type { Fiber, Source } from "react-reconciler";

/**
 * Given a dom element, return the fiber associated with it.
 */
export const getFiberFromElement = (element: HTMLElement): Fiber | null => {
  let target: HTMLElement | null = element;
  let key: keyof HTMLElement | undefined = undefined;

  while (!key && target) {
    key = Object.keys(target).find((key) => key.startsWith("__reactFiber$")) as
      | keyof HTMLElement
      | undefined;

    // move to parent if key is not defined
    if (!key) {
      target = target.parentElement;
    }
  }
  return key && target ? (target[key] as unknown as Fiber) : null;
};

/**
 * Given a fiber, return the name of the component.
 */
export const getNameFromFiber = (fiber: Fiber | null): string | null => {
  if (!fiber) return null;
  return (
    fiber.type?.displayName ||
    fiber.type?.name ||
    fiber.elementType?.displayName ||
    fiber.elementType?.name ||
    null
  );
};

/**
 * Given a fiber, return the parent fiber. Looks up the tree.
 */
export const getParentOfFiber = (fiber: Fiber): Fiber | null => {
  return fiber.return || null;
};

/**
 * Given a fiber, return the first fiber with a state node. Looks up the tree.
 */
export const getFirstStateNodeFiber = (fiber: Fiber | null): Fiber | null => {
  // move to the parent until we find a state node
  let parent = fiber;

  while (parent) {
    if (parent.stateNode) {
      return parent;
    }

    parent = getParentOfFiber(parent) as Fiber;
  }

  return null;
};

/**
 * Given a fiber, return the owner fiber.
 */
export const getDebugOwner = (fiber: Fiber): Fiber | null => {
  return fiber._debugOwner || null;
};

/**
 * Given a fiber, return the source of the component.
 */
export const getDebugSource = (fiber: Fiber): Source | null => {
  return fiber._debugSource || null;
};

/**
 * Given a fiber, return the nth parent of the fiber.
 */
export const getNthParentOfFiber = (fiber: Fiber, n: number): Fiber | null => {
  let parent = fiber;

  for (let i = 0; i < n; i++) {
    parent = getParentOfFiber(parent) as Fiber;
  }

  return parent;
};

/**
 * Given a fiber, return the dom element associated with it.
 */
export const getElementFromFiber = (fiber: Fiber): HTMLElement | null => {
  return fiber.stateNode as HTMLElement;
};

/**
 * Given a fiber, return the first fiber with a name. Looks up the tree.
 */
export const getFirstFiberHasName = (fiber: Fiber | null): Fiber | null => {
  if (!fiber) return null;

  if (getNameFromFiber(fiber)) {
    return fiber;
  }

  const parent = getParentOfFiber(fiber);

  if (!parent) {
    return null;
  }

  return getFirstFiberHasName(parent);
};

/**
 * Given a fiber, return the name of the first fiber with a name. Looks up the tree.
 */
export const getNameOfFirstFiberHasName = (
  fiber: Fiber | null,
): string | null => {
  const firstFiber = getFirstFiberHasName(fiber);

  if (!firstFiber) {
    return null;
  }

  return getNameFromFiber(firstFiber);
};
