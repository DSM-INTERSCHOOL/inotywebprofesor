import { gql } from "apollo-boost";

export const EVALUACIONCONTINUAREGISTRO_BY_PERIODO_AND_CICLO_AND_MATERIA_AND_GRUPO_AND_ASPECTO = gql`
  query EvaluacionContinuaRegistroByPeriodoAndCicloAndMateriaAndGrupoAndAspecto(
    $periodo: Int!
    $idCiclo: String!
    $idMateria: String!
    $idGrupo: String!
    $idAspecto: String!
  ) {
    evaluacionContinuaRegistroByPeriodoAndCicloAndMateriaAndGrupoAndAspecto(
      periodo: $periodo
      idCiclo: $idCiclo
      idMateria: $idMateria
      idGrupo: $idGrupo
      idAspecto: $idAspecto
    ) {
      idAspecto
      numeroRegistro
      nombreAspecto
      idMateria
      idGrupo
      idCiclo
      descripcion
      periodoResultado
    }
  }
`;
