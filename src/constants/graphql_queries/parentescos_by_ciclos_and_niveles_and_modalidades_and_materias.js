import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_MATERIAS = gql`

query parentescosByCiclosAndNivelesAndModalidadesAndMaterias($ciclos: [String!]!,$niveles: [String!]!,$modalidades: [String!]!, $materias: [String!]!,$tipos: [String!]!){
	parentescosByCiclosAndNivelesAndModalidadesAndMaterias(ciclos: $ciclos,niveles: $niveles,modalidades: $modalidades, materias: $materias, tipos: $tipos){
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