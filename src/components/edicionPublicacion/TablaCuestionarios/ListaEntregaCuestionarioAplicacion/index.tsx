import React from "react";
import "./ListaEntrega.css";
import moment from "moment";
import { ICuestionarioAplicado } from "../interfaces/CuestionarioAplicado.interface";
import { ICuestionario } from "../../../Quizzes/interfaces/cuestionario.interface";

interface Props {
  entregas: ICuestionarioAplicado[];
  setEntregaDetail: any;
  setShowDetail: any;
  cuestionario: ICuestionario;
}

export const ListaEntregaCuestionarioAplicacion: React.FC<Props> = ({
  entregas,
  setEntregaDetail,
  setShowDetail,
  cuestionario
}) => {

    console.log('Entregas', entregas);
    
  return (
    <div className="container" style={{ maxHeight: 480 }}>
      <h2>{cuestionario.descripcion}</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          border: "thin solid black",
          padding: 8,
          paddingLeft: 15,
          paddingRight: 15,
          cursor: "pointer",
          fontSize: 13,
          color: "#FFF",
          backgroundColor: "#3f51b5",
        }}
        className="rowHeader"
      >
        <b>idUsuario</b>
        <b>Nombre</b>
        <b>Fecha y hora</b>
        <b>Estatus</b>
      </div>

      {entregas.map((entrega) => (
        <div
          key={entrega.id}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            border: "thin solid black",
            paddingLeft: 5,
            paddingRight: 5,
            cursor: "pointer",
            fontSize: 13,
          }}
          className="rowHeader"
          onClick={() => {
            setEntregaDetail(entrega);
            setShowDetail(true);
          }}
        >
          <p>{entrega.idUsuario}</p>
          <p>{entrega.nombreCorto || "Alumno no definido"}</p>
          <p>{moment(entrega.fechaModificacion).format("DD/MM/YYYY HH:mm:ss")}</p>
          <p>{entrega.estatus}</p>
        </div>
      ))}
    </div>
  );
};