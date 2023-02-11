import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS = gql`

query parentescosByCiclosAndNivelesAndModalidadesAndGradosAndGrupos($ciclos: [String!]!,$niveles: [String!]!,$modalidades: [String!]!,$grados: [String!]!, $grupos: [String!]!, $tipos: [String!]!){
	parentescosByCiclosAndNivelesAndModalidadesAndGradosAndGrupos(ciclos: $ciclos,niveles: $niveles,modalidades: $modalidades,grados: $grados, grupos: $grupos, tipos: $tipos){
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