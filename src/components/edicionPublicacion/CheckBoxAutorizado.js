import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { updateAutorizacionPublicacion } from '../../services/publicaciones';

export const CheckBoxAutorizado = ({ idPublicacion, value, tableRows, setTableRows }) => {
	

	const handleClick = () => {
       
		if (window.confirm('Está seguro de cambiar la Autorización?')) {
			try {
				const newTableRows = tableRows.map( (element) => {
       
					if (element.id === idPublicacion) {
                        const filtro = { value: !element.autorizado };       
						 updateAutorizacionPublicacion(idPublicacion, filtro);
						element.autorizado = !element.autorizado;
					}
					return element;
				});
				setTableRows(newTableRows);
			} catch (err) {
				console.log('error ' + err);
			}
		}
    };
    
    

	return (
		<FormGroup style={{width: 40}}>
			<FormControlLabel control={<Switch size="small" checked={value} />} onClick={handleClick} />
		</FormGroup>
	);
};
