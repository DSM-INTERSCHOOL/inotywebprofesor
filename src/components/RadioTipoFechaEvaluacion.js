import React from 'react'
import { FormControl, RadioGroup,FormControlLabel, Radio,FormLabel } from '@material-ui/core';

export const RadioTipoFechaEvaluacion= ({tipoFechaEvaluacion, onChangeTipoFechaEvaluacion})=> {
    return (
        <div>
            <FormControl component="fieldset">
            <FormLabel component="legend">Fecha Evaluación</FormLabel>
				<RadioGroup aria-label="Tipo Fecha" value={tipoFechaEvaluacion} row={true} name="tipoFechaEvaluacion" onChange={onChangeTipoFechaEvaluacion}>
					<FormControlLabel value="FECHA_PUBLICACION" control={<Radio />} label="Creación" />
					<FormControlLabel value="FECHA_VIGENCIA" control={<Radio />} label="Vigencia" />
					<FormControlLabel value="FECHA_MODIFICACION" control={<Radio />} label="Modificación" />
				</RadioGroup>
			</FormControl>
        </div>
    )
}
