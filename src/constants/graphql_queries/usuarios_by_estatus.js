import { gql } from 'apollo-boost';

export const USUARIOS_BY_ESTATUS = gql`
	query usuariosByEstatus($estatus: String!) {
		usuariosByEstatus(estatus: $estatus) {
			idPersona
			idUsuario
			nombreCompleto
			estatus
		}
	}
`;
