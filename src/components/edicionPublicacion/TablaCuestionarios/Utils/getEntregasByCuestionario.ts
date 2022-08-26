import axios from "axios";
import {
  getUserLocalStorage,
  UserLocalStorage,
} from "../../../../utils/getUserLocalStorage";
import toast from "react-hot-toast";

export const getEntregasByCuestionario = async (idCuestionario: string) => {
  const { idAccount, idUsuario, tokenAut, prefijo } =
    getUserLocalStorage() as UserLocalStorage;

  const urlBase = process.env.REACT_APP_API_URL;

  try {
    const url = `${urlBase}/${idAccount}/cuestionarios/${idCuestionario}/aplicaciones`;
    console.log('url', url)
    const headers = { idUsuario, tokenAut }
    console.log('headers', headers)
    const res = await axios.get(url, {
      headers
    });

    return res.data.object;
  } catch (error: any) {
    toast.error(error.message);
    console.log(error);
  }
};
