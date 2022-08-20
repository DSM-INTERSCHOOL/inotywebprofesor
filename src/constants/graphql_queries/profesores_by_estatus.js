import { gql } from 'apollo-boost';

export const PROFESORES_BY_ESTATUS = gql`

query profesoresByEstatus($estatus: String!){
	profesoresByEstatus(estatus: $estatus){        
        idPersona
        idProfesor
        nombreCompleto
	}
}
`;