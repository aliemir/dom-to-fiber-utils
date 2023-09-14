import React from "react";
import { debounce } from "./debounce";

import {
  getElementFromFiber,
  getFiberFromElement,
  getFirstFiberHasName,
  getFirstStateNodeFiber,
  getNameFromFiber,
} from "@aliemir/dom-to-fiber-utils";

export const useSelector = (active: boolean) => {
  const [rect, setRect] = React.useState<
    Record<"x" | "y" | "width" | "height", number>
  >({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [name, setName] = React.useState("");

  const pickFiber = React.useCallback(
    (target: HTMLElement, clientX: number, clientY: number) => {
      // Get the fiber node from the element
      const fiber = getFiberFromElement(target);
      // Get the first fiber node that has a state node (look up the tree)
      const fiberWithStateNode = getFirstStateNodeFiber(fiber);
      // Get the first fiber node that has a name (look up the tree)
      const firstParentOfNodeWithName =
        getFirstFiberHasName(fiberWithStateNode);
      // Get the element from the fiber with a state node
      const element = fiberWithStateNode
        ? getElementFromFiber(fiberWithStateNode)
        : null;
      // Get the name of the fiber node with a name
      const name = firstParentOfNodeWithName
        ? getNameFromFiber(firstParentOfNodeWithName)
        : null;

      // If the element or name is null, set the rect to 0
      if (!name || !element) {
        setRect({
          width: 0,
          height: 0,
          x: clientX,
          y: clientY,
        });
        setName("");
        return;
      }

      // Get the size and position of the elements bounding box
      const bounding = element.getBoundingClientRect?.();
      setRect({
        width: bounding.width,
        height: bounding.height,
        x: bounding.left,
        y: bounding.top,
      });
      setName(name);
    },
    [],
  );

  React.useEffect(() => {
    if (active) {
      const listener = debounce((e: MouseEvent) => {
        if (e?.target) pickFiber(e.target as HTMLElement, e.clientX, e.clientY);
      }, 30);

      document.addEventListener("mousemove", listener);

      return () => document.removeEventListener("mousemove", listener);
    } else {
      return () => 0;
    }
  }, [active, pickFiber]);

  return {
    rect,
    name,
  };
};
