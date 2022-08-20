import { gql } from 'apollo-boost';

export const MODALIDADES_BY_NIVEL = gql`
	query ModalidadCarrerasByIdNivel($idNivel: String!) {
		modalidadCarrerasByIdNivel(idNivel: $idNivel) {
			idModalidadCarrera
			descripcion
		}
	}
`;
