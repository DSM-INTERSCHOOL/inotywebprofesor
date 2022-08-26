import React from "react";
import { DetalleEntregaCellCuestionarioAplicacion } from "../DetalleEntregaCellCuestionario";
import { useTableCuestionarios } from "../Hooks/useTableCuestionarios";
import { ICuestionarioAplicacion } from "../interfaces/CuestionarioAplicacion.interface";
import moment from "moment";
import "moment/locale/es-us";
import { ChecBoxAutorizacionCuestionario } from "../AutorizacionCuestionario";
import { getEntregasByCuestionario } from "./getEntregasByCuestionario";

interface Column {
  name: string;
  label: string;
  options: {
    display: boolean;
    customBodyRender?: any;
    sortCompare?: undefined;
  };
}



export const tablaCuestionarioColumnas: Column[] = [
  { name: "id", label: "Id", options: { display: false } },
  { name: "creacion", label: "Creacion", options: { display: true } },
  { name: "descripcion", label: "Descripcion", options: { display: true } },
  { name: "publicador", label: "Publicador", options: { display: true } },
  { name: "inicio", label: "Inicio", options: { display: true } },
  { name: "fin", label: "Fin", options: { display: true } },
  {
    name: "entregas",
    label: "Entregas",
    options: {
      display: true,
      customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
        return (
          <DetalleEntregaCellCuestionarioAplicacion
          cuestionariosAplicacion={value.cuestionarioAplicacion}
            cuestionario={value.cuestionario}
          />
        );
      },
    },
  },
  {
    name: "autorizado",
    label: "Autorizado",
    options: {
      display: true,
      customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
        return (
          <ChecBoxAutorizacionCuestionario value={value} /> 
        );
      },
    },
  },
  { name: "estatus", label: "Estatus", options: { display: true } },
  { name: "acciones", label: "Acciones", options: { display: true } },
];

export const getRowsFromCuestionarioAplicacion = (
  cuestionarios: ICuestionarioAplicacion[]
) => {
  return Promise.all(
    cuestionarios.map(async (cuestionario) => {
      try {
        const cuestionarioAplicacion = await getEntregasByCuestionario(cuestionario.id);

        return [
          cuestionario.id,
          moment(cuestionario.fechaCreacion).format("DD/MM/YY HH:mm"),
          cuestionario.descripcion,
          cuestionario.idUsuario,
          moment(cuestionario.fechaInicialVigencia).format("DD/MM/YY HH:mm"),
          moment(cuestionario.fechaFinalVigencia).format("DD/MM/YY HH:mm"),
          {cuestionarioAplicacion, cuestionario},
          "Autorizado",
          cuestionario.estatus,
          "Acciones",
        ];
      } catch (error) {
        console.log(error);
      }
    })
  );
};
