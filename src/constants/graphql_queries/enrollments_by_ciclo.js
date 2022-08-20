import { gql } from 'apollo-boost';

export const ENROLLMENTS_BY_CICLO = gql`
	query GrupoEnrollmentByCiclo($idCiclo: String!) {
		  grupoEnrollmentByCiclo(idCiclo: $idCiclo) {
			id
			idPersona
			nombre
			tipo
		}
	}
`;
