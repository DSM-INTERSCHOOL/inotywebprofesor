import React, { useRef } from 'react';
import { Button } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { addFile, deleteFile } from '../../store/actions/publicacionActions';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteAdjuntoPublicacion } from '../../services/publicaciones';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
			flexGrow: 1,
			maxWidth: 752
		},
		demo: {
			backgroundColor: theme.palette.background.paper
		},
		title: {
			margin: theme.spacing(4, 0, 2)
		}
	}
}));

export const FileAttacher = ({ isRemote, idPublicacion, tipoPublicacion }) => {
	const fileArray = useSelector((state) => state.publicaciones.fileArray);
	const descargarCalificacion = useSelector((state) => state.publicaciones.descargarCalificacion);
	const dispatch = useDispatch();

	const classes = useStyles();

	const fileInput = useRef();

	function handleChange() {
		dispatch(
			addFile({
				fileObject: fileInput.current.files[0],
				nameToShow: fileInput.current.files[0].name,
				nuevo: isRemote
			})
		);
	}

	async function handleClickDelete(file) {
		if (isRemote && file.id) {
			await deleteAdjuntoPublicacion(idPublicacion, file.id, tipoPublicacion);
		}
		dispatch(deleteFile(file));
	}
	

	return (
		<div>
			
			{/* <pre>Descargar calificacion: {JSON.stringify(descargarCalificacion)}</pre> */}
			<Grid item xs={12} md={12}>
				<div style={{ display: 'flex', alignItems:'center' }}>
					<Typography style={{ marginRight: 15 }} variant="h6" className={classes.title}>
						Archivos Adjuntos
					</Typography>
					<label  >
						<input
							ref={fileInput}
							onChange={handleChange}
							name="attachment"
							type="file"
							style={{
								display: 'none'
							}}
						/>
						<AddBoxIcon style={{color: 'green'}} />
					</label>
				</div>

				<div className={classes.demo}>
					<List dense={true}>
						{fileArray.map((f) => {
							return (
								<div>
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<FolderIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText primary={f.nameToShow} secondary={f.fileObject.name} />
										<ListItemSecondaryAction>
											<IconButton edge="end" aria-label="delete">
												<DeleteIcon
													onClick={() => {
														handleClickDelete(f);
													}}
												/>
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								</div>
							);
						})}
					</List>
				</div>
			</Grid>
		</div>
	);
};
