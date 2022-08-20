import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useQuery } from '@apollo/react-hooks';
import { MODALIDADES_BY_NIVEL } from '../constants/graphql_queries/modalidades_by_nivel';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

export const SelectModalidadesByNivel = ({ idNivel, idModalidad, onChangeModalidad }) => {
	const classes = useStyles();

	const { loading, error, data } = useQuery(MODALIDADES_BY_NIVEL, {
		variables: { idNivel: idNivel }
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel shrink htmlFor="age-native-label-placeholder">
					Modalidad/Carrera
				</InputLabel>
				<NativeSelect
					value={idModalidad}
					onChange={onChangeModalidad}
					inputProps={{
						name: 'idModalidad',
						id: 'modalidad-native-label-placeholder'
					}}
				>
					<option value={''}>Todos</option>

					{data.modalidadCarrerasByIdNivel.map(({ idModalidadCarrera, descripcion }) => (
						<option key={idModalidadCarrera} value={idModalidadCarrera}>
							{idModalidadCarrera+'  -  '+descripcion}
						</option>
					))}
				</NativeSelect>
				<FormHelperText />
			</FormControl>
		</div>
	);
};
