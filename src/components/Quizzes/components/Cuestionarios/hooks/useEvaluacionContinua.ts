import React from "react";
import { useQuery } from "react-apollo";
import { EVALUACIONCONTINUAREGISTRO_BY_PERIODO_AND_CICLO } from "../../../../../constants/graphql_queries/evaluacion_continua_registro_by_periodo_and_ciclo";
import { EVALUACIONCONTINUAREGISTRO_BY_PERIODO_AND_CICLO_AND_MATERIA_AND_GRUPO_AND_ASPECTO } from "../../../../../constants/graphql_queries/evaluacion_continua_registro_by_periodo_and_ciclo_and_materia_and_grupo_and_aspecto";
import { useCuestionariosContext } from "../context/CuestionariosContext";

interface EvaluacionContinuaRegistro {
  numeroRegistro: number;
  descripcion: string;
}

export const useEvaluacionContinua = () => {
  const {
    periodoResultado,
    idCicloResultado,
    idMateriaResultado,
    evaluacionContinuaAspecto,
    idGrupo,
  } = useCuestionariosContext();

  const variables = {
    periodo: +periodoResultado,
    idCiclo: idCicloResultado,
    idMateria: idMateriaResultado,
    idAspecto: evaluacionContinuaAspecto,
    idGrupo: idGrupo,
  };


  const { data, loading, error } = useQuery(
    EVALUACIONCONTINUAREGISTRO_BY_PERIODO_AND_CICLO_AND_MATERIA_AND_GRUPO_AND_ASPECTO,
    {
      variables,
    }
  );

  let evaluacionContinuaRegistro = [];
  if (!loading && !error) {
    for (let key in data) {
      evaluacionContinuaRegistro = data[key];
    }
  }

  return {
    evaluacionContinuaRegistro:
      evaluacionContinuaRegistro as EvaluacionContinuaRegistro[],
  };
};
