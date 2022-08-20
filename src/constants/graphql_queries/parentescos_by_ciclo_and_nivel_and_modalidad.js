import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_CICLO_AND_NIVEL_AND_MODALIDAD = gql`

query parentescosByCicloAndNivelAndModalidad($idCiclo: String!,$idNivel: String!,$idModalidad: String!,$tipos: [String!]!){
	parentescosByCicloAndNivelAndModalidad(idCiclo: $idCiclo, idNivel: $idNivel,idModalidad: $idModalidad, tipos: $tipos){        
                familiar{
                        idFamiliar
                        nombreCompleto    
                      }
                      persona{
                        idPersona
                        nombreCompleto
                      }
                      tipoParentesco
	}
}
`;