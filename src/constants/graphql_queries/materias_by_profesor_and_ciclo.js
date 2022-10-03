import { gql } from 'apollo-boost';

export const MATERIAS_BY_PROFESOR_AND_CICLO = gql`
	query MateriasByIdCicloAndIdProfesor($idProfesor: String!,$idCiclo: String!) {
		materiasByIdCicloAndIdProfesor(idProfesor: $idProfesor,idCiclo: $idCiclo) {
			idMateria
			tipo
			idCiclo
			idProfesor
			idGrupo
			descripcionCiclo
			descripcion
			idNivel
			idModalidad
			idGrado
		}
	}
`;