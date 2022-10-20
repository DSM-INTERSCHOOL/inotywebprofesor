import React from "react";
import toast from "react-hot-toast";
import moment from "moment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { CalificacionEntrega } from "./Components/CalificacionEntrega";
import { EntregasContext } from "../TablaEntregas";
import { NavigationEntrega } from "./Components/NavigationEntrega";
import { EntregaHeader } from "./Components/EntregaHeader";
import { EntregaAdjuntos } from "./Components/EntregaAdjuntos";
import { putContenedor } from "../../../services/publicaciones";
import "./EntregaDetail.css";

interface Props {
  onSaveCalificacion: () => void;
}

export const EntregaDetail: React.FC<Props> = ({ onSaveCalificacion }) => {
  const { entregaDetail, setShowDetail, comentario, calificacion } =
    React.useContext(EntregasContext);
  if (!entregaDetail) return null;

  const handleClickSave = async () => {
    try {
      const contenedor = {
        comentario: comentario,
        calificacion: calificacion,
        estatus: "CALIFICADO",
        ultimaRevision: moment().format(),
      };
      const res = await putContenedor(
        entregaDetail.idPublicacion,
        entregaDetail.id,
        "entregas",
        contenedor
      );
      onSaveCalificacion();
    } catch (err: any) {
      console.log("err", err.message);
    }

    toast.success("La tarea ha sido calificada.");
  };

  return (
    <div>
      <ArrowBackIcon
        className="buttonBack"
        fontSize="large"
        color="primary"
        onClick={() => setShowDetail(false)}
      />
      <NavigationEntrega />

      <div
        style={{
          overflow: "auto",
          height: 550,
          paddingBottom: 50,
          paddingRight: 20,
        }}
      >
        <EntregaHeader />
        <div style={{background:"rgb(224 224 224 / 50%)", padding:20 }}>
          <div
            style={{ paddingTop: 15 }}
            dangerouslySetInnerHTML={{ __html: entregaDetail.textoEntrega }}
          />
        </div>
        <EntregaAdjuntos />

        <CalificacionEntrega />
        <Button
          variant="contained"
          style={{backgroundColor:"green", color:"white"}}
          fullWidth
          size="large"
          onClick={handleClickSave}
          startIcon={<SaveIcon />}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};
