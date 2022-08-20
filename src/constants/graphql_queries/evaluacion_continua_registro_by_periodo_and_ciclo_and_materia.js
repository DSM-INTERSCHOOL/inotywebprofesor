import { gql } from 'apollo-boost';

export const EVALUACIONCONTINUAREGISTRO_BY_PERIODO_AND_CICLO_AND_MATERIA = gql`
	query EvaluacionContinuaRegistroByPeriodoAndCicloAndMateria($periodo: String!, $idCiclo: String!,$idMateria: String!) {
		evaluacionContinuaRegistroByPeriodoAndCicloAndMateria(periodo: $periodo, idCiclo: $idCiclo,idMateria:$idMateria) {
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

