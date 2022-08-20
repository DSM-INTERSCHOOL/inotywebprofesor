import { gql } from 'apollo-boost';

export const ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES = gql`
	query AlumnosByCiclosAndNivelesAndModalidades($ciclos: [String!]!, $niveles: [String!]!, $modalidades: [String!]!) {
		alumnosByCiclosAndNivelesAndModalidades(ciclos: $ciclos, niveles: $niveles, modalidades: $modalidades) {
			idPersona
			idAlumno
			nombreCompleto
		}
	}
`;
