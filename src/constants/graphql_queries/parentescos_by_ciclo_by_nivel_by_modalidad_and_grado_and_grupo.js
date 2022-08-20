import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO_AND_GRUPO = gql`

query parentescosByCicloAndNivelAndModalidadAndGradoAndGrupo($idCiclo: String!,$idNivel: String!,$idModalidad: String!,$idGrado: String!, $idGrupo: String!,$tipos: [String!]!){
	parentescosByCicloAndNivelAndModalidadAndGradoAndGrupo(idCiclo: $idCiclo, idNivel: $idNivel,idModalidad: $idModalidad, idGrado: $idGrado, idGrupo: $idGrupo, tipos: $tipos){        
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