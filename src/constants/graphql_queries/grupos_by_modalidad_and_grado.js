import { gql } from 'apollo-boost';

export const GRUPO_BY_MODALIDAD_AND_GRADO = gql`
	query GruposByIdModalidadCarreraAndIdGrado($idModalidadCarrera: String!, $idGrado: String!) {
		gruposByIdModalidadCarreraAndIdGrado(idModalidadCarrera: $idModalidadCarrera, idGrado: $idGrado) {
			idGrupo
		}
    }

`;
