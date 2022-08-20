import { gql } from 'apollo-boost';
//alumnosByIdProfesorAndCiclosAndMaterias(idProfesor:"S1",ciclos:["2021"], materias:["S45"]){	
export const ALUMNOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS = gql`
	query AlumnosByIdProfesorAndCiclosAndMaterias($idProfesor: String!, $ciclos: [String!]!,  $materias: [String!]!) {
		alumnosByIdProfesorAndCiclosAndMaterias(idProfesor: $idProfesor, ciclos: $ciclos, materias: $materias) {
			idPersona
			idAlumno
			nombreCompleto
		}
	}
`;
