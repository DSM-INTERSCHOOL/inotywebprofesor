import { gql } from 'apollo-boost';

export const PROFESORES_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO = gql`

query profesoresByCicloAndNivelAndModalidadAndGrado($idCiclo: String!,$idNivel: String!,$idModalidad: String!,$idGrado: String!){
	profesoresByCicloAndNivelAndModalidadAndGrado(idCiclo: $idCiclo, idNivel: $idNivel,idModalidad: $idModalidad, idGrado: $idGrado){        
        idPersona
        idProfesor
        nombreCompleto
	}
}
`;