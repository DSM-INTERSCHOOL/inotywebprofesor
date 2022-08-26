import React from 'react';
import MUIDataTable from 'mui-datatables';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { DetalleCell } from './DetalleCell';
import {
	getDestinatariosByIdPublicacion,
	getContenedorByIdPublicacion,
	updateEstatusPublicacion
} from '../../services/publicaciones';
import moment from 'moment';
import { CheckBoxAutorizado } from './CheckBoxAutorizado';
import { useDispatch, useSelector } from 'react-redux';
import {
	setContenido,
	setTipoPublicacion,
	setFiltros,
	setFiles,
	setIdPublicacion
} from '../../store/actions/publicacionActions';
import { makeStyles } from '@material-ui/core/styles';
import { DetallePublicacion } from './containers/DetallePublicacion';
import { Modal, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { PreviewPublicacion } from './containers/PreviewPublicacion';
import { DetalleEntregaCell } from './DetalleEntregaCell';
import { TablaCuestionarios } from './TablaCuestionarios';

const useStyles = makeStyles((theme) => ({
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

export const DataTablePublicacion = ({ rows, setTableRows, tipoPublicacion }) => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const contenido = useSelector((state) => state.publicaciones.contenido);
	const idPublicacion = useSelector((state) => state.publicaciones.idPublicacion);

	const filtros = useSelector((state) => state.publicaciones.filtros);

	const [open, setOpen] = React.useState(false);
	const [openPreview, setOpenPreview] = React.useState(false);

	function loadPublicacion(idPublicacion) {
		const publicacion = rows.find((element) => {
			return element.id === idPublicacion;
		});

		if (publicacion) {
			console.log('publicacion found:', publicacion);

			dispatch(setIdPublicacion(publicacion.id));

			dispatch(setContenido({ ...contenido, titulo: publicacion.titulo, cuerpo: publicacion.cuerpoContenido }));
			dispatch(setTipoPublicacion(publicacion.type + 's'));
			dispatch(
				setFiltros({
					...filtros,
					fechaInicialPublicacion: moment(publicacion.fechaInicialPublicacion).format(),
					fechaFinalPublicacion: moment(publicacion.fechaFinalPublicacion).format(),
					fechaHoraEvento: moment(publicacion.fechaHoraEvento).format(),
					fechaHoraEntrega: moment(publicacion.fechaHoraEntrega).format(),
					lugarEvento: publicacion.lugarEvento,
					aceptaComentarios: publicacion.aceptaComentarios,
					autorizado: publicacion.autorizado
				})
			);

			const adjuntos = publicacion.adjuntos.map((archivo) => {
				archivo.name = archivo.originalname;
				return {
					fileObject: archivo,
					nameToShow: archivo.nameToShow,
					id: archivo.id,
					nuevo: false,
					location: archivo.location
				};
			});

			dispatch(setFiles(adjuntos));
		} else {
			throw new Error('Publicación no encontrada');
		}
	}

	const handleEditIcon = (idPublicacion) => {
		try {
			loadPublicacion(idPublicacion);
			setOpen(true);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handlePreviewIcon = (idPublicacion) => {
		loadPublicacion(idPublicacion);
		setOpenPreview(true);
	};

	const handleClosePreviewIcon = () => {
		setOpenPreview(false);
	};

	const handleDeleteIcon = (idPublicacion) => {
		if (window.confirm('Está seguro de cancelar la Publicación?')) {
			try {
				const newTableRows = rows.map((element) => {
					if (element.id === idPublicacion) {
						updateEstatusPublicacion(idPublicacion, { value: 'CANCELADO' });
						element.estatus = 'CANCELADO';
					}
					return element;
				});
				setTableRows(newTableRows);
			} catch (err) {
				console.log('error ' + err);
			}
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={{ outline: 0 }} className={classes.paper}>
			<DetallePublicacion />
		</div>
	);

	const options = {
		filter: true,
		filterType: 'dropdown',
		responsive: 'standard',
		selectableRows: 'none'
	};

	let columnas = [
		{
			name: 'id',
			label: 'Id',
			options: {
				display: false
			}
		},
		{
			name: 'type',
			label: 'Tipo',
			options: {
				display: false
			}
		},
		{
			name: 'fechaCreacion',
			label: 'Creación',
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					return <span>{moment(value).format('DD/MM/YYYY HH:mm')}</span>;
				}
			}
		},
		{ name: 'titulo', label: 'Título' },
		{ name: 'nombreUsuario', label: 'Publicador' },
		{
			name: 'fechaInicialPublicacion',
			label: 'Inicio',
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					return <span>{moment(value).format('DD/MM/YYYY HH:mm')}</span>;
				}
			}
		},
		{
			name: 'fechaFinalPublicacion',
			label: 'Fin',
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					return <span>{moment(value).format('DD/MM/YYYY HH:mm')}</span>;
				}
			}
		},
		{
			name: 'destinatarios',
			label: 'Destinatarios',
			options: {
				sortCompare: (order) => ({ data: destinatarios1 }, { data: destinatarios2 }) =>
					(destinatarios1.length - destinatarios2.length) * (order === 'asc' ? 1 : -1),
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<DetalleCell
							value={value.length}
							tableMeta={tableMeta}
							columns={[
								{ id: 'idUsuario', label: 'IdUsuario', minWidth: 50 },
								{ id: 'nombreUsuario', label: 'Nombre', minWidth: 100 },
								{
									id: 'tipoUsuario',
									label: 'Tipo',
									minWidth: 50,
									format: (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : value)
								},
								{
									id: 'actions',
									label: 'Action',
									format: 'DELETE'
								}
							]}
							onOpen={() => getDestinatariosByIdPublicacion(tableMeta.rowData[0])}
							idPublicacion={tableMeta.rowData[0]}
							tableRows={rows}
							setTableRows={setTableRows}
						/>
					);
				}
			}
		},
		{
			name: 'vistas',
			label: 'Vistas',
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<DetalleCell
							value={value}
							tableMeta={tableMeta}
							columns={[
								{
									id: 'fechaHora',
									label: 'Fecha',
									minWidth: 50,
									format: (value) => (value ? moment(value).format('DD/MM/YYYY HH:mm:ss') : value)
								},
								{ id: 'idUsuario', label: 'IdUsuario', minWidth: 50 },
								{ id: 'nombreUsuario', label: 'Nombre', minWidth: 100 }
							]}
							onOpen={() => getContenedorByIdPublicacion(tableMeta.rowData[0], 'vistas')}
						/>
					);
				}
			}
		},

		{
			name: 'likes',
			label: 'Likes',
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<DetalleCell
							value={value}
							tableMeta={tableMeta}
							columns={[
								{
									id: 'fechaHora',
									label: 'Fecha',
									minWidth: 50,
									format: (value) => (value ? moment(value).format('DD/MM/YYYY HH:mm:ss') : value)
								},
								{ id: 'idUsuario', label: 'Nombre', minWidth: 50 },
								{ id: 'nombreUsuario', label: 'Nombre', minWidth: 100 }
							]}
							onOpen={() => getContenedorByIdPublicacion(tableMeta.rowData[0], 'likes')}
						/>
					);
				}
			}
		},

		{
			name: 'comentarios',
			label: 'Comentarios',
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<DetalleCell
							value={value}
							tableMeta={tableMeta}
							columns={[
								{
									id: 'fechaHora',
									label: 'Fecha',
									minWidth: 50,
									format: (value) => (value ? moment(value).format('DD/MM/YYYY HH:mm:ss') : value)
								},
								{ id: 'idUsuario', label: 'Nombre', minWidth: 50 },
								{ id: 'nombreUsuario', label: 'Nombre', minWidth: 100 },
								{ id: 'comentario', label: 'Comentario', minWidth: 100 }
							]}
							onOpen={() => getContenedorByIdPublicacion(tableMeta.rowData[0], 'comentarios')}
						/>
					);
				}
			}
		},

		{
			name: 'entregas',
			label: 'Entregas',
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<DetalleEntregaCell
							value={value}
							idPublicacion={tableMeta.rowData[0]}
							onOpen={() => getContenedorByIdPublicacion(tableMeta.rowData[0], 'entregas')}
						/>
					);
				}
				, display: rows !== undefined && rows[0] !== undefined && rows[0].type === 'tarea' ? true : false
			}
		},
		{
			name: 'confirmaciones',
			label: 'Confirmaciones',
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<DetalleCell
							value={value}
							tableMeta={tableMeta}
							columns={[
								{
									id: 'fechaHora',
									label: 'Fecha',
									minWidth: 50,
									format: (value) => (value ? moment(value).format('DD/MM/YYYY HH:mm:ss') : value)
								},
								{ id: 'idUsuario', label: 'IdUsuario', minWidth: 50 },
								{ id: 'nombreUsuario', label: 'Nombre', minWidth: 100 }
							]}
							onOpen={() => getContenedorByIdPublicacion(tableMeta.rowData[0], 'confirmaciones')}
						/>
					);
				},
				display: rows !== undefined && rows[0] !== undefined && rows[0].type === 'evento' ? true : false
			}
		},

		{
			name: 'adjuntos',
			label: 'Adjuntos',
			options: {
				sortCompare: (order) => ({ data: adjuntos1 }, { data: adjuntos2 }) =>
					(adjuntos1.length - adjuntos2.length) * (order === 'asc' ? 1 : -1),
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<DetalleCell
							value={value.length}
							tableMeta={tableMeta}
							columns={[
								{
									id: 'nameToShow',
									label: 'Etiqueta',
									minWidth: 50
								},
								{ id: 'originalname', label: 'Nombre Archivo', minWidth: 50 }
							]}
							onOpen={() => {
								const adjuntos = tableMeta.rowData[13].map((adjunto) => {
									return { nameToShow: adjunto.nameToShow, originalname: adjunto.originalname };
								});
								return adjuntos;
							}}
						/>
					);
				}
			}
		},
		{
			name: 'autorizado',
			label: 'Autorizado',
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					// console.log('value: ', value)
					return (
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<CheckBoxAutorizado
								idPublicacion={tableMeta.rowData[0]}
								tableRows={rows}
								value={value}
								setTableRows={setTableRows}
							/>
						</div>
					);
				}
			}
		},
		{
			name: 'estatus',
			label: 'Estatus'
		},
		{
			name: 'Acciones',
			empty: true,
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					const idPublicacion = tableMeta.rowData[0];
					return (
						<div>
							{tableMeta.rowData[15] === 'ACTIVO' && (
								<div>
									<EditIcon
										onClick={() => {
											console.log('idPublicacion before detall ', idPublicacion);

											handleEditIcon(tableMeta.rowData[0]);
										}}
									/>

									<Modal
										style={{
											outline: 0,
											border: 'none',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											overflow: 'auto'
										}}
										open={open}
										onClose={handleClose}
										aria-labelledby="simple-modal-title"
										aria-describedby="simple-modal-description"
									>
										<div style={{ outline: 0 }} className={classes.paper}>
											<DetallePublicacion
												rows={rows}
												setTableRows={setTableRows}
												onUpdate={handleClose}
											/>
										</div>
									</Modal>
								</div>
							)}
							{tableMeta.rowData[15] === 'ACTIVO' && (
								<DeleteIcon
									onClick={() => {
										handleDeleteIcon(tableMeta.rowData[0]);
									}}
								/>
							)}

							<VisibilityIcon
								onClick={() => {
									handlePreviewIcon(tableMeta.rowData[0]);
								}}
							/>

							<Modal
								open={openPreview}
								onClose={handleClosePreviewIcon}
								style={{
									outline: 0,
									border: 'none',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									overflow: 'auto'
								}}
							>
								<div style={{ outline: 0 }} className={classes.paper}>
									<PreviewPublicacion />
								</div>
							</Modal>
						</div>
					);
				}
			}
		}
	];

	const getMuiTheme = () =>
		createMuiTheme({
			overrides: {
				MuiTableCell: { root: { color: 'red', fontSize: 12 } }
			}
		});

	// console.log('COL: ', columnas);

	const renderDataTable = () =>{
		if (tipoPublicacion === 'cuestionarios') {
			return(<TablaCuestionarios />)
		}

		return(
			<MUIDataTable title={'Publicaciones'} data={rows} columns={columnas} options={options} />
		)
	}

	return (
		<div>
		
				<MuiThemeProvider theme={getMuiTheme()}>
					{renderDataTable()}
				</MuiThemeProvider>
			
		</div>
	);
};

