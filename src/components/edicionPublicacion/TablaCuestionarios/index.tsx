import React, { useEffect, useState } from "react";
import { useTableCuestionarios } from "./Hooks/useTableCuestionarios";
import { ICuestionarioAplicacion } from "./interfaces/CuestionarioAplicacion.interface";
import {
  getRowsFromCuestionarioAplicacion,
  tablaCuestionarioColumnas,
} from "./Utils/tableCuestionarioUtils";
import MUIDataTable from "mui-datatables";

export const TablaCuestionarios = () => {
  const [cuestionarios, setCuestionarios] = useState<ICuestionarioAplicacion[]>(
    []
  );
  const [rowsCuestionariosAplicacion, setRowsCuestionariosAplicacion] =
    useState<any[]>([]);
  const { getCuestionariosProfesor } = useTableCuestionarios();

  const loadCuestionarioProfesor = async () => {
    const newCuestionarios = await getCuestionariosProfesor();
    setCuestionarios(newCuestionarios);
    const data = await getRowsFromCuestionarioAplicacion(newCuestionarios);

    setRowsCuestionariosAplicacion(data);
  };

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
