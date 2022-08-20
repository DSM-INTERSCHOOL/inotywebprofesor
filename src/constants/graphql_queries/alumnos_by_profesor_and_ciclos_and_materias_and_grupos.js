import { gql } from 'apollo-boost';
//alumnosByIdProfesorAndCiclosAndMaterias(idProfesor:"S1",ciclos:["2021"], materias:["S45"]){	
export const ALUMNOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS_AND_GRUPOS = gql`
	query AlumnosByIdProfesorAndCiclosAndMateriasAndGrupos($idProfesor: String!, $ciclos: [String!]!,  $materias: [String!]!, $grupos: [String!]!) {
		alumnosByIdProfesorAndCiclosAndMateriasAndGrupos(idProfesor: $idProfesor, ciclos: $ciclos, materias: $materias, grupos:$grupos) {
			idPersona
			idAlumno
			nombreCompleto
		}
	}
`;
