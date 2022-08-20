import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			flexGrow: 1,
			maxWidth: 752
		},
		title: {
			margin: theme.spacing(4, 0, 2)
		}
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	avatar: {
		backgroundColor: red[500]
	},
	demo: {
		backgroundColor: theme.palette.background.paper
	}
}));

export const PreviewPublicacion = () => {
	const tipoPublicacion = useSelector((state) => state.publicaciones.tipoPublicacion);

	const contenido = useSelector((state) => state.publicaciones.contenido);
	const filtros = useSelector((state) => state.publicaciones.filtros);
	const fileArray = useSelector((state) => state.publicaciones.fileArray);

	const classes = useStyles();

	useEffect(() => {
		const imagenes = document.querySelectorAll('img');
		const container = document.getElementById('div_preview_html');
		imagenes.forEach((i) => {
			if (i.width > container.offsetWidth) {
				i.classList.add('Imagen');
			}
		});
	}, []);

	return (
		<div id="div_preview_html" style={{ height: 500, overflow: 'auto' }}>
			<Card className={classes.root}>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe" className={classes.avatar}>
							R
						</Avatar>
					}
					title={contenido.titulo}
					subheader={
						moment(filtros.fechaInicialPublicacion).format('MMM DD, YYYY HH:mm') +
						' - ' +
						moment(filtros.fechaFinalPublicacion).format('MMM DD, YYYY HH:mm')
					}
				/>

				<CardContent>{ReactHtmlParser(contenido.cuerpo)}</CardContent>

				<CardContent>
					{tipoPublicacion === 'eventos' && (
						<div>
							<label>{'Fecha/Hora Evento'}</label>
							<p>
								<label>{moment(filtros.fechaHoraEvento).format('MMM DD, YYYY HH:mm')}</label>
							</p>
						</div>
					)}

					{tipoPublicacion === 'eventos' && (
						<div>
							<label>{'Lugar Evento'}</label>
							<p>
								<label>{filtros.lugarEvento}</label>
							</p>
						</div>
					)}

					{tipoPublicacion === 'tareas' && (
						<div>
							<label>{'Fecha/Hora Entrega'}</label>
							<p>
								<label>{moment(filtros.fechaHoraEntrega).format('MMM DD, YYYY HH:mm')}</label>
							</p>
						</div>
					)}
				</CardContent>

				<CardContent>
					<div className={classes.demo}>
						<List dense={true}>
							{fileArray.map((f) => {
								return (
									<div>
										<a href={f.location} target="_blank">
											{f.nameToShow}
										</a>
									</div>
								);
							})}
						</List>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
