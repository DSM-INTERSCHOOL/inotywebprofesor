import React from "react";
import { ReactivosProvider } from "./context/ReactivosContext";
import { ReactivosContent } from "./ReactivosContent";

export const Reactivos = () => {
  return (
    <ReactivosProvider>
      <ReactivosContent />
    </ReactivosProvider>
  );
};
