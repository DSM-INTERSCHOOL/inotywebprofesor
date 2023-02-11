import { gql } from 'apollo-boost';

export const CICLOS_BY_TIPO = gql`
query CiclosActualesAndTipo($tipo: String!){
	ciclosActualesAndTipo(tipo: $tipo){
	  idCiclo
	  descripcion
	}
}
`;