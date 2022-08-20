import { gql } from 'apollo-boost';

export const TIPOS_PARENTESCO = gql`
	query tipoParentescosOrder {
		tipoParentescosOrder {
			tipoParentesco
		}
	}
`;
