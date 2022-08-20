import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS = gql`

query parentescosByIdProfesorAndCiclosAndMaterias($idProfesor: String!, $ciclos: [String!]!,$materias: [String!]!, $tipos:[String!]!){
	parentescosByIdProfesorAndCiclosAndMaterias(idProfesor: $idProfesor, ciclos: $ciclos, materias: $materias,tipos: $tipos){        
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