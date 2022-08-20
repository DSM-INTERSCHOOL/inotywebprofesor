import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_CICLO_AND_NIVEL = gql`

query parentescosByCicloAndNivel($idCiclo: String!,$idNivel: String!,$tipos: [String!]!){
	parentescosByCicloAndNivel(idCiclo: $idCiclo, idNivel: $idNivel, tipos: $tipos){        
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