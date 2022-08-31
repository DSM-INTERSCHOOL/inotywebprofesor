import axios from "axios";
import React from "react";
import useSWR from "swr";
import { BASE_URL } from "../../../../../config/config";
import { getUserLocalStorage } from "../../../../../utils/getUserLocalStorage";
import { IReactivo } from "../../../interfaces/reactivo.interface";

export const useReactivosSWR = () => {
  const { data, error, mutate } = useSWR<IReactivo[]>("listaReactivos");
  const { idAccount, idUsuarioConPrefijo, tokenAut, prefijo } =
    getUserLocalStorage()!;
  const headers = {
    idUsuario: idUsuarioConPrefijo,
    tokenAut,
  };

  const loadReactivosSWR = async () => {
    await mutate(async () => {
      const url = `${BASE_URL}/${idAccount}/reactivos`;
      console.log({ url, headers });
      const result = await axios({
        method: "get",
        url: url,
        headers: headers,
        params: { estatus: "ACTIVO" },
      });

      return result.data;
    });
  };

  const createReactivosSWR = async (reactivo: IReactivo) => {
    if (!data) return;
    await mutate(
      async () => {
        const url = `${BASE_URL}/${idAccount}/reactivos`;

        const result = await axios({
          method: "post",
          url: url,
          headers: headers,
          data: reactivo,
        });
        const newReactivo = result.data.object;
        console.log("newReactivo", newReactivo);
        return [newReactivo, ...data];
      },
      { optimisticData: [reactivo, ...data], rollbackOnError: true }
    );
  };

  const updateReactivoSWR = async (reactivo: IReactivo) => {
    if (!data) return;
    const optimisticReactivos = data.map((r) => {
      if (r.id === reactivo.id) {
        return reactivo;
      }
      return r;
    });

    await mutate(
      async () => {
        const url = `${BASE_URL}/${idAccount}/reactivos/${reactivo.id}`;
        const result = await axios({
          method: "put",
          url: url,
          headers: headers,
          data: reactivo,
        });
        const newReactivo = result.data.object;

        const newReactivos = data.map((r) => {
          if (r.id === newReactivo.id) {
            return newReactivo;
          }
          return r;
        });
        return newReactivos;
      },
      { optimisticData: optimisticReactivos, rollbackOnError: true }
    );
  };

  return {
    loadReactivosSWR,
    createReactivosSWR,
    updateReactivoSWR,
    listaReactivos: data,
    error,
  };
};
