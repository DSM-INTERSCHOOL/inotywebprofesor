import { gql } from 'apollo-boost';

export const MATERIAS_BY_CICLOS_AND_NIVELES = gql`
	query MateriasByCiclosAndNiveles($ciclos: [String!]!,$niveles: [String!]!) {
		materiasByCiclosAndNiveles(ciclos: $ciclos,niveles: $niveles) {
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