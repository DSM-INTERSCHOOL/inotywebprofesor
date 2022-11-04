import React, { useState } from "react";
import { ICuestionarioAplicacion } from "../interfaces/CuestionarioAplicacion.interface";

const useTablaCuestionariosContextValue = () => {
  const [cuestionarios, setCuestionarios] = useState<ICuestionarioAplicacion[]>(
    []
  );
  const [entregaDetail, setEntregaDetail] = useState<any>();

  const [rowsCuestionariosAplicacion, setRowsCuestionariosAplicacion] =
    useState<any[]>([]);

  const [listaCuestionarios, setListaCuestionarios] = useState<any>([])
  const [indexCuestionario, setIndexCuestionario] = useState(0)

  const value = {
    cuestionarios,
    setCuestionarios,
    entregaDetail,
    setEntregaDetail,
    rowsCuestionariosAplicacion,
    setRowsCuestionariosAplicacion,
    listaCuestionarios,
    setListaCuestionarios,
    indexCuestionario,
    setIndexCuestionario
  };

  return { value };
};

export const Context = React.createContext({});

export const TablaCuestionariosProvider: React.FC = ({ children }: any) => {
  const { value } = useTablaCuestionariosContextValue();

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useTablaCuestionariosContext = () => {
  const { value } = useTablaCuestionariosContextValue();
  const context = React.useContext(Context) as typeof value;

  return context;
};
