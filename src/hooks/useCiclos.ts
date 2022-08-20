import React from "react";
import { useQuery } from "react-apollo";
import { ICiclo } from "../components/Quizzes/interfaces/ciclo.interface";
import { CICLOS_BY_TIPO } from "../constants/graphql_queries/ciclos_by_tipo";

export const useCiclos = () => {
  const { error, loading, data } = useQuery(CICLOS_BY_TIPO, {
    variables: { tipo: "NORMAL" },
  });

  let ciclos: ICiclo[] = [];
  if (!loading && !error) {
    ciclos = data.ciclosByTipoCicloOrderByFechaInicioDesc;
  }
  console.log(ciclos);
  return {
    error: error,
    loading: loading,
    ciclos,
  };
};
