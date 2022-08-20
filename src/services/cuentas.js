import axios from 'axios';
import { getUserLocalStorage } from '../utils/getUserLocalStorage';



export const getAccountById = async () => {
	try {
		const base_url = process.env.REACT_APP_API_URL;
	const {idAccount, tokenAut, idUsuario} = await getUserLocalStorage()


		const url = `${base_url}/${idAccount}`;

		const result = await axios({ method: 'get', url: url, headers: {idUsuario, tokenAut} });

		return result.data;
	} catch (err) {
		if (err.response && err.response.data && err.response.data.detail) {
			throw new Error(err.response.data.detail);
		} else {
			throw new Error(err);
		}
	}
};
