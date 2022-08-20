import { SET_TOAST_MESSAGE, CLOSE_TOAST_MESSAGE } from '../actions/toastMessageActions';

const initialState = {
	message: '',
    isOpen: false,
    severity: 'error'
};

export const toastMessageReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_TOAST_MESSAGE:
			return {
				message: action.message,
                isOpen: true,
                severity: action.severity
			};

		case CLOSE_TOAST_MESSAGE:
			return {
                ...state,
                message:'',
                isOpen:false
                
            };

		default:
			return state;
	}
};
