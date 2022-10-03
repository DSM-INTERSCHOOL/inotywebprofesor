import { gql } from 'apollo-boost';

export const MATERIAS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES = gql`
	query MateriasByCiclosAndNivelesAndModalidades($ciclos: [String!]!,$niveles: [String!]!,$modalidades: [String!]!) {
		materiasByCiclosAndNivelesAndModalidades(ciclos: $ciclos,niveles: $niveles, modalidades: $modalidades) {
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