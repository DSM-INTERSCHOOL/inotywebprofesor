import React from "react";
import { useQuery } from "react-apollo";
import { ASPECTOEVALUACIONCONTINUA_BY_PERIODO_AND_CICLO } from "../../../../../constants/graphql_queries/aspecto_evaluacion_continua_by_periodo_and_ciclo";
import { ASPECTOEVALUACIONCONTINUA_BY_PERIODO_AND_CICLO_AND_MATERIA } from "../../../../../constants/graphql_queries/aspecto_evaluacion_continua_by_periodo_and_ciclo_and_materia";
import { ASPECTOEVALUACIONCONTINUA_BY_PERIODO_AND_CICLO_AND_MATERIA_AND_GRUPO } from "../../../../../constants/graphql_queries/aspecto_evaluacion_continua_by_periodo_and_ciclo_and_materia_and_grupo";
import { useCuestionariosContext } from "../context/CuestionariosContext";

interface IAspecto {
  idAspecto: string;
  nombreAspecto: string;
}

interface Args {
  periodo: number;
  idCiclo: string;
  idMateria: string;
  idGrupo: string;
}

const getQuery = ({ periodo, idCiclo, idMateria, idGrupo }: Args) => {
  let query = ASPECTOEVALUACIONCONTINUA_BY_PERIODO_AND_CICLO;
  let variables = { idCiclo: "", periodo: 0 } as any;
  if (
    periodo > 0 &&
    idCiclo.trim() !== "" &&
    idMateria.trim() !== "" &&
    idGrupo.trim() !== ""
  ) {
    query =
      ASPECTOEVALUACIONCONTINUA_BY_PERIODO_AND_CICLO_AND_MATERIA_AND_GRUPO;
    variables = { periodo, idCiclo, idMateria, idGrupo };
    return {
      query,
      variables,
    };
  }
  if (periodo > 0 && idCiclo.trim() !== "" && idMateria.trim() !== "") {
    query = ASPECTOEVALUACIONCONTINUA_BY_PERIODO_AND_CICLO_AND_MATERIA;
    variables = { periodo, idCiclo, idMateria };
    return {
      query,
      variables,
    };
  }
  if (periodo > 0 && idCiclo.trim() !== "") {
    query = ASPECTOEVALUACIONCONTINUA_BY_PERIODO_AND_CICLO;
    variables = { periodo, idCiclo };
    return {
      query,
      variables,
    };
  }

  return {
    query,
    variables,
  };
};

export const useAspecto = () => {
  const { periodoResultado, idCicloResultado, idMateriaResultado, idGrupo } =
    useCuestionariosContext();
  const { variables, query } = getQuery({
    periodo: +periodoResultado,
    idCiclo: idCicloResultado,
    idMateria: idMateriaResultado,
    idGrupo: idGrupo,
  });
  const { data, loading } = useQuery(query, {
    variables,
  });

  let aspectos = [];
  if (!loading) {
    for (let key in data) {
      aspectos = data[key];
    }
  }

  return {
    aspectos: aspectos as IAspecto[],
  };
};
