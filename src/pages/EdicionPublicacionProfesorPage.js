import React, { useState } from 'react';
import { Layout } from '../components/UI/Layout';
import { EdicionPublicacionContainer } from '../components/edicionPublicacion/containers/EdicionPublicacionContainer';


export const EdicionPublicacionProfesorPage = () => {

	return (

		<Layout>			
           <EdicionPublicacionContainer tipoUsuario={'PROFESOR'}/>
		</Layout>

	
	);
};