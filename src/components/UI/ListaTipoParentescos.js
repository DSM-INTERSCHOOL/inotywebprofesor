import React, { useState, useEffect } from 'react';
import { FormControl, FormGroup, FormControlLabel, FormHelperText, FormLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setTipoParentescos } from '../../store/actions/publicacionActions';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	formControl: {
		margin: 5
	}
}));

export const ListaTipoParentescos = ({ tipoParentescos }) => {
	const parentescos = useSelector((state) => state.publicaciones.tipoParentescos);

	const dispatch = useDispatch();

	const classes = useStyles();

	const error = parentescos.filter((v) => v.checked).length < 1;

	
	const handleChange = (tipo) => {
	//	console.log('tipo', tipo);
		dispatch(
			setTipoParentescos(
				parentescos.map((t) => {
					if (t.tipo === tipo.tipo) {
						t.checked = !t.checked;
						return t;
					}
					return t;
				})
			)
		);
	};

	useEffect(() => {
		if (parentescos.length === 0) {
			dispatch(
				setTipoParentescos(
					tipoParentescos.map((tipo) => {
						return { tipo: tipo.tipoParentesco, checked: false };
					})
				)
			);
		}
	}, []);

	return (
		<div className={classes.root}>
			<FormControl required error={error} component="fieldset" className={classes.formControl}>
				<FormLabel component="legend">Tipo Parentesco</FormLabel>
				<FormGroup>
					{parentescos.map((tipo) => (
						<FormControlLabel
							key={tipo.tipo}
							control={
								<Checkbox value={tipo.checked} checked={tipo.checked} name={tipo.tipo} onClick={() => handleChange(tipo)} />
							}
							label={tipo.tipo}
						/>
					))}
				</FormGroup>
				<FormHelperText>Seleccione al menos 1 Parentesco</FormHelperText>
			</FormControl>
		</div>
	);
};
