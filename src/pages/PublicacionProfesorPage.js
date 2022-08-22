import React from "react";
import { Layout } from "../components/UI/Layout";
import { HorizontalLinearStepper } from "../components/UI/HorizontalLinearStepper";
import { getUserLocalStorage } from "../utils/getUserLocalStorage";

export const PublicacionProfesorPage = () => {
  return (
    <Layout>
      {/* {JSON.stringify(getUserLocalStorage(), null, 2)} */}
      <HorizontalLinearStepper tipoUsuario={"PROFESOR"} />
    </Layout>
  );
};
