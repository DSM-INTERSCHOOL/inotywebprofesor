import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { TIPOS_PARENTESCO } from '../constants/graphql_queries/tipos_parentesco';


import { ListaTipoParentescos } from './UI/ListaTipoParentescos';



export const SelectTipoParentesco = () => {
	
	

	const { loading, error, data } = useQuery(TIPOS_PARENTESCO);




	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;



	return (
		
			<ListaTipoParentescos tipoParentescos={data.tipoParentescosOrder}/>
			
		
	);
};
