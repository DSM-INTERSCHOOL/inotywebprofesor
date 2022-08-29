import React from "react";
import {
  getUserLocalStorage,
  UserLocalStorage,
} from "../../../../utils/getUserLocalStorage";
import toast from "react-hot-toast";
import axios from "axios";

export const useTableCuestionarios = () => {
  const { idAccount, idUsuario, tokenAut, prefijo, idUsuarioConPrefijo } =
    getUserLocalStorage() as UserLocalStorage;

  const urlBase = process.env.REACT_APP_API_URL;

  const getCuestionariosProfesor = async () => {
    try {
      const headers = { idUsuario: idUsuarioConPrefijo, tokenAut };
      console.log('headers', headers)
      const url = `${urlBase}/${idAccount}/cuestionarios`;
      console.log("url: ", url);
      const res = await axios.get(url, {
        params: { idUsuario },
        headers,
      });
      console.log("res.data: ", res.data);
      return res.data;
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getEntregasByCuestionario = async (idCuestionario: string) => {
    try {
      const res = await axios.get(
        `${urlBase}/${idAccount}/cuestionarios/${idCuestionario}/aplicaciones`,
        {
          headers: { idUsuario, tokenAut },
        }
      );

      return res.data.object;
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return {
    getCuestionariosProfesor,
    getEntregasByCuestionario,
  };
};
