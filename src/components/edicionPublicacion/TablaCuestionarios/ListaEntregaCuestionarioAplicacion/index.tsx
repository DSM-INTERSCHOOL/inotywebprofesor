import React from "react";
import "./ListaEntrega.css";
import moment from "moment";
import { ICuestionarioAplicado } from "../interfaces/CuestionarioAplicado.interface";
import { ICuestionario } from "../../../Quizzes/interfaces/cuestionario.interface";
import { useTablaCuestionariosContext } from "../context/TablaCuestionariosContext";

interface Props {
  entregas: ICuestionarioAplicado[];
  setShowDetail: any;
  cuestionario: ICuestionario;
}

export const ListaEntregaCuestionarioAplicacion: React.FC<Props> = ({
  entregas,
  setShowDetail,
  cuestionario
}) => {

  const {setEntregaDetail, setIndexCuestionario} = useTablaCuestionariosContext()

    
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

      {entregas.map((entrega, index) => (
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
            console.log('entrega', entrega)
            setEntregaDetail(entrega);
            setShowDetail(true);
            setIndexCuestionario(index)
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