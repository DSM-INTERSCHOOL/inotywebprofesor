import { gql } from 'apollo-boost';

export const PROFESORES_BY_CICLO_AND_NIVEL_AND_MODALIDAD = gql`

query profesoresByCicloAndNivelAndModalidad($idCiclo: String!,$idNivel: String!,$idModalidad: String!){
	profesoresByCicloAndNivelAndModalidad(idCiclo: $idCiclo, idNivel: $idNivel,idModalidad: $idModalidad){        
        idPersona
        idProfesor
        nombreCompleto
	}
}
`;