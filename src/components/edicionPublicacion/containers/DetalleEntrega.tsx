import React, { useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { putContenedor } from '../../../services/publicaciones';
import moment from 'moment';
import { IEntrega } from '../ListaEntrega/Entrega.interface';

interface Props{
	entrega: IEntrega;
}

// 0: "01fcfed6-055e-479b-b575-b9ec18e0d515"
// 1: "CNH_219132"
// 2: "THIAGO ACOSTA MONTERO"
// 3: {$$typeof: Symbol(react.element), type: 'div', key: null, ref: null, props: {…}, …}
// 4: "Ok"
// 5: "ENTREGADA"
// 6: undefined
// 7: undefined
// 8: []

export const DetalleEntrega: React.FC<Props> = ({ entrega }) => {
	
	const [ comentario, setComentario ] = React.useState('');
    const [ calificacion, setCalificacion ] = React.useState('');
    const [saved,setSave] = React.useState(true);

	// useEffect(() => {
	// 	setComentario(entrega);
	// 	setCalificacion(rowData[7]);
	// }, []);

	const handleChangeComentario = (event: any) => {
        setComentario(event.target.value);
        setSave(false);
	};

	const handleChangeCalificacion = (event: any) => {
        setCalificacion(event.target.value);
        setSave(false);
	};

	const handleClickSave = async () => {
		try {
			const contenedor = {
				comentario: comentario,
				calificacion: calificacion,
                estatus: 'CALIFICADO',
                ultimaRevision: moment().format()
			};
            await putContenedor(entrega.idPublicacion, entrega.id, 'entregas', contenedor);
            setSave(true);
			setCalificacion('');
			setComentario('');
		} catch (err: any) {
			console.log('err', err.message);
		}
	};


	return (
		<div style={{marginTop: 15, display: 'flex', flexDirection: 'column'}}>
			<form noValidate autoComplete="off">
				<div  style={{ display: 'flex', flexDirection: 'column'}}>
					<TextField
						id="outlined-multiline-static"
						label="Comentario"
						multiline
						rows={5}
						variant="outlined"
                        value={comentario}
                        style={{marginTop: 7}}
						onChange={handleChangeComentario}
					/>
					<TextField
						id="outlined-multiline-flexible"
                        style={{marginTop: 7}}
						label="Calificación"
						value={calificacion}
						onChange={handleChangeCalificacion}
						variant="outlined"
					/>
					<Button
						variant="contained"
						color="primary"
                        style={{marginTop: 7}}
                        size="small"
                        disabled={saved}
						onClick={handleClickSave}
						startIcon={<SaveIcon />}
					/>
				</div>
			</form>
		</div>
	);
};
