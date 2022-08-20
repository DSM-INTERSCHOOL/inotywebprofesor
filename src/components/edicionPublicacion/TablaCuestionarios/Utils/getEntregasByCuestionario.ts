import axios from "axios";
import {
  getUserLocalStorage,
  UserLocalStorage,
} from "../../../../utils/getUserLocalStorage";
import toast from "react-hot-toast";

export const getEntregasByCuestionario = async (idCuestionario: string) => {
  const { idAccount, idUsuario, tokenAut, prefijo } =
    getUserLocalStorage() as UserLocalStorage;

  const idUsuarioConPrefijo = `${prefijo}${idUsuario}`;
  const urlBase = process.env.REACT_APP_API_URL;

  try {
    const res = await axios.get(
      `${urlBase}/${idAccount}/cuestionarios/${idCuestionario}/aplicaciones`,
      {
        headers: { idUsuario: idUsuarioConPrefijo, tokenAut },
      }
    );

    return res.data.object;
  } catch (error: any) {
    toast.error(error.message);
    console.log(error);
  }
};
