import { Button } from "@material-ui/core";
import { height } from "@mui/system";
import React from "react";
import { EntregasContext } from "../../TablaEntregas";

export const NavigationEntrega = () => {
  const { entregas, setEntregaDetail, index, setIndex, entregaDetail } =
    React.useContext(EntregasContext);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h4>
        Entregas {index}/{entregas.length}
      </h4>
      <div style={{ display: "flex", gap: 10, marginBottom:10, height:40 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={index === 1}
          onClick={() => {
            const newIndex = index - 1;
            setIndex(newIndex);
            setEntregaDetail(entregas[newIndex - 1]);
          }}
        >
          Atras
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          disabled={entregas.length === index}
          onClick={() => {
            const newIndex = index + 1;
            setIndex(newIndex);
            setEntregaDetail(entregas[index]);
          }}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
