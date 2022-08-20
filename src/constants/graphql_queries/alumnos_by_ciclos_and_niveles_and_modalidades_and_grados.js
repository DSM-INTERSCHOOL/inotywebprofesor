import { gql } from 'apollo-boost';

export const ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS = gql`
	query AlumnosByCiclosAndNivelesAndModalidadesAndGrados(
		$ciclos: [String!]!
		$niveles: [String!]!
		$modalidades: [String!]!
		$grados: [String!]!
	) {
		alumnosByCiclosAndNivelesAndModalidadesAndGrados(
			ciclos: $ciclos
			niveles: $niveles
			modalidades: $modalidades
			grados: $grados
		) {
			idPersona
			idAlumno
			nombreCompleto
		}
	}
`;
