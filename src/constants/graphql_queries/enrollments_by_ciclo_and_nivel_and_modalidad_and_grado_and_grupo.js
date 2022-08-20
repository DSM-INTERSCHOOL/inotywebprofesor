import { gql } from 'apollo-boost';

export const ENROLLMENTS_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO_AND_GRUPO = gql`
	query GrupoEnrollmentByCicloAndNivelAndModalidadAndGradoAndGrupo($idCiclo: String!,$idNivel: String!,$idModalidad: String!,$idGrado: String!, $idGrupo: String!) {
		grupoEnrollmentByCicloAndNivelAndModalidadAndGradoAndGrupo(idCiclo: $idCiclo,idNivel:$idNivel, idModalidad: $idModalidad, idGrado: $idGrado, idGrupo: $idGrupo) {
			id
			idPersona
			nombre
			tipo
		}
	}
`;
