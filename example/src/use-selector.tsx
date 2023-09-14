import React from "react";
import { debounce } from "./debounce";

import {
  getElementFromFiber,
  getFiberFromElement,
  getFirstFiberHasName,
  getFirstStateNodeFiber,
  getNameFromFiber,
  getParentOfFiber,
} from "@aliemir/dom-to-fiber-utils";

type Fiber = Exclude<ReturnType<typeof getFiberFromElement>, null>;

export const useSelector = (active: boolean) => {
  const [selectedFiber, setSelectedFiber] = React.useState<{
    stateNode: Fiber | null;
    nameFiber: Fiber | null;
  }>({
    stateNode: null,
    nameFiber: null,
  });
  const [activeFiber, setActiveFiber] = React.useState<{
    stateNode: Fiber | null;
    nameFiber: Fiber | null;
    derived?: boolean;
  }>({
    stateNode: null,
    nameFiber: null,
    derived: false,
  });

  React.useEffect(() => {
    if (active) {
      return () => {
        setSelectedFiber({
          stateNode: null,
          nameFiber: null,
        });
        setActiveFiber({
          stateNode: null,
          nameFiber: null,
          derived: false,
        });
      };
    }

    return () => 0;
  }, [active]);

  const pickFiber = React.useCallback((target: HTMLElement) => {
    // Get the fiber node from the element
    const fiber = getFiberFromElement(target);
    // Get the first fiber node that has a state node (look up the tree)
    const fiberWithStateNode = getFirstStateNodeFiber(fiber);
    // Get the first fiber node that has a name (look up the tree)
    const firstParentOfNodeWithName = getFirstFiberHasName(fiberWithStateNode);

    if (fiberWithStateNode && firstParentOfNodeWithName) {
      setSelectedFiber({
        stateNode: fiberWithStateNode,
        nameFiber: firstParentOfNodeWithName,
      });
      return;
    } else {
      setSelectedFiber({
        stateNode: null,
        nameFiber: null,
      });
      return;
    }
  }, []);

  React.useEffect(() => {
    if (
      activeFiber.stateNode !== selectedFiber.stateNode ||
      activeFiber.nameFiber !== selectedFiber.nameFiber
    ) {
      setActiveFiber({
        stateNode: selectedFiber.stateNode,
        nameFiber: selectedFiber.nameFiber,
        derived: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiber]);

  const { rect, name } = React.useMemo(() => {
    if (activeFiber.stateNode && activeFiber.nameFiber) {
      // Get the element from the fiber with a state node
      const element = activeFiber.stateNode
        ? getElementFromFiber(activeFiber.stateNode)
        : null;
      // Get the name of the fiber node with a name
      const fiberName = activeFiber.nameFiber
        ? getNameFromFiber(activeFiber.nameFiber)
        : null;

      if (!fiberName || !element) {
        return {
          rect: {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
          },
          name: "",
        };
      }

      const bounding = element.getBoundingClientRect?.();

      return {
        rect: {
          width: bounding.width,
          height: bounding.height,
          x: bounding.left,
          y: bounding.top,
        },
        name: fiberName,
      };
    }

    return {
      rect: {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
      name: "",
    };
  }, [activeFiber]);

  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      // if user presses space, toggle the derived state and set the active fiber to the parent
      if (e.key === " " && activeFiber.stateNode) {
        e.stopPropagation();
        e.preventDefault();
        const parent = getParentOfFiber(activeFiber.stateNode);
        if (parent) {
          // Get the first fiber node that has a state node (look up the tree)
          const fiberWithStateNode = getFirstStateNodeFiber(parent);
          // Get the first fiber node that has a name (look up the tree)
          const firstParentOfNodeWithName =
            getFirstFiberHasName(fiberWithStateNode);

          if (fiberWithStateNode && firstParentOfNodeWithName) {
            setActiveFiber({
              stateNode: fiberWithStateNode,
              nameFiber: firstParentOfNodeWithName,
              derived: true,
            });
            return;
          }
        }
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [activeFiber]);

  React.useEffect(() => {
    if (active) {
      const listener = debounce((e: MouseEvent) => {
        if (e?.target) pickFiber(e.target as HTMLElement);
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
