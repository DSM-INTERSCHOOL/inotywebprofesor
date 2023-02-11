import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_CICLOS_AND_NIVELES = gql`

query parentescosByCiclosAndNiveles($ciclos: [String!]!,$niveles: [String!]!,$tipos: [String!]!){
	parentescosByCiclosAndNiveles(ciclos: $ciclos,niveles: $niveles, tipos: $tipos){
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