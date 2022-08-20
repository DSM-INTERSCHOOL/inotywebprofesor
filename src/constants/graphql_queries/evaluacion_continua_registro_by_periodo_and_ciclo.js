import { gql } from 'apollo-boost';

export const EVALUACIONCONTINUAREGISTRO_BY_PERIODO_AND_CICLO = gql`
	query EvaluacionContinuaRegistroByPeriodoAndCiclo($periodo: Int!, $idCiclo: String!) {
		evaluacionContinuaRegistroByPeriodoAndCiclo(periodo: $periodo, idCiclo: $idCiclo) {
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

