import { gql } from 'apollo-boost';
//nivelesByProfesorAndCiclo(idProfesor: String!,idCiclo:String!):[Nivel]
export const NIVELES_BY_PROFESOR_AND_CICLO = gql`
	query NivelesByProfesorAndCiclo($idProfesor: String!, $idCiclo: String!) {
		NivelesByProfesorAndCiclo(idProfesor: $idProfesor, idCiclo: $idCiclo) {
			idNivel
			descripcion
		}
	}
`;