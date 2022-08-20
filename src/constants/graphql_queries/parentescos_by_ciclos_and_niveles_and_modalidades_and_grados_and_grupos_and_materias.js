import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS_AND_MATERIAS = gql`

query parentescosByCiclosAndNivelesAndModalidadesAndGradosAndGruposAndMaterias($ciclos: [String!]!,$niveles: [String!]!,$modalidades: [String!]!,$grados: [String!]!, $grupos: [String!]!, $materias: [String!]!,$tipos: [String!]!){
	parentescosByCiclosAndNivelesAndModalidadesAndGradosAndGruposAndMaterias(ciclos: $ciclos,niveles: $niveles,modalidades: $modalidades,grados: $grados, grupos: $grupos, materias: $materias, tipos: $tipos){
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