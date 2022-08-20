import React from 'react';
import NotificationsActiveRoundedIcon from '@material-ui/icons/NotificationsActiveRounded';

export function ButtonWithIcon() {
	return (
		<button style={{fontSize: 80, borderWidth: 1,borderRadius:10,padding:5}}>
			<NotificationsActiveRoundedIcon />
			Avisos
		</button>
	);
}
