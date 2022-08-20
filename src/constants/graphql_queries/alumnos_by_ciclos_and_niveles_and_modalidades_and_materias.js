import { gql } from 'apollo-boost';

export const ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_MATERIAS = gql`
	query AlumnosByCiclosAndNivelesAndModalidadesAndMaterias($ciclos: [String!]!, $niveles: [String!]!, $modalidades: [String!]!,$materias: [String!]!) {
		alumnosByCiclosAndNivelesAndModalidadesAndMaterias(ciclos: $ciclos, niveles: $niveles, modalidades: $modalidades, materias: $materias) {
			idPersona
			idAlumno
			nombreCompleto
		}
	}
`;
