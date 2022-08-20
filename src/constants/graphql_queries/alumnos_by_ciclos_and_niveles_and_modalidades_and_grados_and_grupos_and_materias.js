import { gql } from 'apollo-boost';

export const ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS_AND_MATERIAS = gql`
	query AlumnosByCiclosAndNivelesAndModalidadesAndGradosAndGruposAndMaterias($ciclos: [String!]!, $niveles: [String!]!, $modalidades: [String!]!,$grados: [String!]!,$grupos: [String!]!,$materias: [String!]!) {
		alumnosByCiclosAndNivelesAndModalidadesAndGradosAndGruposAndMaterias(ciclos: $ciclos, niveles: $niveles, modalidades: $modalidades,grados: $grados, grupos: $grupos,materias: $materias) {
			idPersona
			idAlumno
			nombreCompleto
		}
	}
`;
