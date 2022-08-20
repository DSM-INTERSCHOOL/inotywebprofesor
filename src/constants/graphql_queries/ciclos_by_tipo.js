import { gql } from 'apollo-boost';

export const CICLOS_BY_TIPO = gql`

query CiclosByTipoCicloOrderByFechaInicioDesc($tipo: String!){
	ciclosByTipoCicloOrderByFechaInicioDesc(tipo: $tipo){
	  idCiclo
	  descripcion
	}
}
`;