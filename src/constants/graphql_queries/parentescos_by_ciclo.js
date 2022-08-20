import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_CICLO = gql`

query parentescosByCiclo($idCiclo: String!,$tipos: [String!]!){
	parentescosByCiclo(idCiclo: $idCiclo, tipos: $tipos){        
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