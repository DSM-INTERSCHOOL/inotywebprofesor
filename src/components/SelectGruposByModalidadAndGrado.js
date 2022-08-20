import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useQuery } from '@apollo/react-hooks';
import { GRUPO_BY_MODALIDAD_AND_GRADO } from '../constants/graphql_queries/grupos_by_modalidad_and_grado';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

export const SelectGruposByModalidadAndGrado = ({ idModalidad, idGrado, idGrupo, onChangeGrupo }) => {
	const classes = useStyles();

	const { loading, error, data } = useQuery(GRUPO_BY_MODALIDAD_AND_GRADO, {
		variables: { idModalidadCarrera: idModalidad, idGrado: idGrado }
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel shrink htmlFor="age-native-label-placeholder">
					Grupo
				</InputLabel>
				<NativeSelect
					value={idGrupo}
					onChange={onChangeGrupo}
					inputProps={{
						name: 'idGrupo',
						id: 'grupo-native-label-placeholder'
					}}
				>
					<option value={''}>Todos</option>

					{data.gruposByIdModalidadCarreraAndIdGrado.map(({ idGrupo }) => (
						<option key={idGrupo} value={idGrupo}>
							{idGrupo}
						</option>
					))}
				</NativeSelect>
				<FormHelperText />
			</FormControl>
		</div>
	);
};
