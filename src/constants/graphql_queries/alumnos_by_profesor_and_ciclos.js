import { gql } from 'apollo-boost';
//alumnosByIdProfesorAndCiclosAndMaterias(idProfesor:"S1",ciclos:["2021"], materias:["S45"]){	
export const ALUMNOS_BY_PROFESOR_AND_CICLOS = gql`
	query AlumnosByIdProfesorAndCiclos($idProfesor: String!, $ciclos: [String!]!) {
		alumnosByIdProfesorAndCiclos(idProfesor: $idProfesor, ciclos: $ciclos) {
			idPersona
			idAlumno
			nombreCompleto
		}
	}
`;
