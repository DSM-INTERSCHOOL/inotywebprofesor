import { gql } from 'apollo-boost';

export const PARENTESCOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS_AND_GRUPOS = gql`

query parentescosByIdProfesorAndCiclosAndMateriasAndGrupos($idProfesor: String!, $ciclos: [String!]!,$materias: [String!]!, $tipos:[String!]!, $grupos:[String!]!){
	parentescosByIdProfesorAndCiclosAndMateriasAndGrupos(idProfesor: $idProfesor, ciclos: $ciclos, materias: $materias,tipos: $tipos, grupos: $grupos){        
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