import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { deleteDestinatariosPublicacion } from '../services/publicaciones';

/*
const columns = [
	{ id: 'idUsuario', label: 'IdUsuario', minWidth: 50 },
	{ id: 'nombreUsuario', label: 'Nombre', minWidth: 100 },
	{
		id: 'tipoUsuario',
		label: 'Tipo',
        minWidth: 50,        
		format: (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1): value) 
	}
];
*/

const useStyles = makeStyles({
	table: {
		minWidth: 350
	},
	root: {
		width: '100%'
	},
	container: {
		maxHeight: 440
	}
});

export const SimpleTableView = ({ columns, rows, setRows, idPublicacion, tableRows, setTableRows }) => {
	const classes = useStyles();

	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(50);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleDeleteDestinatario = async (row) => {
		if (window.confirm('Está seguro de eliminar el Destinatario?')) {
			try {		

				await deleteDestinatariosPublicacion(idPublicacion, [ row ]);

				const newRows = rows.filter((r) => {
					return r.idUsuario !== row.idUsuario;
				});

				const newTableRows = tableRows.map((r) => {
					if (r.id === idPublicacion) {
						r.destinatarios = r.destinatarios.filter((d) => {
							return d.idUsuario !== row.idUsuario;
						});
						return r;
					} else {
						return r;
					}
				});

				setRows(newRows);
				setTableRows(newTableRows);
			} catch (err) {
				console.log('error', err);
			}
		}
	};

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="destinatarios table">
					<TableHead>
						<TableRow>{columns.map((column) => <TableCell>{column.label}</TableCell>)}</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell key={column.id}>
												{column.format ? column.format === 'DELETE' ? (
													<Button
														aria-label="edit"
														onClick={() => handleDeleteDestinatario(row)}
													>
														Edit
													</Button>
												) : (
													column.format(value)
												) : (
													value
												)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[ 50, 100, 500 ]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};
