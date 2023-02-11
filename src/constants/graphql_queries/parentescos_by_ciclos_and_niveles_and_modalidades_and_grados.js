import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS = gql`

query parentescosByCiclosAndNivelesAndModalidadesAndGrados($ciclos: [String!]!,$niveles: [String!]!,$modalidades: [String!]!,$grados: [String!]!, $tipos: [String!]!){
	parentescosByCiclosAndNivelesAndModalidadesAndGrados(ciclos: $ciclos,niveles: $niveles,modalidades: $modalidades,grados: $grados, tipos: $tipos){
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