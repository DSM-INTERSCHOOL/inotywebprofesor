import { gql } from 'apollo-boost';

export const ENROLLMENTS_BY_CICLO_AND_NIVEL = gql`
	query GrupoEnrollmentByCicloAndNivel($idCiclo: String!,$idNivel: String!) {
		  grupoEnrollmentByCicloAndNivel(idCiclo: $idCiclo,idNivel:$idNivel) {
			id
			idPersona
			nombre
			tipo
		}
	}
`;
