import { gql } from 'apollo-boost';

export const EVALUACIONCONTINUAREGISTRO_BY_PERIODO_AND_CICLO_AND_MATERIA_AND_GRUPO = gql`
	query EvaluacionContinuaRegistroByPeriodoAndCicloAndMateriaAndGrupo($periodo: String!, $idCiclo: String!,$idMateria: String!,$idGrupo: String!) {
		evaluacionContinuaRegistroByPeriodoAndCicloAndMateriaAndGrupo(periodo: $periodo, idCiclo: $idCiclo,idMateria:$idMateria, idGrupo: $idGrupo) {
                  idAspecto
                  numeroRegistro
                  nombreAspecto
                  idMateria
                  idGrupo
                  idCiclo
                  descripcion
		}
	}
`;

