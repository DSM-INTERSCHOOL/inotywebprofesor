import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_MATERIAS = gql`

query parentescosByCiclosAndNivelesAndModalidadesAndGradosAndMaterias($ciclos: [String!]!,$niveles: [String!]!,$modalidades: [String!]!,$grados: [String!]!, $materias: [String!]!,$tipos: [String!]!){
	parentescosByCiclosAndNivelesAndModalidadesAndGradosAndMaterias(ciclos: $ciclos,niveles: $niveles,modalidades: $modalidades,grados: $grados, materias: $materias, tipos: $tipos){
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