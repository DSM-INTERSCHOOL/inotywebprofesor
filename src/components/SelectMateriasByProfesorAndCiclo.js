import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useQuery } from '@apollo/react-hooks';
import { MATERIAS_BY_PROFESOR_AND_CICLO } from '../constants/graphql_queries/materias_by_profesor_and_ciclo';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

export const SelectMateriasByProfesorAndCiclo = ({
	idProfesor,
	idCiclo,
	idMateria,
	tipoPublicacion,
	onChangeMateria
}) => {
	const classes = useStyles();

	const { loading, error, data } = useQuery(MATERIAS_BY_PROFESOR_AND_CICLO, {
		variables: { idProfesor: idProfesor, idCiclo: idCiclo }
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	console.log(tipoPublicacion)
	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel shrink htmlFor="age-native-label-placeholder">
					Materia
				</InputLabel>
				<NativeSelect
					value={idMateria}
					onChange={onChangeMateria}
					inputProps={{
						name: 'idMateria',
						id: 'materia-native-label-placeholder'
					}}
				>
					{tipoPublicacion === 'tareas' ? (						
							<option value={''}>Seleccione</option>						
					): <option value={''}>Todas</option>						}

					{data.materiasByIdCicloAndIdProfesor
						.reduce(function(acc, curr) {
							if (acc.length === 0 || !acc.some((el) => el.idMateria === curr.idMateria)) {
								acc.push(curr);
							}
							return acc;
						}, [])
						.map(({ idMateria, descripcion }) => (
							<option key={idMateria} value={idMateria}>
								{idMateria + ':' + descripcion}
							</option>
						))}
				</NativeSelect>
				<FormHelperText />
			</FormControl>
		</div>
	);
};
