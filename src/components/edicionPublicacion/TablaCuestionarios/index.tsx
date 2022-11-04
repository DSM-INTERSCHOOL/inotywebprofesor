import React, { useEffect, useState } from "react";
import { useTableCuestionarios } from "./Hooks/useTableCuestionarios";
import { ICuestionarioAplicacion } from "./interfaces/CuestionarioAplicacion.interface";
import {
  getRowsFromCuestionarioAplicacion,
  tablaCuestionarioColumnas,
} from "./Utils/tableCuestionarioUtils";
import MUIDataTable from "mui-datatables";
import { useTablaCuestionariosContext } from "./context/TablaCuestionariosContext";

export const TablaCuestionarios = () => {
  const {
    setCuestionarios,
    cuestionarios,
    setRowsCuestionariosAplicacion,
    rowsCuestionariosAplicacion,
  } = useTablaCuestionariosContext();

  const { loadCuestionarioProfesor } = useTableCuestionarios();

  useEffect(() => {
    loadCuestionarioProfesor();
  }, []);

  // const data = getRowsFromCuestionarioAplicacion(cuestionarios);
  // console.log("data: ", data);

  return (
    <MUIDataTable
      title={"Cuestionarios"}
      data={rowsCuestionariosAplicacion}
      columns={tablaCuestionarioColumnas}
      options={{ selectableRows: "none" }}
    />
  );
};
