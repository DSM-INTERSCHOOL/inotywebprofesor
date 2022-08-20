import { gql } from 'apollo-boost';

export const NIVELES_BY_USUARIO = gql`
	query NivelesByIdUsuario($idUsuario: String!) {
		nivelesByIdUsuario(idUsuario: $idUsuario) {
			idNivel
			descripcion
		}
	}
`;