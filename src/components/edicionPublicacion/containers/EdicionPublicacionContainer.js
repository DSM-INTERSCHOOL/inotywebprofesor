import React, { useState, useEffect } from 'react';
import { RadioTipoPublicacion } from '../../RadioTipoPublicacion';
import { RadioTipoFechaEvaluacion } from '../../RadioTipoFechaEvaluacion';
import { FechaRangoPicker } from '../../FechaRangoPicker';
import { SelectPublicador } from '../SelectPublicador';
import moment from 'moment';
import { getDestinatariosByIdPublicacion, getPublicacion } from '../../../services/publicaciones';
import { Button, FormControlLabel, Switch } from '@material-ui/core';
import { DataTablePublicacion } from '../DataTablePublicacion';
import { arrayOfObjectsToTableForm } from '../../../utils/arrayOfObjectsToTableForm';
import { Box, Grid } from '@material-ui/core';
import { RadioTipoAutorizacion } from '../RadioTipoAutorizacion';
import { getDestinatariosByIdQuiz, getQuiz } from '../../../services/quiz';

export const EdicionPublicacionContainer = ({tipoUsuario}) => {
	const [ tipoPublicacion, setTipoPublicacion ] = useState('avisos');
	const [ tipoAutorizacion, setTipoAutorizacion ] = useState('TODAS');
	const [ tipoFechaEvaluacion, setTipoFechaEvaluacion ] = useState('FECHA_PUBLICACION');
	const [ fechaInicial, setFechaInicial ] = useState('');
	const [ fechaFinal, setFechaFinal ] = useState('');
	const [ idUsuario, setIdUsuario ] = useState('');
    const [ tableRows, setTableRows ] = useState([]);
    
    //const [ tableFields, setTableFields ] = useState([]);

   	

	

	useEffect(() => {
		if (fechaInicial === '' || fechaFinal === '') {
			let fInicio = moment().startOf('month').toDate();
			let fFinal = moment().endOf('month').toDate();

			fInicio.setHours(0);
			fInicio.setMinutes(0);
			fInicio.setSeconds(0);

			fFinal.setHours(23);
			fFinal.setMinutes(59);
			fFinal.setSeconds(59);

			setFechaInicial(moment(fInicio).format('YYYY-MM-DDTHH:mm'));
			setFechaFinal(moment(fFinal).format('YYYY-MM-DDTHH:mm'));
		}
    }, []);
    

  

	const handleChangeTipoAutorizacion = (e) => {
		setTipoAutorizacion(e.target.value);
	};

	const handleChangeTipoPublicacion = (e) => {
		setTipoPublicacion(e.target.value);
	};
	const handleChangeTipoFechaEvaluacion = (e) => {
		setTipoFechaEvaluacion(e.target.value);
	};

	const handleChangeFechaInicial = (event) => {
		setFechaInicial(event.target.value);
	};

	const handleChangeFechaFinal = (event) => {
		setFechaFinal(event.target.value);
	};

	const handleChangeIdUsuario = (event) => {
		setIdUsuario(event.target.value);
	};



	const handleClickGetPublicaciones = async () => {
		try {
			const inicialFormat = moment(fechaInicial).format();
			const finalFormat = moment(fechaFinal).format();

			let filtros = {};

			switch (tipoFechaEvaluacion) {
				case 'FECHA_PUBLICACION':
					filtros.fCreacionInicial = inicialFormat;
					filtros.fCreacionFinal = finalFormat;
					break;
				case 'FECHA_VIGENCIA':
					filtros.fPublicacionInicial = inicialFormat;
					filtros.fPublicacionFinal = finalFormat;
					break;
				case 'FECHA_MODIFICACION':
					filtros.fModificacionInicial = inicialFormat;
					filtros.fModificacionFinal = finalFormat;
					break;
				default:
					filtros.fPublicacionInicial = inicialFormat;
					filtros.fPublicacionFinal = finalFormat;
					break;
			}

			switch (tipoAutorizacion) {
				case 'AUTORIZADAS': {
					filtros.autorizadas = true;
					break;
				}
				case 'SIN_AUTORIZAR': {
					filtros.autorizadas = false;
					break;
				}
				default:
					break;
            }
		
			if (idUsuario && idUsuario !== '') {
				filtros.idUsuario = idUsuario;
			}

			// Tipo de publicacion puede ser 'avisos', 'tareas' o 'cuestionarios'

			const publicaciones = await getPublicacion(tipoPublicacion, filtros);
			console.log('publicaciones', publicaciones);

			const rowsWithDestinatarios = await Promise.all(publicaciones.map(async element => {
				try{
				const destinatarios = await getDestinatariosByIdPublicacion(element.id)
				element.destinatarios = destinatarios
				return element
				}catch(err){
					console.log("error map");
					console.log(err);
				}

			}));
			console.log(rowsWithDestinatarios);
            setTableRows(rowsWithDestinatarios);
            
		} catch (err) {
			console.log('err', err);
		}
	};

	return (
		<div>
			<Box>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12} md={6} lg={6}>
						<RadioTipoPublicacion
							tipoPublicacion={tipoPublicacion}
							onChangeTipoPublicacion={handleChangeTipoPublicacion}
							tipoUsuario={tipoUsuario}
						/>
					</Grid>

                    <Grid item xs={12} sm={12} md={6}>
						<RadioTipoAutorizacion
							tipoAutorizacion={tipoAutorizacion}
							onChangeTipoAutorizacion={handleChangeTipoAutorizacion}
						/>
					</Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
						<RadioTipoFechaEvaluacion
							tipoFechaEvaluacion={tipoFechaEvaluacion}
							onChangeTipoFechaEvaluacion={handleChangeTipoFechaEvaluacion}
						/>
					</Grid>

					<Grid item xs={12} sm={12} md={6} lg={6}>
						<FechaRangoPicker
							fechaInicial={fechaInicial}
							fechaFinal={fechaFinal}
							onChangeFechaInicial={handleChangeFechaInicial}
							onChangeFechaFinal={handleChangeFechaFinal}
						/>
					</Grid>

					<Grid item xs={12} sm={12} md={6} lg={6}>
						{tipoUsuario==='USUARIO' && <SelectPublicador idUsuario={idUsuario} onChangeIdUsuario={handleChangeIdUsuario} />}
						
					</Grid>
					

				

					<Grid item xs={12} sm={12} md={6}>
						<Button variant="contained" color="primary" onClick={handleClickGetPublicaciones}>
							Consultar
						</Button>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<DataTablePublicacion
							rows={tableRows}
							setTableRows={setTableRows}
							tipoPublicacion={tipoPublicacion}
						/>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};
