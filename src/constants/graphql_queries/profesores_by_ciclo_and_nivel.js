import { gql } from 'apollo-boost';

export const PROFESORES_BY_CICLO_AND_NIVEL = gql`

query profesoresByCicloAndNivel($idCiclo: String!,$idNivel: String!){
	profesoresByCicloAndNivel(idCiclo: $idCiclo, idNivel: $idNivel){        
        idPersona
        idProfesor
        nombreCompleto
	}
}
`;