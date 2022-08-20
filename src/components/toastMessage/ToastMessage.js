import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { closeToastMessage } from '../../store/actions/toastMessageActions';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ToastMessage = () => {
	const open = useSelector((state) => state.toast.isOpen);

	const message = useSelector((state) => state.toast.message);

	const severity = useSelector((state) => state.toast.severity);

	const dispatch = useDispatch();

	const handleClose = (event, reason) => {
		dispatch(closeToastMessage());
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center'
			}}
			onClose={handleClose}
		>
			<Alert onClose={handleClose} severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	);
};
