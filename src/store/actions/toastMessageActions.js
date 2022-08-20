export const SET_TOAST_MESSAGE = 'SET_TOAST_MESSAGE';

export const CLOSE_TOAST_MESSAGE='CLOSE_TOAST_MESSAGE';

export const setToastMessage = (message,severity='error') => {
    return {type: SET_TOAST_MESSAGE, message, severity}
    };

 export const closeToastMessage = ()=>{
     return {
         type: CLOSE_TOAST_MESSAGE
     }
 }