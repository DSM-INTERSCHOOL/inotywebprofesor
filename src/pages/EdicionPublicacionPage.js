import React, { useState } from 'react';
import { Layout } from '../components/UI/Layout';
import { EdicionPublicacionContainer } from '../components/edicionPublicacion/containers/EdicionPublicacionContainer';


export const EdicionPublicacionPage = () => {

	return (

		<Layout>			
           <EdicionPublicacionContainer tipoUsuario={'USUARIO'}/>
		</Layout>

	
	);
};
