import React, { useState } from "react";
import { EntregaDetailCuestionarioAplicacion } from "./EntregaDetailCuestionarioAplicacion";
import { ListaEntregaCuestionarioAplicacion } from "./ListaEntregaCuestionarioAplicacion";

interface Props {
  cuestionariosEntrega: any;
}

export const CuestionarioEntregas: React.FC<Props> = ({ cuestionariosEntrega }) => {
  const [entregaDetail, setEntregaDetail] = useState();
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div>
      {showDetail ? (
        <EntregaDetailCuestionarioAplicacion
          entrega={entregaDetail}
          setShowDetail={setShowDetail}
        />
      ) : (
        <ListaEntregaCuestionarioAplicacion
          entregas={cuestionariosEntrega}
          setEntregaDetail={setEntregaDetail}
          setShowDetail={setShowDetail}
        />
      )}
    </div>
  );
};
