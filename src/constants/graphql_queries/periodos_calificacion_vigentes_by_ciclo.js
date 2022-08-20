import { gql } from 'apollo-boost';

export const PERIODOS_BY_CICLO = gql`
	query periodoVigentesByCiclo($idCiclo: String!) {
        periodoVigentesByCiclo(idCiclo: $idCiclo) {
			periodo
            ciclo {
            idCiclo
            }
            descripcion
        }
	}
`;

