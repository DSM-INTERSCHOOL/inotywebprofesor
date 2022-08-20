import { gql } from 'apollo-boost';

export const ALUMNOS_BY_CICLOS_AND_NIVELES = gql`
	query AlumnosByCiclosAndNiveles($ciclos: [String!]!, $niveles: [String!]!) {
		alumnosByCiclosAndNiveles(ciclos: $ciclos, niveles: $niveles) {
			idPersona
			idAlumno
			nombreCompleto
		}
	}
`;
