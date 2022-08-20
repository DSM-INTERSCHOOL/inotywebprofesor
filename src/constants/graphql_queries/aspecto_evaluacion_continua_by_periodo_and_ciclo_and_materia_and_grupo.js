import { gql } from "apollo-boost";

export const ASPECTOEVALUACIONCONTINUA_BY_PERIODO_AND_CICLO_AND_MATERIA_AND_GRUPO = gql`
  query AspectoEvaluacionContinuaByPeriodoAndCicloAndMateriaAndGrupo(
    $periodo: Int!
    $idCiclo: String!
    $idMateria: String!
    $idGrupo: String!
  ) {
    aspectoEvaluacionContinuaByPeriodoAndCicloAndMateriaAndGrupo(
      periodo: $periodo
      idCiclo: $idCiclo
      idMateria: $idMateria
      idGrupo: $idGrupo
    ) {
      idAspecto
      nombreAspecto
      idMateria
      idGrupo
    }
  }
`;
