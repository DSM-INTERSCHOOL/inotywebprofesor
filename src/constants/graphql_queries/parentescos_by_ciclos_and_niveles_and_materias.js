import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MATERIAS = gql`

query parentescosByCiclosAndNivelesAndMaterias($ciclos: [String!]!,$niveles: [String!]!, $materias: [String!]!,$tipos: [String!]!){
	parentescosByCiclosAndNivelesAndMaterias(ciclos: $ciclos,niveles: $niveles, materias: $materias, tipos: $tipos){
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