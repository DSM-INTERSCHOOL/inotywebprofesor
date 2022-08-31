import React from "react";
import { ReactivosProvider } from "./context/ReactivosContext";
import { TestSWR } from "./hooks/TestSWR";
import { ReactivosContent } from "./ReactivosContent";

export const Reactivos = () => {
  return (
    <ReactivosProvider>
      <ReactivosContent />
      {/* <TestSWR /> */}
    </ReactivosProvider>
  );
};
