import { gql } from 'apollo-boost';

export const MATERIAS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS = gql`
	query MateriasByCiclosAndNivelesAndModalidadesAndGradosAndGrupos($ciclos: [String!]!,$niveles: [String!]!,$modalidades: [String!]!,$grados: [String!]!,$grupos: [String!]!) {
		materiasByCiclosAndNivelesAndModalidadesAndGradosAndGrupos(ciclos: $ciclos,niveles: $niveles,modalidades:$modalidades, grados:$grados, grupos:$grupos) {
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