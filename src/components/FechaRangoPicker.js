import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


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


export const FechaRangoPicker = ({ fechaInicial, fechaFinal, onChangeFechaInicial, onChangeFechaFinal }) => {
    const classes = useStyles();
	return (
		<div>
			<form className={classes.container} noValidate>
				<TextField
					id="fechaInicial"
					label="Fecha Inicial"
					type="datetime-local"
                    value={fechaInicial}
                    defaultValue={fechaInicial}
					className={classes.textField}
					InputLabelProps={{
						shrink: true
					}}
					onChange={onChangeFechaInicial}
				/>

				<TextField
					id="fechaFinal"
					label="Fecha Final"
					type="datetime-local"
                    value={fechaFinal}
                    defaultValue ={fechaFinal}
					className={classes.textField}
					InputLabelProps={{
						shrink: true
					}}
					onChange={onChangeFechaFinal}
				/>
			</form>
		</div>
	);
};
