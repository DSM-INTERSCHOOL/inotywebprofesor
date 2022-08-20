import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useQuery } from '@apollo/react-hooks';
import { NIVELES_BY_USUARIO } from '../constants/graphql_queries/niveles_by_usuario';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

export const SelectNivelesByIdUsuario = (props) => {
	const classes = useStyles();

	const { loading, error, data } = useQuery(NIVELES_BY_USUARIO, {
		variables: { idUsuario: props.idUsuario }
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div>

<FormControl className={classes.formControl}>
				<InputLabel shrink htmlFor="age-native-label-placeholder">
					Nivel
				</InputLabel>
				<NativeSelect
					value={props.idNivel} onChange={props.onChangeNivel}
					inputProps={{
						name: 'idNivel',
						id: 'nivel-native-label-placeholder'
					}}
				>
					<option value={''}>Todos</option>

					{data.nivelesByIdUsuario.map(({ idNivel, descripcion }) => (
					<option key={idNivel} value={idNivel}>
						{idNivel+'  -  '+descripcion}
					</option>
				))}
				</NativeSelect>
				<FormHelperText />
			</FormControl>


		
		</div>
	);
};
