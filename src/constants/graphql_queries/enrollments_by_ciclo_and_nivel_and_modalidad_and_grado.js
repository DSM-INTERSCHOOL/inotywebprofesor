import { gql } from 'apollo-boost';

export const ENROLLMENTS_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO = gql`
	query GrupoEnrollmentByCicloAndNivelAndModalidadAndGrado($idCiclo: String!,$idNivel: String!,$idModalidad: String!,$idGrado: String!) {
		grupoEnrollmentByCicloAndNivelAndModalidadAndGrado(idCiclo: $idCiclo,idNivel:$idNivel, idModalidad: $idModalidad, idGrado: $idGrado) {
			id
			idPersona
			nombre
			tipo
		}
	}
`;
