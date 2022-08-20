import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFiltros, setPublicacionRequiereAutorizacion } from '../../store/actions/publicacionActions';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';
import { FormControlLabel } from '@material-ui/core';
import { getAccountById } from '../../services/cuentas';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200
	}
}));

export const Filtros = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const filtros = useSelector((state) => state.publicaciones.filtros);
	const tipoPublicacion = useSelector((state) => state.publicaciones.tipoPublicacion);
	const idAccount = useSelector((state) => state.publicaciones.idAccount);
	const publicacionRequiereAutorizacion = useSelector((state) => state.publicaciones.publicacionRequiereAutorizacion);
	 

	const handleChange = (event) => {
		dispatch(
			setFiltros({
				...filtros,
				aceptaComentarios: event.target.checked
			})
		);
	};

	const handleChangeAutorizado = (event) => {
		dispatch(
			setFiltros({
				...filtros,
				autorizado: event.target.checked
			})
		);
	};

	useEffect( () => {
		if (filtros.fechaInicialPublicacion == '') {
			let fechaInicio = moment().toDate();
			let fechaFinal = moment().add(1, 'M').toDate();
			let fechaEvento = moment().toDate();

			fechaInicio.setSeconds(0);
			fechaInicio.setMilliseconds(0);

			fechaFinal.setSeconds(0);
			fechaFinal.setMilliseconds(0);

			fechaEvento.setMinutes(0);
			fechaEvento.setSeconds(0);
			fechaEvento.setMilliseconds(0);

			async function fetchCuenta() {
				
				const cuenta = await getAccountById();
				if (cuenta) {
					if (
						cuenta.hasOwnProperty('publicacionRequiereAutorizacion') &&
						cuenta.publicacionRequiereAutorizacion === false
					) {
						dispatch(setPublicacionRequiereAutorizacion(false));
					}
				}
				
			  }
			  fetchCuenta();

			

			dispatch(
				setFiltros({
					...filtros,
					fechaInicialPublicacion: moment(fechaInicio).format(),
					fechaFinalPublicacion: moment(fechaFinal).format(),
					fechaHoraEvento: moment(fechaEvento).format(),
					fechaHoraEntrega: moment(fechaFinal).format()
					
				})
			);
			
		}
	}, []);

	function handleFechaInicioChange(event) {
		try {
			dispatch(
				setFiltros({
					...filtros,
					fechaInicialPublicacion: moment(event.target.value).format()
				})
			);
		} catch (err) {
			console.log('err', err);
		}
	}

	function handleFechaFinalChange(event) {
		try {
			dispatch(
				setFiltros({
					...filtros,
					fechaFinalPublicacion: moment(event.target.value).format()
				})
			);
		} catch (err) {
			console.log('err', err);
		}
	}

	function handleFechaHoraEventoChange(event) {
		try {
			let fechaFinal = moment(event.target.value).add(6, 'h').toDate();
			dispatch(
				setFiltros({
					...filtros,
					fechaHoraEvento: moment(event.target.value).format(),
					fechaFinalPublicacion: moment(fechaFinal).format()
				})
			);
		} catch (err) {
			console.log('err', err);
		}
	}

	function handleFechaHoraEntregaChange(event) {
		try {
			let fechaFinal = moment(event.target.value).add(6, 'h').toDate();
			dispatch(
				setFiltros({
					...filtros,
					fechaHoraEntrega: moment(event.target.value).format(),
					fechaFinalPublicacion: moment(fechaFinal).format()
				})
			);
		} catch (err) {
			console.log('err', err);
		}
	}

	function handleLugarChange(event) {
		try {
			dispatch(
				setFiltros({
					...filtros,
					lugarEvento: event.target.value
				})
			);
		} catch (err) {
			console.log('err', err);
		}
	}

	return (
		<div style={{ marginTop: 15 }}>
			<form className={classes.container} noValidate>
				<TextField
					id="datetimeInicial"
					label="Inicio Publicación"
					type="datetime-local"
					value={moment(filtros.fechaInicialPublicacion).format('YYYY-MM-DDTHH:mm')}
					className={classes.textField}
					InputLabelProps={{
						shrink: true
					}}
					onChange={handleFechaInicioChange}
				/>

				{tipoPublicacion === 'avisos' && (
					<TextField
						id="datetimeFinal"
						label="Fin Publicación"
						type="datetime-local"
						value={moment(filtros.fechaFinalPublicacion).format('YYYY-MM-DDTHH:mm')}
						className={classes.textField}
						InputLabelProps={{
							shrink: true
						}}
						onChange={handleFechaFinalChange}
					/>
				)}

				{tipoPublicacion === 'eventos' && (
					<TextField
						id="datetimeEvento"
						label="Fecha/Hora Evento"
						type="datetime-local"
						value={moment(filtros.fechaHoraEvento).format('YYYY-MM-DDTHH:mm')}
						className={classes.textField}
						InputLabelProps={{
							shrink: true
						}}
						onChange={handleFechaHoraEventoChange}
					/>
				)}

				{tipoPublicacion === 'eventos' && (
					<TextField
						id="standard-basic"
						label="Lugar del Evento"
						value={filtros.lugarEvento}
						onChange={handleLugarChange}
					/>
				)}

				{tipoPublicacion === 'tareas' && (
					<TextField
						id="datetimeEntrega"
						label="Fecha/Hora Entrega"
						type="datetime-local"
						value={moment(filtros.fechaHoraEntrega).format('YYYY-MM-DDTHH:mm')}
						className={classes.textField}
						InputLabelProps={{
							shrink: true
						}}
						onChange={handleFechaHoraEntregaChange}
					/>
				)}

				<FormControlLabel
					control={
						<Checkbox
							checked={filtros.aceptaComentarios}
							onChange={handleChange}
							inputProps={{ 'aria-label': 'primary checkbox' }}
						/>
					}
					label="Acepta comentarios"
				/>

				<FormControlLabel
					control={
						<Checkbox
							checked={filtros.autorizado}
							onChange={handleChangeAutorizado}
							inputProps={{ 'aria-label': 'primary checkbox' }}
							disabled={publicacionRequiereAutorizacion}
							
						/>
					}
					label="Publicación Autorizada"
				/>
			</form>
		</div>
	);
};
