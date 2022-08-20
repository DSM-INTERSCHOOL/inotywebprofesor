import { gql } from 'apollo-boost';

export const ENROLLMENTS_BY_CICLO_AND_GRUPO = gql`
	query GrupoEnrollmentByCicloAndGrupo($idCiclo: String!,$idGrupo: String!) {
		  grupoEnrollmentByCicloAndGrupo(idCiclo: $idCiclo,idGrupo:$idGrupo) {
			id
			idPersona
			nombre
			tipo
		}
	}
`;
