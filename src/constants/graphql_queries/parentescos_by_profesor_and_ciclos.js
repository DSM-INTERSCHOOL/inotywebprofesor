import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_PROFESOR_AND_CICLOS = gql`

query parentescosByIdProfesorAndCiclos($idProfesor: String!, $ciclos: [String!]!, $tipos:[String!]!){
	parentescosByIdProfesorAndCiclos(idProfesor: $idProfesor, ciclos: $ciclos,tipos: $tipos){        
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