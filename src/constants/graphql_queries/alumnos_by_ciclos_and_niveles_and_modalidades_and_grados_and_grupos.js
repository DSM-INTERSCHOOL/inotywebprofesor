import { gql } from 'apollo-boost';

export const ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS = gql`
	query AlumnosByCiclosAndNivelesAndModalidadesAndGradosAndGrupos(
		$ciclos: [String!]!
		$niveles: [String!]!
		$modalidades: [String!]!
		$grados: [String!]!
		$grupos: [String!]!
	) {
		alumnosByCiclosAndNivelesAndModalidadesAndGradosAndGrupos(
			ciclos: $ciclos
			niveles: $niveles
			modalidades: $modalidades
			grados: $grados
			grupos: $grupos
		) {
			idPersona
			idAlumno
			nombreCompleto
		}
	}
`;
