import React, { useState } from "react";
import { ListaEntrega } from "./ListaEntrega/index.tsx";
import { EntregaDetail } from "./EntregaDetail/index.tsx";

export const EntregasContext = React.createContext();

export const TablaEntregas = ({ idPublicacion, rows, onSaveCalificacion }) => {
  const [entregaDetail, setEntregaDetail] = useState();
  const [showDetail, setShowDetail] = useState(false);
  const [index, setIndex] = useState(0);
  const [comentario, setComentario] = React.useState(
    entregaDetail?.comentario || ""
  );
  const [calificacion, setCalificacion] = React.useState(
    entregaDetail?.calificacion || ""
  );

  const value = {
    entregas: rows,
    entregaDetail,
    setEntregaDetail,
    showDetail,
    setShowDetail,
    index,
    setIndex,
    comentario,
    setComentario,
    setCalificacion,
    calificacion,
  };

  return (
    <EntregasContext.Provider value={value}>
      {showDetail ? (
        <EntregaDetail onSaveCalificacion={onSaveCalificacion} />
      ) : (
        <ListaEntrega
          entregas={rows}
          setEntregaDetail={setEntregaDetail}
          setShowDetail={setShowDetail}
        />
      )}
    </EntregasContext.Provider>
  );
};
