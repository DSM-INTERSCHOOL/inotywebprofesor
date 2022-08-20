import React from "react";
import {
  getUserLocalStorage,
  UserLocalStorage,
} from "../../../../utils/getUserLocalStorage";
import toast from "react-hot-toast";
import axios from "axios";

export const useTableCuestionarios = () => {
  const { idAccount, idUsuario, tokenAut, prefijo } =
    getUserLocalStorage() as UserLocalStorage;

  const idUsuarioConPrefijo = `${prefijo}${idUsuario}`;
  const urlBase = process.env.REACT_APP_API_URL;

  const getCuestionariosProfesor = async () => {
    try {
      const res = await axios.get(`${urlBase}/${idAccount}/cuestionarios`, {
        params: { idUsuario: idUsuarioConPrefijo },
        headers: { idUsuario: idUsuarioConPrefijo, tokenAut },
      });

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
          headers: { idUsuario: idUsuarioConPrefijo, tokenAut },
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
    getEntregasByCuestionario
  };
};
