import { gql } from 'apollo-boost';

export const MATERIAS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS = gql`
	query MateriasByCiclosAndNivelesAndModalidadesAndGrados($ciclos: [String!]!,$niveles: [String!]!,$modalidades: [String!]!,$grados: [String!]!) {
		materiasByCiclosAndNivelesAndModalidadesAndGrados(ciclos: $ciclos,niveles: $niveles,modalidades:$modalidades, grados:$grados) {
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