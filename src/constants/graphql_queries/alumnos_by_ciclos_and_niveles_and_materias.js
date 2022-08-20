import { gql } from 'apollo-boost';

export const ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MATERIAS = gql`
	query AlumnosByCiclosAndNivelesAndMaterias($ciclos: [String!]!, $niveles: [String!]!, $materias: [String!]!) {
		alumnosByCiclosAndNivelesAndMaterias(ciclos: $ciclos, niveles: $niveles, materias: $materias) {
			idPersona
			idAlumno
			nombreCompleto
		}
	}
`;
