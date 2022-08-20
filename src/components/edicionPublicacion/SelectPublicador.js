import React, { useEffect } from 'react';
import {
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormLabel,
	InputLabel,
	NativeSelect,
	FormHelperText
} from '@material-ui/core';
import { useLazyQuery } from 'react-apollo';
import { getQueryUsuariosBy } from '../../utils/getQueryUsuariosByEstatus';

import { useState } from 'react';
import { getQueryProfesoresBy } from '../../utils/getQueryProfesoresBy';
import { Box, Grid } from '@material-ui/core';

export const SelectPublicador = ({ idUsuario, onChangeIdUsuario }) => {
	const [ tipoPublicador, setTipoPublicador ] = useState('');
	const [ listaPublicador, setListaPublicador ] = useState([]);

	const { query: queryUsuario, vars: varsUsuario, metodo: metodoUsuario } = getQueryUsuariosBy({ estatus: 'ACTIVO' });
	const [
		executeQueryUsuarios,
		{ loading: loadingUsuario, error: errorUsuario, data: dataUsuario }
	] = useLazyQuery(queryUsuario, {
		variables: varsUsuario,
		fetchPolicy: 'no-cache'
	});

	const { query: queryProfesor, vars: varsProfesor, metodo: metodoProfesor } = getQueryProfesoresBy({
		estatus: 'ACTIVO'
	});
	const [
		executeQueryProfesores,
		{ loading: loadingProfesor, error: errorProfesor, data: dataProfesor }
	] = useLazyQuery(queryProfesor, {
		variables: varsProfesor,
		fetchPolicy: 'no-cache'
	});

	const handleChangeTipoPublicador = (event) => {
		const { value } = event.target;
		setTipoPublicador(value);

		if (value === 'PROFESOR') {
			executeQueryProfesores();
		} else if (value === 'USUARIO') {
			executeQueryUsuarios();
		}
	};

	useEffect(
		() => {
			if (tipoPublicador === 'PROFESOR') {
				if (dataProfesor && dataProfesor[metodoProfesor]) {
					const listaProfesores = dataProfesor[metodoProfesor].map((p) => {
						return { id: p.idProfesor, nombreCompleto: p.nombreCompleto, tipo: 'PROFESOR' };
					});

					setListaPublicador(listaProfesores);
				}
			}

			if (tipoPublicador === 'USUARIO') {
				if (dataUsuario && dataUsuario[metodoUsuario]) {
					const listaUsuarios = dataUsuario[metodoUsuario].map((p) => {
						return { id: p.idUsuario, nombreCompleto: p.nombreCompleto, tipo: 'PROFESOR' };
					});
					setListaPublicador(listaUsuarios);
				}
			}
		},
		[ dataProfesor, dataUsuario ]
	);

	if (loadingProfesor) return <p>Cargando Profesores...</p>;
	if (errorProfesor) return <p>Error :({errorProfesor.message}</p>;

	if (loadingUsuario) return <p>Cargando usuarios...</p>;
	if (errorUsuario) return <p>Error :({errorUsuario.message}</p>;

	return (
		<div>
			<FormControl component="fieldset">
				<FormLabel component="legend">Tipo Publicador</FormLabel>
				<RadioGroup
					aria-label="Tipo Publicador"
					value={tipoPublicador}
					name="tipoPublicador"
					onChange={handleChangeTipoPublicador}
					row={true}
				>
                    <FormControlLabel value="" control={<Radio />} label="Todos"  />
					<FormControlLabel value="USUARIO" control={<Radio />} label="Usuario" />
					<FormControlLabel value="PROFESOR" control={<Radio />} label="Profesor" />
					<FormControlLabel value="ACADEMICO" control={<Radio />} label="Académico" />
				</RadioGroup>
				
				<NativeSelect
					value={idUsuario}
					inputProps={{
						name: 'idUsuario',
						id: 'modalidad-native-label-placeholder'
					}}
					onChange={onChangeIdUsuario}
				>
					<option value={''}>Todos</option>

					{listaPublicador.map(({ id, nombreCompleto }) => (
						<option key={id} value={id}>
							{nombreCompleto}
						</option>
					))}
				</NativeSelect>
				<FormHelperText />
			</FormControl>
		</div>
	);
};
