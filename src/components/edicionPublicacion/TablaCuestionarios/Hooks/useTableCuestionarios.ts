import React from "react";
import {
  getUserLocalStorage,
  UserLocalStorage,
} from "../../../../utils/getUserLocalStorage";
import toast from "react-hot-toast";
import axios from "axios";
import { calificarReactivoEnsayo } from "../../../../services/quiz";
import { IReactivo } from "../../../Quizzes/interfaces/reactivo.interface";
import { useTablaCuestionariosContext } from "../context/TablaCuestionariosContext";
import { getRowsFromCuestionarioAplicacion } from "../Utils/tableCuestionarioUtils";

export const useTableCuestionarios = () => {
  const { idAccount, idUsuario, tokenAut, prefijo, idUsuarioConPrefijo } =
    getUserLocalStorage() as UserLocalStorage;

    const {setCuestionarios, setRowsCuestionariosAplicacion} = useTablaCuestionariosContext()



  const urlBase = process.env.REACT_APP_API_URL;

  const loadCuestionarioProfesor = async () => {
    const newCuestionarios = await getCuestionariosProfesor();
    setCuestionarios(newCuestionarios);
    const data = await getRowsFromCuestionarioAplicacion(newCuestionarios) as any;

    setRowsCuestionariosAplicacion(data);
  };

  const getCuestionariosProfesor = async () => {
    try {
      const headers = { idUsuario: idUsuarioConPrefijo, tokenAut };
      const url = `${urlBase}/${idAccount}/cuestionarios`;
      const res = await axios.get(url, {
        params: { idUsuario: idUsuarioConPrefijo },
        headers,
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
          headers: { idUsuario, tokenAut },
        }
      );

      return res.data.object;
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const calificarEnsayo = async ({
    puntosObtenidosEnsayo,
    idCuestionario,
    idAplicacion,
    reactivo,
  }: {
    puntosObtenidosEnsayo: number;
    idCuestionario: string;
    reactivo: IReactivo;
    idAplicacion: string;
  }) => {
    try {
      await calificarReactivoEnsayo({
        idAplicacion,
        reactivo,
        idCuestionario,
        puntosObtenidosEnsayo,
      });

      loadCuestionarioProfesor(); // to refresh state
     
      toast.success("Calificacion guardada con éxito.");
    } catch (error: any) {
      console.log("error", error);
      toast.error("Erro al calificar.");

      // toast.error(error.response.data.detail)
    }
  };

  return {
    getCuestionariosProfesor,
    getEntregasByCuestionario,
    calificarEnsayo,
    loadCuestionarioProfesor
  };
};
