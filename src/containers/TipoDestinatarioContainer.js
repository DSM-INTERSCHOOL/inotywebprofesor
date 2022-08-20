import React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {	
	setTipoDestinatario
	
} from '../store/actions/publicacionActions';
export const TipoDestinatarioContainer = ({tipoUsuario}) => {

	const dispatch = useDispatch();
	const tipoDestinatario = useSelector((state) => state.publicaciones.tipoDestinatario);
	const tipoPublicacion = useSelector((state) => state.publicaciones.tipoPublicacion);

	const handletipoDestinatario = (e) => {
		dispatch(setTipoDestinatario(e.target.value));		
	};

	return (
		<div>
			<FormControl component="fieldset">
				<RadioGroup aria-label="Tipo" row={true}  name="tipoPersona" value={tipoDestinatario} onChange={handletipoDestinatario}>
					<FormControlLabel value="ALUMNOS" control={<Radio />} label="Alumnos" />
					<FormControlLabel value="FAMILIARES" control={<Radio />} label="Familiares" />
					<FormControlLabel value="ALUMNOS & FAMILIARES" control={<Radio />} label="Alumnos & Familiares" />					
					{(tipoPublicacion !== 'tareas' && tipoUsuario==='USUARIO' )&& <FormControlLabel value="PROFESORES" control={<Radio />} label="Profesores" />}
					{(tipoPublicacion !== 'tareas' && tipoUsuario==='USUARIO' )  && <FormControlLabel value="USUARIOS" control={<Radio />} label="Usuarios" />}					
					
				</RadioGroup>
			</FormControl>
		</div>
	);
};
