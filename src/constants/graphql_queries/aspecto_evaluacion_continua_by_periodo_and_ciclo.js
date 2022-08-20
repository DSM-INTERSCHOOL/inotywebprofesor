import { gql } from 'apollo-boost';

export const ASPECTOEVALUACIONCONTINUA_BY_PERIODO_AND_CICLO = gql`
	query AspectoEvaluacionContinuaByPeriodoAndCiclo($periodo: Int!, $idCiclo: String!) {
		aspectoEvaluacionContinuaByPeriodoAndCiclo(periodo: $periodo, idCiclo: $idCiclo) {
            idAspecto
            idMateria
      idGrupo
            
            nombreAspecto
            
		}
	}
`;

