import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { SimpleTableView } from '../SimpleTableView';


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

export const DetalleCell = ({ value, columns, onOpen, idPublicacion, tableRows, setTableRows }) => {
	const classes = useStyles();

	
	
	const [ open, setOpen ] = React.useState(false);
	const [ rows, setRows ] = React.useState([]);

	const handleOpen = async () => {
		setOpen(true);
		const result = await onOpen();	
		setRows(result);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={{outline: 0}}
			
			className={classes.paper}
		>
			<SimpleTableView columns={columns} rows={rows} setRows={setRows} idPublicacion={idPublicacion} tableRows={tableRows} setTableRows={setTableRows}/>
			<DetalleCell />
		</div>
	);

	//console.log('tableMeta', tableMeta);
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<span className={classes.detalle} onClick={handleOpen}>
				{value}
			</span>

			<Modal style={{ outline: 0,border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
};
