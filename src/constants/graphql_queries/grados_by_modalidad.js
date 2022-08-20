import { gql } from 'apollo-boost';

export const GRADOS_BY_MODALIDAD = gql`
	query GradosByIdModalidadCarrera($idModalidadCarrera: String!) {
		gradosByIdModalidadCarrera(idModalidadCarrera: $idModalidadCarrera) {
			idGrado
		}
    }
    

   
`;
