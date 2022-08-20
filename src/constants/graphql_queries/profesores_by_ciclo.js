import { gql } from 'apollo-boost';

export const PROFESORES_BY_CICLO = gql`

query profesoresByCiclo($idCiclo: String!){
	profesoresByCiclo(idCiclo: $idCiclo){        
        idPersona
        idProfesor
        nombreCompleto
	}
}
`;