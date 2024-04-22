import "./App.css";
import React from "react";
import * as DomToFiberUtils from "@aliemir/dom-to-fiber-utils";
import { PointerSelector } from "./pointer-selector";
import { FirstComponent } from "./first";
import { SecondComponent } from "./second";

function App() {
  React.useEffect(() => {
    // @ts-ignore - This is just for the demo
    window.DomToFiberUtils = DomToFiberUtils;
  }, []);

  return (
    <>
      <div>
        <h1>@aliemir/dom-to-fiber-utils</h1>
        <PointerSelector />
        <p className="read-the-docs">
          A simple set of utilities to find the React Fiber node from a DOM
          element or vice versa.
        </p>
        <FirstComponent />
        <SecondComponent />
      </div>
    </>
  );
}

export default App;
