import React, { useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { putContenedor } from "../../../../services/publicaciones";
import moment from "moment";
import { IEntrega } from "../../ListaEntrega/Entrega.interface";
import toast from "react-hot-toast";
import { display } from "@mui/system";
import { EntregasContext } from "../../TablaEntregas";

export const CalificacionEntrega = () => {
  const {
    entregas,
    entregaDetail,
    setComentario,
    setCalificacion,
    calificacion,
    comentario,
  } = React.useContext(EntregasContext);

  useEffect(() => {
    setComentario(entregaDetail.comentario || "");
    setCalificacion(entregaDetail.calificacion || "");
  }, [entregaDetail, ]);

  const handleChangeComentario = (event: any) => {
    setComentario(event.target.value);
  };

  const handleChangeCalificacion = (event: any) => {
    setCalificacion(event.target.value);
  };

  return (
    <div
      style={{
        marginTop: 15,
        display: "flex",
        flexDirection: "column",
        marginBottom: 25,
      }}
    >
      <form noValidate autoComplete="off">
        <div style={{ display: "flex", gap: 10, height: 125,  justifyContent:"space-between" }}>
          <TextField
            label="Calificación"
            type="number"
            value={calificacion}
            onChange={handleChangeCalificacion}
            variant="outlined"
            style={{ width: 100, fontSize:26, fontWeight:"bold"  }}

          />
  
          <div style={{flex:1}}>
            <TextField
              label="Comentario"
              multiline
              rows={5}
              variant="outlined"
              value={comentario}
              style={{width:"100%"}}
              onChange={handleChangeComentario}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
