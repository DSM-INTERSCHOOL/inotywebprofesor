import React from "react";
import { IEntrega } from "./Entrega.interface";
import "./ListaEntrega.css";
import moment from "moment";
import { EntregasContext } from "../TablaEntregas";

interface Props {
  entregas: IEntrega[];
  setEntregaDetail: React.Dispatch<React.SetStateAction<IEntrega>>;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ListaEntrega: React.FC<Props> = ({
  entregas,
  setEntregaDetail,
  setShowDetail,
}) => {
  const { setIndex } = React.useContext(EntregasContext);
  return (
    <div className="container" style={{ maxHeight: 480 }}>
      <h1>Lista de entregas</h1>
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
            setEntregaDetail(entrega);
            setShowDetail(true);
            setIndex(index +1 );
          }}
        >
          <p>{entrega.idUsuario}</p>
          <p>{entrega.nombreUsuario || "Alumno no definido"}</p>
          <p>{moment(entrega.fechaHora).format("DD/MM/YYYY HH:mm:ss")}</p>
          <p>{entrega.estatus}</p>
        </div>
      ))}
    </div>
  );
};
