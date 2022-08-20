import { gql } from 'apollo-boost';

export const ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_MATERIAS = gql`
	query AlumnosByCiclosAndNivelesAndModalidadesAndGradosAndMaterias($ciclos: [String!]!, $niveles: [String!]!, $modalidades: [String!]!,$grados: [String!]!,$materias: [String!]!) {
		alumnosByCiclosAndNivelesAndModalidadesAndGradosAndMaterias(ciclos: $ciclos, niveles: $niveles, modalidades: $modalidades,grados: $grados, materias: $materias) {
			idPersona
			idAlumno
			nombreCompleto
		}
	}
`;
