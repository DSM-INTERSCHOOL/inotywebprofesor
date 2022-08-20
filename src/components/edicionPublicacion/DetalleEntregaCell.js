import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TablaEntregas } from './TablaEntregas';

const useStyles = makeStyles((theme) => ({
	detalle: {
		color: 'blue',
		'&:hover': { cursor: 'pointer' }
	},
	paper: {
		position: 'absolute',
		width: 600,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		outline: 0
	}
}));

export const DetalleEntregaCell = ({idPublicacion, value, onOpen }) => {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);
	const [ rows, setRows ] = React.useState([]);

	const handleOpen = async () => {
		try {
			const result = await onOpen();			
			console.log('result', result)
			setRows(result);			
			setOpen(true);
		} catch (err) {
			console.log('err', err);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={{ outline: 0 }} className={classes.paper}>
			<TablaEntregas idPublicacion={idPublicacion} rows={rows} />
		</div>
	);

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<span className={classes.detalle} onClick={handleOpen}>
				{value}
			</span>

			<Modal
				style={{ outline: 0, border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				open={open}
				onClose={handleClose}
			>
				{body}
			</Modal>
		</div>
	);
};
