import React from 'react';
import { Layout } from '../components/UI/Layout';
import { HorizontalLinearStepper } from '../components/UI/HorizontalLinearStepper';

export const PublicacionPage = () => {

	return (

		<Layout>			
			<HorizontalLinearStepper tipoUsuario={'USUARIO'} context="meta" />			
		</Layout>

	
	);
};
