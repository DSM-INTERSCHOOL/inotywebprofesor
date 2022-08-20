import { gql } from 'apollo-boost';

export const ASPECTOEVALUACIONCONTINUA_BY_PERIODO_AND_CICLO_AND_MATERIA = gql`
	query AspectoEvaluacionContinuaByPeriodoAndCicloAndMateria($periodo: Int!, $idCiclo: String!,$idMateria: String!) {
		aspectoEvaluacionContinuaByPeriodoAndCicloAndMateria(periodo: $periodo, idCiclo: $idCiclo,idMateria:$idMateria) {
            idAspecto
            nombreAspecto
            idMateria
      idGrupo
		}
	}
`;

