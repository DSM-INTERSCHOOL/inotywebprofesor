import React from 'react';
import { FormControl, RadioGroup,FormControlLabel, Radio,FormLabel } from '@material-ui/core';

export const RadioTipoPublicacion = ({ tipoPublicacion, onChangeTipoPublicacion, tipoUsuario })=> {
	return (
		<div>
			<FormControl component="fieldset">
            <FormLabel component="legend" >Tipo Publicación</FormLabel>
				<RadioGroup aria-label="Tipo de Publicación" row={true} value={tipoPublicacion} name="tipoPublicacion" onChange={onChangeTipoPublicacion}>                    
					<FormControlLabel value="avisos" control={<Radio />} label="Avisos" />
					<FormControlLabel value="tareas" control={<Radio />} label="Tareas" />
					<FormControlLabel value="cuestionarios" control={<Radio />} label="Cuestionarios" />
					{tipoUsuario==='USUARIO' && <FormControlLabel value="eventos" control={<Radio />} label="Evento" />}
				</RadioGroup>
			</FormControl>
		</div>
	);
}
