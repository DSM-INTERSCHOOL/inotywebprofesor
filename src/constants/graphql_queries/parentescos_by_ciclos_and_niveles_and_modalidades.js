import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES = gql`

query parentescosByCiclosAndNivelesAndModalidades($ciclos: [String!]!,$niveles: [String!]!,$modalidades: [String!]!,$tipos: [String!]!){
	parentescosByCiclosAndNivelesAndModalidades(ciclos: $ciclos,niveles: $niveles,modalidades: $modalidades, tipos: $tipos){
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