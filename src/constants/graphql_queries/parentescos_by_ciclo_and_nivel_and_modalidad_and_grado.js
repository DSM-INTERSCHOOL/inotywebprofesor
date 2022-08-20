import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO = gql`

query parentescosByCicloAndNivelAndModalidadAndGrado($idCiclo: String!,$idNivel: String!,$idModalidad: String!,$idGrado: String!,$tipos: [String!]!){
	parentescosByCicloAndNivelAndModalidadAndGrado(idCiclo: $idCiclo, idNivel: $idNivel,idModalidad: $idModalidad, idGrado: $idGrado, tipos: $tipos){        
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