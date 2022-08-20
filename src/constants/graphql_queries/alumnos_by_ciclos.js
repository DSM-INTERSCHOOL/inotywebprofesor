import { gql } from 'apollo-boost';

export const ALUMNOS_BY_CICLOS = gql`


query AlumnosByCiclos($ciclos: [String!]!){
	alumnosByCiclos(ciclos: $ciclos){        
        idPersona
        idAlumno
        nombreCompleto
	}
}
`;