import React from 'react';
import { Header } from './Header';
import { Container, Card, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
	contenido: {		
        padding: "30px"        
    },
    container: {
        marginTop: "20px"
    }
    
});

export const Layout = (props) => {
	const classes = useStyle();
	return (
		<div>
			<Header />
			<Container maxWidth="lg" className={classes.container}>
				<Card className={classes.contenido} elevation={3}>
							{props.children}
					
				</Card>
			</Container>
		</div>
	);
};
