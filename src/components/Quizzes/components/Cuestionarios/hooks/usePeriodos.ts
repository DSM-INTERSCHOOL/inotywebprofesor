import React from "react";
import { useQuery } from "react-apollo";
import { PERIODOS_BY_CICLO } from "../../../../../constants/graphql_queries/periodos_calificacion_vigentes_by_ciclo";
import { useCuestionariosContext } from "../context/CuestionariosContext";

interface IPeriodo {
  periodo: string;
  descripcion: string;
}

export const usePeriodos = () => {
  const { idCicloResultado } = useCuestionariosContext();
  const { loading, data, error } = useQuery(PERIODOS_BY_CICLO, {
    variables: {
      idCiclo: idCicloResultado,
    },
  });

  let periodos = [];
  if (!loading && !error)  {
    periodos = data.periodoVigentesByCiclo;
  }

  return {
    periodos: periodos as IPeriodo[],
  };
};
