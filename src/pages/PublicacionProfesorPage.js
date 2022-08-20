import React from 'react';
import { Layout } from '../components/UI/Layout';
import { HorizontalLinearStepper } from '../components/UI/HorizontalLinearStepper';

export const PublicacionProfesorPage = () => {

	return (

		<Layout>			
			<HorizontalLinearStepper tipoUsuario={'PROFESOR'} />			
		</Layout>

	
	);
};
