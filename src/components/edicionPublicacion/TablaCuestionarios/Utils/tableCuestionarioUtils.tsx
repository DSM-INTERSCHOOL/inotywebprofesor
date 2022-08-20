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
            cuestionariosEntrega={value}
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
    cuestionarios.map(async (el) => {
      try {
        const cuestionarioAplicacion = await getEntregasByCuestionario(el.id);

        return [
          el.id,
          moment(el.fechaCreacion).format("DD/MM/YY HH:mm"),
          el.descripcion,
          el.idUsuario,
          moment(el.fechaInicialVigencia).format("DD/MM/YY HH:mm"),
          moment(el.fechaFinalVigencia).format("DD/MM/YY HH:mm"),
          cuestionarioAplicacion,
          "Autorizado",
          el.estatus,
          "Acciones",
        ];
      } catch (error) {
        console.log(error);
      }
    })
  );
};
